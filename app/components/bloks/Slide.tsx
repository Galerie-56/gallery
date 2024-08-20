import { Link } from '@remix-run/react';
import { storyblokEditable } from '@storyblok/react';
import type { SlideStoryblok } from '~/types';

export const Slide = ({ blok }: { blok: SlideStoryblok }) => {
  const { image, link, _uid } = blok;
  return (
    <div
      className="flex justify-center items-center"
      {...storyblokEditable(blok)}
      key={_uid}
    >
      <Link to={link?.cached_url}>
        <img src={`${image?.filename}/m/0x763`} alt={image?.alt} />
      </Link>
    </div>
  );
};
