import { storyblokEditable } from "@storyblok/react";

export const ImageFields = ({ blok }) => {
  const { image, link, name, _uid } = blok;
  return (
    <div
      key={_uid}
      {...storyblokEditable(blok)}
      className="w-full h-full flex justify-center items-center"
    >
      <img src={`${image?.filename}/m/180x0`} />
    </div>
  );
};
