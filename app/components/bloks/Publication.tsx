import { storyblokEditable } from "@storyblok/react";
import { PublicationStoryblok } from "~/types";

export const Publication = ({ blok }: { blok: PublicationStoryblok }) => {
  const { _uid, title, thumbnail, author, year, url } = blok;
  return (
    <div
      {...storyblokEditable(blok)}
      key={_uid}
      className="flex flex-col md:flex-row border-t border-gray-300 py-4"
    >
      <div className="text-sm mb-2 md:mb-0 md:w-1/6 text-center md:text-left">
        {year}
      </div>
      <div className="mb-2 md:mb-0 md:w-1/6 flex justify-center md:justify-start md:mr-20">
        <a href={url?.cached_url} target="_blank" rel="noopener noreferrer">
          <img
            src={`${thumbnail?.filename}/m/166x0/`}
            alt={thumbnail?.alt}
            className="w-full h-auto"
          />
        </a>
      </div>
      <div className="md:w-4/6 text-center md:text-left">
        <a
          href={url?.cached_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          {title}
        </a>
        <div className="mt-2 text-sm">by {author}</div>
      </div>
    </div>
  );
};
