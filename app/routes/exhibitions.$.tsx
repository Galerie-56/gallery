import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react';
import { GeneralErrorBoundary } from '~/components/GeneralErrorBoundary';
import { NotFoundPage } from '~/components/NotFoundPage';
import { getPerPage, getProjectCardData, isPreview } from '~/lib';

import type { ProjectStoryblok } from '~/types';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  let slug = params['*'] ?? 'home';
  const resolveRelations = ['project.products'];
  let version = isPreview() ? 'draft' : 'published';

  const sbApi = getStoryblokApi();

  let { data }: { data: any } = await sbApi
    .get(
      `cdn/stories/exhibitions/${slug}`,
      {
        version: version as 'published' | 'draft',
        resolve_relations: resolveRelations,
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
    },
    { cache: 'no-store' }
  );

  const response = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_PREVIEW_TOKEN}&starts_with=exhibitions/&version=draft&is_startpage=false`
  );
  const total = await response?.headers.get('total');
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
