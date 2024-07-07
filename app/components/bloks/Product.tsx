import { useLoaderData } from '@remix-run/react';
import { storyblokEditable, renderRichText } from '@storyblok/react';
import { ProductStoryblok } from '~/types';
import { Link } from '@remix-run/react';
import { loader } from '~/routes/products.$';
import { CategoryStoryblok, GalleryStoryblok } from '~/types';

const savePDF = () => {
  const style = document.createElement('style');
  style.textContent = `
  @media print {
    body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    @page { size: auto; margin: 20mm; }
    header, footer, nav, .no-print { display: none !important; }
  }
`;
  document.head.appendChild(style);

  window.print();

  document.head.removeChild(style);
};

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
              {gallery.map((image: GalleryStoryblok, index: number) => (
                <img
                  key={index}
                  src={image.filename}
                  alt={`${productName} - Image`}
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
            <div className="mt-4 no-print">
              Categories:
              {categories.map((category: CategoryStoryblok, index: number) => (
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
          <div className="mt-4 border-b border-slate-300 w-[200px] pb-4 mb-6 hover:text-black transition duration-300 hover:underline">
            <button onClick={savePDF}>SAVE AS PDF</button>
          </div>
          <div className=" no-print">
            <p className="font-bold">PRICE ON REQUEST</p>
          </div>
        </div>
      </div>
    </article>
  );
};
