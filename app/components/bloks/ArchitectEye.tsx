import { storyblokEditable } from "@storyblok/react";
import { Divide } from "lucide-react";
import { ArchitectEyeStoryblok } from "~/types";

export const ArchitectEye = ({ blok }: ArchitectEyeStoryblok) => {
  const { _uid, date, image, description, link, title } = blok;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div
      key={_uid}
      className="flex flex-col md:flex-row justify-between items-start  border-t border-gray-300 py-4"
      {...storyblokEditable(blok)}
    >
      {date ? (
        <div className=" text-sm mb-2 md:mb-0 md:w-1/6">{formattedDate}</div>
      ) : (
        <div className="w-1/6" />
      )}
      <div className="mb-2 md:mb-0 md:w-1/6 md:mr-20">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img
            src={`${image.filename}/m/166x0/`}
            alt={image.alt}
            className="w-full h-auto"
          />
        </a>
      </div>
      <div className="md:w-4/6">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black"
        >
          {title}
        </a>
        <div
          className="mt-2 text-sm"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};
