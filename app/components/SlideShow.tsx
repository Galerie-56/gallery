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

export const SlideShow = ({
  images,
  size = '0x960',
  location = 'project',
  ...props
}) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const mainImage = useMemo(
    () =>
      images.map((image, index) => (
        <CarouselItem
          key={index}
          className={`flex justify-center align-bottom ${props.className}`}
        >
          <div>
            <img
              src={`${image.filename}/m/${size}`}
              alt={image.alt_text}
              className="w-full h-auto object-cover"
            />
          </div>
        </CarouselItem>
      )),
    [images, location, size]
  );

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
    <>
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
        <CarouselContent>{mainImage}</CarouselContent>

        {location != 'home' && (
          <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
        )}
        {location != 'home' && (
          <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500" />
        )}
      </Carousel>
      {/* {location !== "home" && (
        <div className="flex gap-5 mt-4 flex-wrap">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative cursor-pointer ${
                index === current ? "opacity-60" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <div
                className={`bg-white flex items-center justify-center`}
                style={{
                  width: "135px",
                  height: "135px",
                }}
              >
                <img
                  src={`${image.filename}/m/135x135`}
                  alt={image.alt_text}
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
          ))}
        </div>
      )} */}
    </>
  );
};
