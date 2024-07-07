import { useLoaderData } from '@remix-run/react';
import { storyblokEditable, renderRichText } from '@storyblok/react';
import { ProductStoryblok } from '~/types';
import { Link } from '@remix-run/react';
import { loader } from '~/routes/products.$';

export const Product = ({ blok }: { blok: ProductStoryblok }) => {
  const { productName } = useLoaderData<typeof loader>();
  const { text, gallery, categories } = blok;

  return (
    <article
      {...storyblokEditable(blok)}
      key={blok._uid}
      className="max-w-full"
    >
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="w-full md:w-2/3 mb-5 md:mb-0">
          {gallery && gallery.length > 0 && (
            <div className="space-y-4">
              {gallery.map((image, index) => (
                <img
                  key={index}
                  src={image.filename}
                  alt={`${productName} - Image ${index + 1}`}
                  className="w-full"
                />
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3">
          <div className="prose text-primary">
            <h1 className="text-primary font-normal text-xl">{productName}</h1>
            <div dangerouslySetInnerHTML={{ __html: renderRichText(text) }} />
          </div>
          {categories && categories.length > 0 && (
            <div className="mt-4">
              Categories:
              {categories.map((category, index) => (
                <Link
                  key={category._uid}
                  to={`/${category.full_slug}`}
                  className="underline"
                >
                  {category.name}
                  {index < categories.length - 1 && ', '}
                </Link>
              ))}
            </div>
          )}
          <div className="mt-4">
            <button className="bg-gray-200 text-gray-700 px-4 py-2">
              SAVE AS PDF
            </button>
          </div>
          <div className="mt-4">
            <p className="font-bold">PRICE ON REQUEST</p>
          </div>
        </div>
      </div>
    </article>
  );
};
