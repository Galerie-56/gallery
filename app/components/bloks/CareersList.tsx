import { useLoaderData, Link } from '@remix-run/react';
import type { CareersListStoryblok, CareerStoryblok } from '~/types';

interface Career {
  name: string;
  full_slug: string;
  content: {
    category: string;
  };
}

export const CareersList = ({ blok }: { blok: CareersListStoryblok }) => {
  const { careers } = useLoaderData<{ careers: Career[] }>();

  if (!careers || careers.length === 0) {
    return <div>{blok.not_hiring}</div>;
  }

  // Group careers by category
  const careersByCategory = careers.reduce((acc, career) => {
    const category = career.content.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(career as unknown as CareerStoryblok);
    return acc;
  }, {} as Record<string, CareerStoryblok[]>);

  return (
    <div className="mb-5">
      {Object.keys(careersByCategory).map((category) => (
        <div key={category}>
          <h3 className="uppercase text-xs mt-3">{category}</h3>
          <ul>
            {careersByCategory[category].map((career) => (
              <li key={career.full_slug}>
                <Link to={`/${career.full_slug}`}>{career.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
