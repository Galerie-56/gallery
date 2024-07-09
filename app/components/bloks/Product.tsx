import { useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import { storyblokEditable, renderRichText } from '@storyblok/react';
import { ProductStoryblok } from '~/types';
import { Link } from '@remix-run/react';
import { loader } from '~/routes/products.$';
import { CategoryStoryblok, GalleryStoryblok } from '~/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { useForm, ValidationError } from '@formspree/react';

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
  let { text, gallery, categories, pdf, add_to_cart } = blok;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [state, handleSubmit] = useForm('xwpekyrl');
  // @ts-ignore
  categories = categories.filter(
    // @ts-ignore
    (category: CategoryStoryblok) => category.slug !== 'previously-exhibited'
  );

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
                  src={`${image.filename}/m/600x0`}
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
              {/* @ts-ignore */}
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
            {pdf && pdf.cached_url ? (
              <a href={pdf.cached_url} download={`${productName}.pdf`}>
                SAVE AS PDF
              </a>
            ) : (
              <button onClick={savePDF}>SAVE AS PDF</button>
            )}
          </div>
          <div className="mt-4 no-print">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="font-bold">PRICE ON REQUEST</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] sm:max-h-[800px] right-1/2 transform translate-x-1/2 mt-10 overflow-y-auto">
                {state.succeeded ? (
                  <p>Thanks for your request. We'll get back to you soon!</p>
                ) : (
                  <div className="text-center font-bold w-full sm:p-10">
                    <h1 className="capitalize font-bold text-lg text-black">
                      Request A Price
                    </h1>
                    <div className="flex justify-between w-full">
                      <img
                        src={`${gallery?.[0]?.filename}/m/100x0`}
                        alt={`${productName} - Image`}
                      />
                      <h3>{productName}</h3>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-4 request-price"
                    >
                      <input
                        type="hidden"
                        name="productName"
                        value={productName}
                      />
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium"
                        >
                          Your name
                        </label>
                        <input
                          id="name"
                          name="name"
                          className="w-full p-2 border rounded-md"
                          required
                        />
                        <ValidationError
                          prefix="Name"
                          field="name"
                          errors={state.errors}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium"
                        >
                          Your email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="w-full p-2 border rounded-md"
                          required
                        />
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium"
                        >
                          Your phone number (optional)
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="w-full p-2 border rounded-md"
                        />
                        <ValidationError
                          prefix="Phone"
                          field="phone"
                          errors={state.errors}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium"
                        >
                          Address (optional)
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          className="w-full p-2 border rounded-md"
                          rows={3}
                        />
                        <ValidationError
                          prefix="Address"
                          field="address"
                          errors={state.errors}
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium"
                        >
                          Your message (optional)
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          className="w-full p-2 border rounded-md"
                          rows={4}
                        />
                        <ValidationError
                          prefix="Message"
                          field="message"
                          errors={state.errors}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={state.submitting}
                        className="w-full p-2 bg-primary text-white rounded"
                      >
                        {state.submitting ? 'Sending...' : 'Send Request'}
                      </button>
                    </form>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </article>
  );
};
