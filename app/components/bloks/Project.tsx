import { useState } from 'react';
import { storyblokEditable, renderRichText } from '@storyblok/react';
import { ProjectStoryblok } from '~/types';
import { SlideShow } from '../SlideShow';
import { useLoaderData } from '@remix-run/react';
import { ProjectNavigation } from '../ProjectNavigation';
import { ProductsGrid } from '~/components/ProductsGrid';

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
                  src={`${flipbook}&u=galerie56.com&hideIssuuLogo=true&showOtherPublicationsAsSuggestions=true&layout=http%3A%2F%2Fskin.issuu.com%2Fv%2Flight%2Flayout.xml&showFlipBtn=true`}
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
      <div className="mt-7">
        <SlideShow
          images={slideshow}
          className="h-[300px] md:h-[500px] lg:h-[763px]"
        />
        <ProductsGrid products={products} />
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
