import { storyblokEditable } from '@storyblok/react';
import { SlideshowStoryblok } from '~/types';
import { SlideShow } from '../SlideShow';
import { Link } from '@remix-run/react';

export const HomeSlideShow = ({ blok }: { blok: SlideshowStoryblok }) => {
  const { images, _uid } = blok;
  return (
    <div className="container ">
      <Link to="/exhibitions" {...storyblokEditable(blok)} key={_uid}>
        <SlideShow
          images={images}
          location="home"
          className="h-[300px] md:h-[500px] lg:h-[763px]"
          size="0x763"
        />
      </Link>
    </div>
  );
};
