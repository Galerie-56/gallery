import { Link } from '@remix-run/react';

export const WorkCard = ({
  headline,
  full_slug,
  image,
  designer,
}: {
  headline: string;
  full_slug: string;
  image: { filename: string; alt_text: string };
  designer?: boolean;
}) => {
  const size = designer ? '1400x940' : '1000x600';
  return (
    <div className="relative overflow-hidden">
      <Link to={`/${full_slug}`}>
        <img src={`${image?.filename}/m/${size}`} alt={image?.alt_text} />
        <div className="absolute inset-0 bg-white bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col p-5 uppercase text-primary">
          <h2>{headline}</h2>
        </div>
      </Link>
    </div>
  );
};
