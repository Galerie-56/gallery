import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react';
import { GeneralErrorBoundary } from '~/components/GeneralErrorBoundary';
import { NotFoundPage } from '~/components/NotFoundPage';
import { getPerPage, isPreview, getDesignerCardData } from '~/lib';
import type { DesignerStoryblok } from '~/types';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const sbApi = getStoryblokApi();
  let slug = params['*'] ?? 'home';

  const version = isPreview() ? 'draft' : 'published';

  let { data }: { data: any } = await sbApi
    .get(
      `cdn/stories/designers/${slug}`,
      {
        version: version as 'published' | 'draft',
      },
      { cache: 'no-store' }
    )
    .catch((e) => {
      return { data: null };
    });
  console.log('data', data);

  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }

  const page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);
  const perPage = await getPerPage(sbApi);
  const { data: designersData } = await sbApi.get(
    `cdn/stories`,
    {
      version: version as 'published' | 'draft',
      starts_with: 'designers/',
      per_page: perPage,
      page,
      is_startpage: false,
    },
    { cache: 'no-store' }
  );

  const response = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_PREVIEW_TOKEN}&starts_with=designers/&version=draft&is_startpage=false`
  );
  const total = await response?.headers.get('total');
  const designers = designersData.stories.map((d: DesignerStoryblok) =>
    getDesignerCardData(d)
  );
  return json({
    story: data?.story,
    careerName: data?.story?.name,
    designers,
    total,
    page,
    perPage,
  });
};

const DesignersPage = () => {
  let { story } = useLoaderData<typeof loader>();
  story = useStoryblokState(story);
  return <StoryblokComponent blok={story?.content} />;
};

export default DesignersPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
