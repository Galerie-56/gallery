import { useLoaderData } from '@remix-run/react';
import { storyblokEditable, renderRichText } from '@storyblok/react';
import { loader } from '~/routes/designers.$';
import { ProductStoryblok } from '~/types';
import { WorkCard } from '../WorkCard';

export const Designer = ({ blok }: { blok: any }) => {
  const { text, image, products } = blok;
  console.log(products);

  const {
    story: { name },
  } = useLoaderData<typeof loader>();
  return (
    <article>
      <h1>{name}</h1>
      <div className="flex justify-center mb-5">
        <img src={`${image?.filename}/m/1200x800`} alt={image?.alt} />
      </div>
      <div
        className="prose text-primary"
        dangerouslySetInnerHTML={{ __html: renderRichText(text) }}
      />
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
    </article>
  );
};
