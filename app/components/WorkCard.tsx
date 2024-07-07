import { Link } from '@remix-run/react';
import type { ProductStoryblok } from '~/types';

export const WorkCard = ({ product }: { product: ProductStoryblok }) => {
  const {
    name,
    full_slug,
    content: { gallery },
  } = product;
  const image = gallery[0];
  return (
    <div className="relative overflow-hidden">
      <Link to={`/${full_slug}`}>
        <img src={`${image?.filename}/m/500x300`} alt={image?.alt_text} />
        <div className="absolute inset-0 bg-white bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col p-5 uppercase text-primary">
          <h2>{name}</h2>
        </div>
      </Link>
    </div>
  );
};
