import { useLoaderData } from "@remix-run/react";
import { StoryblokComponent } from "@storyblok/react";
import { type loader } from "~/root";
import { NavItemStoryblok } from "~/types";

export const MobileMenu = ({ ...props }) => {
  let { headerNav: nav } = useLoaderData<typeof loader>();
  return (
    <div {...props}>
      <nav className="mb-16 mobile-menu" aria-label="main">
        <ul role="menu" className="">
          {nav.map((nestedBlok: NavItemStoryblok) => (
            <StoryblokComponent
              blok={nestedBlok}
              key={nestedBlok._uid}
              mobile
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};
