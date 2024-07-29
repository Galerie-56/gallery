import { Link } from '@remix-run/react';
import { ProductStoryblok } from '~/types';

export const ProductCard = ({ product }: { product: ProductStoryblok }) => {
  const { headline, image, full_slug, subtitle } = product;

  return (
    <div className="relative overflow-hidden">
      <Link to={`/${full_slug}`}>
        <img src={`${image?.filename}/m/`} alt={image?.alt_text} />
        <div className="absolute inset-0 bg-white bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col p-5 uppercase text-primary">
          <h2>{headline}</h2>
          <div className="text-sm">{subtitle}</div>
        </div>
      </Link>
    </div>
  );
};
