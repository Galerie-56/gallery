import { useLoaderData } from '@remix-run/react';
import { storyblokEditable, renderRichText } from '@storyblok/react';
import { loader } from '~/routes/designers.$';
import { ProductsGrid } from '~/components/ProductsGrid';
import { DesignerStoryblok } from '~/types';

export const Designer = ({ blok }: { blok: DesignerStoryblok }) => {
  const { text, image, products } = blok;

  const {
    story: { name },
  } = useLoaderData<typeof loader>();
  return (
    <article {...storyblokEditable(blok)} key={blok._uid}>
      <h1>{name}</h1>
      <div className="flex justify-center mb-5">
        <img src={`${image?.filename}/m/1200x800`} alt={image?.alt} />
      </div>
      <div
        className="prose text-primary"
        dangerouslySetInnerHTML={{ __html: renderRichText(text) }}
      />
      {products && <ProductsGrid products={products} />}
    </article>
  );
};
