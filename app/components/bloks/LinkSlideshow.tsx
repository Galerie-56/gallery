import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '~/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { useState, useMemo, useEffect } from 'react';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import type { LinkSlideshowStoryblok, SlideStoryblok } from '~/types';

export const LinkSlideShow = ({ blok }) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  //   const mainImage = useMemo(
  //     () =>
  //       images.map((image, index) => (
  //         <CarouselItem
  //           key={index}
  //           className={`flex justify-center align-bottom ${props.className}`}
  //         >
  //           <StoryblokComponent key={image._uid} blok={image} />
  //         </CarouselItem>
  //       )),
  //     [images, location, size]
  //   );

  const handleThumbnailClick = (index: number) => {
    mainApi?.scrollTo(index);
    setCurrent(index);
  };

  useEffect(() => {
    if (mainApi) {
      mainApi.on('select', (index) => {
        setCurrent(index);
      });
    }
  }, [mainApi]);

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <Carousel
        setApi={setMainApi}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
          Fade(),
        ]}
        opts={{
          loop: true,
          align: 'center',
          containScroll: false,
        }}
      >
        <CarouselContent>
          {blok.items.map((slide: SlideStoryblok) => (
            <CarouselItem key={slide._uid}>
              <StoryblokComponent blok={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
