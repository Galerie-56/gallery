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
import type { ProductStoryblok, ProjectStoryblok } from '~/types';
import {
  getPerPage,
  getProjectCardData,
  getTotal,
  invariantResponse,
  cacheControl,
  getProductCardData,
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

  // const total = await getTotal(uuid, 'products');
  const response = await fetch(
    `https://api.storyblok.com/v2/cdn/stories?token=${process.env.STORYBLOK_PREVIEW_TOKEN}&starts_with=products/&version=draft&is_startpage=false&search_term=${uuid}`,
    { cache: 'no-store' }
  );
  const total = await response?.headers.get('total');

  const headers = {
    ...cacheControl,
  };

  const products = postsByContentType?.stories.map((p: ProductStoryblok) =>
    getProductCardData(p)
  );

  // Fetch all categories
  const { data: categoriesData } = await sbApi.get(
    'cdn/stories',
    {
      version: version as 'published' | 'draft',
      starts_with: 'categories/',
      is_startpage: false,
      per_page: 100,
    },
    { cache: 'no-store' }
  );

  const allCategories = categoriesData?.stories.map((category: any) => {
    return {
      uuid: category.uuid,
      name: category.name,
      full_slug: category.full_slug,
    };
  });

  return json(
    {
      story,
      uuid: uuid,
      name: story.name,
      products,
      perPage,
      total,
      allCategories, // Add categories to the returned data
    },
    { headers }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return { 'Cache-Control': loaderHeaders.get('Cache-Control') };
};

const CategoryPage = () => {
  let { story, categories } = useLoaderData<typeof loader>();
  story = useStoryblokState(story, { resolveRelations: ['product.category'] });
  return (
    <>
      <StoryblokComponent blok={story?.content} />
      {/* You can now use the categories data in your component */}
    </>
  );
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
