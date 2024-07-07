import { storyblokEditable, renderRichText } from '@storyblok/react';
import type { CareerStoryblok } from '~/types';
import { useLoaderData } from '@remix-run/react';

export const Career = ({ blok }: { blok: CareerStoryblok }) => {
  const { story } = useLoaderData<{ careerName: string }>();

  const { content, _uid } = blok;

  return (
    <div {...storyblokEditable(blok)} key={_uid}>
      <h1>{story.name}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: renderRichText(content) }}
        className="prose max-w-[600px] text-primary"
      />
    </div>
  );
};
