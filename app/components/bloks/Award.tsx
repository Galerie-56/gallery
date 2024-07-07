import { storyblokEditable } from "@storyblok/react";
import type { AwardStoryblok } from "~/types";

export const Award = ({ blok }: AwardStoryblok) => {
  const { _uid, title, year, link, thumbnail, description, description_link } = blok;

  return (
    <div
      {...storyblokEditable(blok)}
      key={_uid}
      className="flex flex-col items-start py-4"
    >
      <div className="mb-2 w-full">
        <a href={link?.cached_url} target="_blank" rel="noopener noreferrer">
          <img
            src={`${thumbnail.filename}/m/400x250/`}
            alt={thumbnail.alt}
            className="w-full h-auto"
          />
        </a>
      </div>
      <div className="w-full">
        <a
          href={link?.cached_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black font-bold"
        >
          {title}
        </a>
      </div>
      <div className="w-full mt-2 tex-sm hover:text-black">
        <a href={description_link?.cached_url} target="_blank" rel="noopener noreferrer">
          {description}
        </a>
      </div>
      {year && (
        <div className="text-sm mt-2 w-full">{year}</div>
      )}
    </div>
  );
};
