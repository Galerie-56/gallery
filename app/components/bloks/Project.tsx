import { useState, useRef, useEffect } from 'react';
import {
  storyblokEditable,
  renderRichText,
  StoryblokComponent,
} from '@storyblok/react';
import { ProjectStoryblok } from '~/types';
import { SlideShow } from '../SlideShow';
import { Link } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
// import { SocialShare } from "../SocialShare";
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
  } = blok;
  const { projectName, prevProject, nextProject } = useLoaderData();

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : '10rem'; // Adjust this value to match the height of 5 lines
    }
  }, [isExpanded]);

  const url = typeof window !== 'undefined' && window.location.href;

  return (
    <article {...storyblokEditable(blok)} key={blok._uid} className="">
      <h1>{projectName}</h1>
      <div className="md:flex gap-20">
        <div className="md:w-1/2">
          <div
            dangerouslySetInnerHTML={{
              __html: `Problem: ${renderRichText(brief)}`,
            }}
            className="prose mb-5"
          />
          <div
            className="relative overflow-hidden transition-max-height duration-500 ease-in-out"
            style={{ maxHeight: isExpanded ? 'none' : '10rem' }} // Adjust this value to match the height of 5 lines
            ref={contentRef}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `Solution: ${renderRichText(solution)}`,
              }}
              className="prose text-primary"
            />
          </div>
          <button
            onClick={toggleReadMore}
            className=" bg-transparent hover:bg-transparent capitalize my-5 text-primary p-0 font-bold"
          >
            {isExpanded ? 'Close' : 'Read More'}
          </button>
          {/* <SocialShare url={url} /> */}
        </div>
        <div className="md:w-1/2 uppercase">
          <div className="flex gap-10">
            <div className="w-1/2 space-y-5">
              <div>
                <h4 className="text-[12px]">Category</h4>
                <div className="uppercase">{category?.name}</div>
              </div>
              <div>
                <h4 className="text-[12px]">Project Code</h4>
                <div className="uppercase">{project_code}</div>
              </div>
              {photographer && (
                <div>
                  <h4 className="text-[12px]">Photographer</h4>
                  <div className="uppercase">{photographer}</div>
                </div>
              )}
              {architect && (
                <div>
                  <h4 className="text-[12px]">Architect</h4>
                  <div className="uppercase">{architect}</div>
                </div>
              )}
              {awards?.length > 0 && (
                <div>
                  <h4 className="text-[12px]">Awards</h4>
                  <div className="uppercase">
                    {awards?.map((award) => (
                      <div className="mb-5" key={award._uid}>
                        {award.year} <br /> {award.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {press?.length > 0 && (
                <div>
                  <h4 className="text-[12px]">Press</h4>
                  <div className="uppercase">
                    {press?.map((p) => (
                      <div className="mb-5" key={p._uid}>
                        {p.title}
                      </div>
                    ))}
                  </div>
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
