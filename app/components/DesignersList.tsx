import { useState } from 'react';
import { getStoryblokApi } from '@storyblok/react';
import { useMatches } from '@remix-run/react';
import type { DesignerStoryblok } from '~/types';
import { getDesignerCardData } from '~/lib';
import { WorkCard } from '~/components/WorkCard';

interface RouteData {
  total: number;
  designers: DesignerStoryblok[];
}

interface DesignersListType {
  uuid?: string;
}

export const DesignersList = ({ uuid }: DesignersListType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const matches = useMatches();
  const globalData = matches[0].data;
  const { total, designers: firstsDesigners } = matches[1].data as RouteData;

  const [designers, setDesigners] = useState(firstsDesigners);
  console.log('total', total, designers);

  interface GlobalData {
    perPage: number;
  }

  const sbApi = getStoryblokApi();
  const resolveRelations = ['project.category'];

  const perPage = (globalData as GlobalData)?.perPage;

  const fetchDesigners = async (page: number, uuid: string) => {
    const { data: designers } = await sbApi.get(`cdn/stories`, {
      version: 'draft',
      starts_with: 'designers/',
      per_page: perPage,
      page,
      is_startpage: false,
      resolve_relations: resolveRelations,
      search_term: uuid,
    });

    const nextDesigners = designers.stories.map((d: DesignerStoryblok) =>
      getDesignerCardData(d)
    );

    setDesigners((prevDesigners: DesignerStoryblok[]) => [
      ...prevDesigners,
      ...nextDesigners,
    ]);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchDesigners(nextPage, uuid || '');
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {designers?.map((designer: DesignerStoryblok) => (
        <WorkCard
          key={designer.id}
          headline={designer.headline}
          full_slug={designer.full_slug}
          image={designer.image}
          designer
        />
      ))}
      {total && designers.length < total && (
        <div className="col-span-3 flex justify-center mt-4">
          <button className="button py-4 px-7" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
