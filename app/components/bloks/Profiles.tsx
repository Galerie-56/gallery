import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { ProfileStoryblok, ProfilesStoryblok } from "~/types";

export const Profiles = ({ blok }: ProfilesStoryblok) => {
  let { items, title, _uid } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid} className="my-10">
      <h2 className="text-[24px] uppercase">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((nestedBlok: ProfileStoryblok) => (
          <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
        ))}
      </div>
    </div>
  );
};
