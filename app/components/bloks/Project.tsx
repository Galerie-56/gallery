import { useState } from 'react';
import { storyblokEditable, renderRichText } from '@storyblok/react';
import { ProjectStoryblok } from '~/types';
import { SlideShow } from '../SlideShow';
import { Link } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import { WorkCard } from '../WorkCard';
import type { ProductStoryblok } from '~/types';
import { ProjectNavigation } from '../ProjectNavigation';

export const Project = ({ blok }: { blok: ProjectStoryblok }) => {
  const {
    brief,
    photographer,
    slideshow,
    landscape_image,
    flipbook,
    products,
  } = blok;
  const { projectName, prevProject, nextProject } = useLoaderData();
  console.log('products', products);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <article
      {...storyblokEditable(blok)}
      key={blok._uid}
      className="flex flex-col"
    >
      <h1>{projectName}</h1>
      <div className="md:flex gap-20">
        <div className="md:w-1/2">
          <div
            dangerouslySetInnerHTML={{
              __html: `${renderRichText(brief)}`,
            }}
            className="prose mb-5"
          />
          {flipbook && (
            <div>
              <div className="relative pt-[60%] min-h-[326px] w-full mb-5 md:mb-0">
                <iframe
                  className="absolute inset-0 w-full h-full border-none"
                  src={`https://e.issuu.com/embed.html?d=${flipbook}&u=galerie56.com&hideIssuuLogo=true&showOtherPublicationsAsSuggestions=true&layout=http%3A%2F%2Fskin.issuu.com%2Fv%2Flight%2Flayout.xml&showFlipBtn=true`}
                ></iframe>
              </div>
            </div>
          )}
        </div>
        <ProjectNavigation
          className="md:w-1/2 uppercase hidden sm:block"
          photographer={photographer}
          nextProject={nextProject}
          prevProject={prevProject}
        />
      </div>
      <div className="mt-7 order-1 sm:order-none">
        <img
          src={`${landscape_image?.filename}/m/1220x0`}
          alt={landscape_image?.alt}
          className="w-full"
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
                name={name}
                full_slug={full_slug}
                image={image}
              />
            );
          })}
        </div>
        <ProjectNavigation
          className="md:w-1/2 uppercase sm:hidden mt-5"
          photographer={photographer}
          nextProject={nextProject}
          prevProject={prevProject}
        />
      </div>
    </article>
  );
};
