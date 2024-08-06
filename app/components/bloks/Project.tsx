import { useState } from 'react';
import { storyblokEditable, renderRichText } from '@storyblok/react';
import { ProjectStoryblok } from '~/types';
import { SlideShow } from '../SlideShow';
import { useLoaderData } from '@remix-run/react';
import { ProjectNavigation } from '../ProjectNavigation';
import { ProductsGrid } from '~/components/ProductsGrid';
// import { Dialog } from '@headlessui/react'
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { LightboxCarousel } from '~/components/LightBoxCarousel';

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
        {/* <SlideShow
          images={slideshow}
          className="h-[300px] md:h-[500px] lg:h-[763px]"
        /> */}
        <Dialog>
          <DialogTrigger asChild>
            <a
              onClick={() => setActiveIndex(0)}
              className="block cursor-pointer"
            >
              <img
                src={`${landscape_image?.filename}/m/1600x0`}
                alt={landscape_image?.alt}
                className="w-full hover:opacity-60 transition duration-300"
              />
            </a>
          </DialogTrigger>
          <DialogContent className="!w-full h-full flex-col justify-center items-center border-none shadow-none">
            <LightboxCarousel
              images={[landscape_image, ...slideshow]}
              startIndex={activeIndex}
              location="project"
            />
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 md:gap-4 gap-2 mt-4">
          {slideshow?.map((image, index) => (
            <Dialog key={image._uid}>
              <DialogTrigger asChild>
                <a
                  onClick={() => setActiveIndex(index + 1)}
                  className="block aspect-square cursor-pointer"
                >
                  <img
                    src={`${image.filename}/m/300x300`}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:opacity-60 transition duration-300"
                  />
                </a>
              </DialogTrigger>
              <DialogContent className="!w-full h-full flex-col justify-center items-center border-none shadow-none">
                <LightboxCarousel
                  images={[landscape_image, ...slideshow]}
                  startIndex={index + 1}
                  location="project"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
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
