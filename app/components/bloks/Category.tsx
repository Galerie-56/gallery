import { useLoaderData } from '@remix-run/react';
import { storyblokEditable } from '@storyblok/react';
import type { CategoryStoryblok } from '~/types';
import type { loader } from '~/routes/categories.$';
import { ProductsList } from '../ProductsList';

export const Category = ({ blok }: CategoryStoryblok) => {
  const { uuid } = useLoaderData<typeof loader>();

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <div className="mb-10">
        <h1 className="text-[24px] uppercase mb-10">{blok.headline}</h1>
        {blok.description ? <p>{blok.description}</p> : null}
      </div>
      <ProductsList uuid={uuid} />
    </div>
  );
};
