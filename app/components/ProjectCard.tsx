import { Link } from '@remix-run/react';
import { ProjectStoryblok } from '~/types';

export const ProjectCard = ({ project }: { project: ProjectStoryblok }) => {
  const { headline, image, project_code, full_slug, category, name } = project;

  return (
    <div className="relative overflow-hidden">
      <Link to={`/${full_slug}`} className="block h-full">
        <img
          src={`${image?.filename}/m/394x527`}
          alt={image?.alt_text}
          // className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-white bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col p-5 uppercase">
          <h2 className="text-xl mb-3">{headline}</h2>
          <div className="text-sm">{category?.name}</div>
          <div>{project_code}</div>
        </div>
      </Link>
    </div>
  );
};
