import { LoaderFunction, LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  StoryblokComponent,
  getStoryblokApi,
  useStoryblokState,
} from '@storyblok/react';
import { GeneralErrorBoundary } from '~/components/GeneralErrorBoundary';
import { NotFoundPage } from '~/components/NotFoundPage';
import { getPerPage, getProductCardData, getTotal } from '~/lib';
import { ProductStoryblok } from '~/types';
import { isPreview } from '~/lib';

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  let slug = params['*'] ?? 'home';
  const version = isPreview() ? 'draft' : 'published';

  const sbApi = getStoryblokApi();
  let { data }: { data: any } = await sbApi
    .get(
      `cdn/stories/products/${slug}`,
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
  const { data: productsData } = await sbApi.get(
    `cdn/stories`,
    {
      //all posts data for the Blog page
      version: version as 'published' | 'draft',
      starts_with: 'products/',
      per_page: perPage,
      page,
      is_startpage: false,
    },
    { cache: 'no-store' }
  );

  const total = await getTotal('products');
  const products = productsData.stories.map((p: ProductStoryblok) =>
    getProductCardData(p)
  );

  // Find current project index
  const currentIndex = products.findIndex(
    (p: ProductStoryblok) => p.id === data.story.id
  );

  // Determine previous and next projects
  const prevProduct = currentIndex > 0 ? products[currentIndex - 1] : null;
  const nextProduct =
    currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  return json({
    story: data?.story,
    total,
    products,
    perPage,
    productName: data?.story?.name,
    prevProduct,
    nextProduct,
  });
};

const ProductsPage = () => {
  let { story } = useLoaderData<typeof loader>();
  story = useStoryblokState(story);
  return <StoryblokComponent blok={story?.content} />;
};

export default ProductsPage;

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => <NotFoundPage />,
      }}
    />
  );
}
