import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import { useLoaderData } from '@remix-run/react';
import type { NavItemStoryblok } from '~/types';
import { type loader } from '~/root';

export const MainMenu = () => {
  let { headerNav: nav } = useLoaderData<typeof loader>();

  // if (!nav || !nav.menu_items) return null;

  return (
    <nav
      className="menu hidden lg:block"
      aria-label="main"
      {...storyblokEditable(nav)}
    >
      <nav role="menu" className="flex">
        {nav.map((nestedBlok: NavItemStoryblok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </nav>
    </nav>
  );
};
