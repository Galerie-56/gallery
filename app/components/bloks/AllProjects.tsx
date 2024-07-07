import { storyblokEditable } from "@storyblok/react";
import type { AllProjectsStoryblok } from "~/types";
import { ProjectsList } from "../ProjectsList";

export const AllProjects = ({ blok }: AllProjectsStoryblok) => {
  const { _uid } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid} className="">
      <ProjectsList />
    </div>
  );
};
