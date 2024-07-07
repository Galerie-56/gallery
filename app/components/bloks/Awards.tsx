import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { AwardStoryblok, AwardsStoryblok } from "~/types";

export const Awards = ({ blok }: AwardsStoryblok) => {
  let { items, _uid } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((nestedBlok: AwardStoryblok) => (
        <StoryblokComponent key={nestedBlok._uid} blok={nestedBlok} />
      ))}
    </div>
  );
};
