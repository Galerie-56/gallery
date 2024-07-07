import {
  storyblokEditable,
  StoryblokComponent,
  renderRichText,
} from "@storyblok/react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { LightboxCarousel } from "~/components/LightBoxCarousel";
import React, { useState } from "react";

export const ProductSerie = ({ blok }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div key={blok._uid} {...storyblokEditable(blok)}>
      <h2>{blok.title}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: renderRichText(blok.text) }}
        className="prose"
      />
      <div className="flex flex-wrap justify-center sm:justify-start gap-10 lg:gap-20 py-10">
        {blok.images?.map((nestedBlok, index) => (
          <Dialog key={nestedBlok._uid}>
            <DialogTrigger asChild>
              <a onClick={() => setActiveIndex(index)}>
                <StoryblokComponent blok={nestedBlok} />
              </a>
            </DialogTrigger>
            <DialogContent className="!w-full h-full flex-col justify-center items-center border-none shadow-none">
              <LightboxCarousel images={blok.images} startIndex={activeIndex} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};
