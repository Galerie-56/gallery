import { storyblokEditable, renderRichText } from '@storyblok/react';
import type { ImageFullStoryblok } from '~/types';

export const ImageFull = ({ blok }: { blok: ImageFullStoryblok }) => {
  const { _uid, image } = blok;

  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      <img
        src={`${image?.filename}/m/1220x0/filters:quality(80)`}
        alt={image?.alt}
      />
    </div>
  );
};
