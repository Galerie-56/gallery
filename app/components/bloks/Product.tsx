import { useLoaderData } from "@remix-run/react";
import {
  storyblokEditable,
  renderRichText,
  StoryblokComponent,
} from "@storyblok/react";
import { ProductStoryblok } from "~/types";
import { Link } from "@remix-run/react";
import React from "react";

export const Product = ({ blok }: { blok: ProductStoryblok }) => {
  const { productName, nextProduct, prevProduct } = useLoaderData();
  const { text, product_series: series, brochures } = blok;

  return (
    <article
      {...storyblokEditable(blok)}
      key={blok._uid}
      className="max-w-full"
    >
      <h1>{productName}</h1>
      <div className="flex flex-col md:flex-row md:gap-20">
        <div className="w-full md:w-1/2">
          <div
            dangerouslySetInnerHTML={{ __html: renderRichText(text) }}
            className="prose"
          />
        </div>
        <div className="w-1/2 uppercase ">
          <div className="gap-10 space-y-4">
            {nextProduct && (
              <div>
                <h4 className="text-[12px]">Next</h4>
                <Link
                  prefetch="intent"
                  to={`/${nextProduct?.full_slug}`}
                  className="uppercase"
                >
                  {nextProduct?.headline}
                </Link>
              </div>
            )}
            {prevProduct && (
              <div>
                <h4 className="text-[12px]">Previous</h4>
                <Link
                  prefetch="intent"
                  to={`/${prevProduct?.full_slug}`}
                  className="uppercase"
                >
                  {prevProduct?.headline}
                </Link>
              </div>
            )}
            <div>
              <h4 className="text-[12px]">View all</h4>
              <Link prefetch="intent" to="/products" className="uppercase">
                products
              </Link>
            </div>
            <div>
              {brochures?.length > 0 && (
                <h4 className="text-[12px]">product catalog</h4>
              )}
              <div className="flex gap-4">
                {brochures?.map((brochure) => (
                  <a
                    href={brochure.link?.cached_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={brochure._uid}
                  >
                    <img src={`${brochure.image?.filename}/m/135x203`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {series?.map((nestedBlok) => (
          <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
        ))}
      </div>
    </article>
  );
};
