import { useState } from 'react';
import { getStoryblokApi } from '@storyblok/react';
import { useMatches } from '@remix-run/react';
import type { ProductStoryblok } from '~/types';
import { getProductCardData } from '~/lib';
import { WorkCard } from './WorkCard';

interface RouteData {
  total: number;
  products: ProductStoryblok[];
}

interface ProductsListType {
  uuid?: string;
}

export const ProductsList = ({ uuid }: ProductsListType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const matches = useMatches();
  const globalData = matches[0].data;
  const { total, products: firstsProducts } = matches[1].data as RouteData;
  const [products, setProducts] = useState(firstsProducts);

  interface GlobalData {
    perPage: number;
  }

  const sbApi = getStoryblokApi();

  const perPage = (globalData as GlobalData)?.perPage;

  const fetchProducts = async (page: number, uuid: string) => {
    const { data: products } = await sbApi.get(`cdn/stories`, {
      version: 'draft',
      starts_with: 'products/',
      per_page: perPage,
      page,
      is_startpage: false,
      search_term: uuid,
    });

    const nextProducts = products.stories.map((p: ProductStoryblok) =>
      getProductCardData(p)
    );

    setProducts((prevProducts: ProductStoryblok[]) => [
      ...prevProducts,
      ...nextProducts,
    ]);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProducts(nextPage, uuid || '');
  };
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-2  mt-4">
        {products.map((product: ProductStoryblok) => {
          const { headline, full_slug, image } = product;

          return (
            <WorkCard
              key={product.id}
              headline={headline}
              full_slug={full_slug}
              image={image}
            />
          );
        })}
      </div>
      {total && products.length < total && (
        <div className="w-full flex justify-center mt-5">
          <button className="button mx-auto py-4 px-7" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </>
  );
};
