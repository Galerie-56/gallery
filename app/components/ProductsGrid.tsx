import { ProductStoryblok } from '~/types';
import { WorkCard } from './WorkCard';

export const ProductsGrid = ({
  products,
}: {
  products: ProductStoryblok[];
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-2  mt-4">
      {products.map((product: ProductStoryblok) => {
        const {
          name,
          full_slug,
          content: { gallery },
        } = product;
        const image = gallery[0];
        return (
          <WorkCard
            key={product.id}
            headline={name}
            full_slug={full_slug}
            image={image}
          />
        );
      })}
    </div>
  );
};
