import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { ArchitectEyeStoryblok, ArchitectEyesStoryblok } from "~/types";

export const ArchitectEyes = ({ blok }: ArchitectEyesStoryblok) => {
  let { items, _uid } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      {items.map((nestedBlok: ArchitectEyeStoryblok) => (
        <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
      ))}
    </div>
  );
};
