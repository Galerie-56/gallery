import { storyblokEditable } from "@storyblok/react";
import type { ProfileStoryblok } from "~/types";
import { renderRichText } from "@storyblok/react";

export const Profile = ({ blok }: ProfileStoryblok) => {
  const { _uid, description, photo } = blok;
  return (
    <div
      {...storyblokEditable(blok)}
      key={_uid}
      className="flex flex-col md:flex-row justify-between items-start  py-4 md:space-x-5"
    >
      <div className="mb-2 md:mb-0 md:w-1/3">
        <img
          src={`${photo.filename}/m/197x197/filters:quality(80)`}
          alt={photo.alt}
          className="w-full h-auto"
        />
      </div>
      <div className="md:w-2/3">
        <div
          className="mt-2"
          dangerouslySetInnerHTML={{ __html: renderRichText(description) }}
        />
      </div>
    </div>
  );
};
