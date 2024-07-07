import { useState } from 'react';
import { storyblokEditable, renderRichText } from '@storyblok/react';
import { ProjectStoryblok } from '~/types';
import { SlideShow } from '../SlideShow';
import { Link } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';

import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';
import { LightboxCarousel } from '~/components/LightBoxCarousel';

export const Project = ({ blok }: { blok: ProjectStoryblok }) => {
  const {
    architect,
    awards,
    brief,
    category,
    photographer,
    press,
    project_code,
    slideshow,
    solution,
    seo,
    landscape_image,
    flipbook,
  } = blok;
  const { projectName, prevProject, nextProject } = useLoaderData();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <article {...storyblokEditable(blok)} key={blok._uid} className="">
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
        <div className="md:w-1/2 uppercase">
          <div className="flex gap-10">
            <div className="w-1/2 space-y-5">
              {photographer && (
                <div>
                  <h4 className="text-[12px]">Photographer</h4>
                  <div className="uppercase">{photographer}</div>
                </div>
              )}
            </div>
            <div className="w-1/2 space-y-5">
              {nextProject && (
                <div>
                  <h4 className="text-[12px]">Next</h4>
                  <Link
                    prefetch="intent"
                    to={`/${nextProject?.full_slug}`}
                    className="uppercase"
                  >
                    {nextProject?.headline}
                  </Link>
                </div>
              )}
              {prevProject && (
                <div>
                  <h4 className="text-[12px]">Previous</h4>
                  <Link
                    prefetch="intent"
                    to={`/${prevProject?.full_slug}`}
                    className="uppercase"
                  >
                    {prevProject?.headline}
                  </Link>
                </div>
              )}
              <div>
                <h4 className="text-[12px]">View all</h4>
                <Link to="/exhibitions" prefetch="intent" className="uppercase">
                  exhibitions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-7">
        <img
          src={`${landscape_image?.filename}/m/1220x0`}
          alt={landscape_image?.alt}
          className="w-full" // Ensure the main image takes full width
        />
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 md:gap-4 gap-2  mt-4">
          {' '}
          {/* Changed to grid layout */}
          {slideshow?.map((image, index) => (
            <Dialog key={image._uid}>
              <DialogTrigger asChild>
                <a
                  onClick={() => setActiveIndex(index)}
                  className="block aspect-square cursor-pointer"
                >
                  {' '}
                  {/* Added aspect-square for consistent height */}
                  <img
                    src={`${image.filename}/m/300x300`}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:opacity-60 transition duration-300 " // Ensure image fills the container
                  />
                </a>
              </DialogTrigger>
              <DialogContent className="!w-full h-full flex-col justify-center items-center border-none shadow-none">
                <LightboxCarousel
                  images={slideshow}
                  startIndex={activeIndex}
                  location="project"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </article>
  );
};
