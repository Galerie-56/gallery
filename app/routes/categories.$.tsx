import { NotFoundPage } from '~/components/NotFoundPage';
import {
  json,
  type HeadersFunction,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import {
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react';
import type { ProjectStoryblok } from '~/types';
import {
  getPerPage,
  getProjectCardData,
  getTotal,
  invariantResponse,
  cacheControl,
} from '~/lib';
import { useLoaderData } from '@remix-run/react';
import { GeneralErrorBoundary } from '~/components/GeneralErrorBoundary';
import { isPreview } from '~/lib';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params['*'] ?? 'home';
  const sbApi = getStoryblokApi();
  const resolveRelations = ['product.category'];
  const version = isPreview() ? 'draft' : 'published';

  const { data } = await sbApi
    .get(
      `cdn/stories/categories/${slug}`,
      {
        version: version as 'published' | 'draft',
      },
      { cache: 'no-store' }
    )
    .catch((e) => {
      //   console.log("e", e);
      return { data: null };
    });
  invariantResponse(data, `there is no page with slug ${slug}`, {
    status: 404,
  });

  const story = data?.story;

  const page = Number.isNaN(Number(params.pageNumber))
    ? 1
    : Number(params.pageNumber);

  const perPage = await getPerPage(sbApi);
  const { uuid } = story;

  const { data: postsByContentType } = await sbApi.get(
    `cdn/stories/`,
    {
      version: version as 'published' | 'draft',
      starts_with: 'products/',
      is_startpage: false,
      per_page: perPage,
      page,
      resolve_relations: resolveRelations,
      search_term: uuid,
    },
    { cache: 'no-store' }
  );

  const total = await getTotal(uuid, 'products');

  const headers = {
    ...cacheControl,
  };

  const products = postsByContentType?.stories;

  return json(
    {
      story,
      uuid: uuid,
      name: story.name,
      products,
      perPage,
      total,
    },
    { headers }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { 'Cache-Control': loaderHeaders.get('Cache-Control') };
};

const CategoryPage = () => {
  let { story } = useLoaderData<typeof loader>();
  story = useStoryblokState(story, { resolveRelations: ['product.category'] });
  return <StoryblokComponent blok={story?.content} />;
};

export default CategoryPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
