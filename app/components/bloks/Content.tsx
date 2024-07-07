import { storyblokEditable, renderRichText } from "@storyblok/react";
import type { ContentStoryblok } from "~/types";

export const Content = ({ blok }: { blok: ContentStoryblok }) => {
  const { _uid, text, image } = blok;
  return (
    <div
      {...storyblokEditable(blok)}
      key={_uid}
      className="flex flex-col md:flex-row gap-10 mb-10"
    >
      <div
        dangerouslySetInnerHTML={{ __html: renderRichText(text) }}
        className=" prose md:w-1/2"
      />
      <div>
        <img
          src={`${image.filename}/m/600x0/filters:quality(80)`}
          alt={image.alt}
        />
      </div>
    </div>
  );
};
