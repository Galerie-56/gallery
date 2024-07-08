import { storyblokEditable } from '@storyblok/react';
import type { AllProjectsStoryblok } from '~/types';
import { DesignersList } from '../DesignersList';

export const AllDesigners = ({ blok }: AllProjectsStoryblok) => {
  const { _uid } = blok;
  return (
    <div {...storyblokEditable(blok)} key={_uid} className="">
      <DesignersList />
    </div>
  );
};
