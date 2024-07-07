import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react';
import { GeneralErrorBoundary } from '~/components/GeneralErrorBoundary';
import { NotFoundPage } from '~/components/NotFoundPage';
import { getPerPage, getProjectCardData, getTotal, isPreview } from '~/lib';

import type { ProjectStoryblok } from '~/types';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  let slug = params['*'] ?? 'home';
  const resolveRelations = ['project.category'];
  let version = isPreview() ? 'draft' : 'published';

  const sbApi = getStoryblokApi();

  // Fetch the UUID of the "on-the-board" category
  const { data: categoryData } = await sbApi.get(
    'cdn/stories',
    {
      version: version as 'published' | 'draft',
      starts_with: 'categories/',
      by_slugs: 'categories/on-the-board',
    },
    { cache: 'no-store' }
  );

  const onTheBoardUuid = categoryData.stories[0]?.uuid;

  let { data }: { data: any } = await sbApi
    .get(
      `cdn/stories/exhibitions/${slug}`,
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

  const page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);
  const perPage = await getPerPage(sbApi);
  const { data: projectsData } = await sbApi.get(
    `cdn/stories`,
    {
      version: version as 'published' | 'draft',
      starts_with: 'exhibitions/',
      per_page: perPage,
      page,
      is_startpage: false,
      resolve_relations: resolveRelations,
      filter_query: {
        category: {
          not_in: onTheBoardUuid,
        },
      },
    },
    { cache: 'no-store' }
  );

  const total = await getTotal('exhibitions');
  const projects = projectsData.stories.map((p: ProjectStoryblok) =>
    getProjectCardData(p)
  );

  // Find current project index
  const currentIndex = projects.findIndex((p) => p.id === data.story.id);

  // Determine previous and next projects
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return json({
    story: data?.story,
    total,
    projects,
    perPage,
    projectName: data?.story?.name,
    prevProject,
    nextProject,
  });
};

const ProjectsPage = () => {
  let { story } = useLoaderData<typeof loader>();
  story = useStoryblokState(story, { resolveRelations: ['project.category'] });
  return <StoryblokComponent blok={story?.content} />;
};

export default ProjectsPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
