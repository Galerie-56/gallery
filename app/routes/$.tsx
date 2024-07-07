import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent,
} from '@storyblok/react';
import { Divide } from 'lucide-react';
import { GeneralErrorBoundary } from '~/components/GeneralErrorBoundary';
import { NotFoundPage } from '~/components/NotFoundPage';
import { isPreview } from '~/lib';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  let slug = params['*'] ?? 'home';

  const version = isPreview() ? 'draft' : 'published';

  const sbApi = getStoryblokApi();
  let { data }: { data: any } = await sbApi.get(
    `cdn/stories/${slug}`,
    {
      version: version as 'published' | 'draft',
    },
    { cache: 'no-store' }
  );

  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }

  const { data: careersData } = await sbApi.get(
    'cdn/stories',
    {
      version: version as 'published' | 'draft',
      starts_with: 'careers/',
      is_startpage: false,
    },
    { cache: 'no-store' }
  );

  return json({ story: data?.story, careers: careersData?.stories });
};
export default function Page() {
  let { story } = useLoaderData<typeof loader>();
  story = useStoryblokState(story);
  return <StoryblokComponent blok={story?.content} />;
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
