import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react';
import { GeneralErrorBoundary } from '~/components/GeneralErrorBoundary';
import { NotFoundPage } from '~/components/NotFoundPage';
import { getPerPage, getWorkCardData, getTotal, isPreview } from '~/lib';

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

  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }
  return json({
    story: data?.story,
    careerName: data?.story?.name,
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
