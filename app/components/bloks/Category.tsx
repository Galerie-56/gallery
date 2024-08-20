import { useLoaderData, Link } from '@remix-run/react';
import { storyblokEditable } from '@storyblok/react';
import type { CategoryStoryblok } from '~/types';
import type { loader } from '~/routes/categories.$';
import { ProductsList } from '../ProductsList';
import { useState, useRef, useEffect, useMemo } from 'react';

export const Category = ({ blok }: CategoryStoryblok) => {
  const { uuid, name, allCategories } = useLoaderData<typeof loader>();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  blok.headline = name;

  const sortedCategories = useMemo(() => {
    return [...allCategories].sort((a, b) => a.name.localeCompare(b.name));
  }, [allCategories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <div className="mb-10">
        <h1 className="text-[24px] uppercase mb-10">{blok.headline}</h1>
        {blok.description ? <p>{blok.description}</p> : null}
        <div className="relative mt-4 w-[300px] ml-auto" ref={menuRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-2 border rounded text-left bg-white text-sm capitalize"
          >
            {name.toLowerCase()}
          </button>
          {isOpen && (
            <div className="absolute z-10 right-0 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
              {sortedCategories.map((category) => (
                <Link
                  key={category.uuid}
                  to={`/${category.full_slug}`}
                  className="block p-2 hover:bg-gray-100 text-sm capitalize"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name.toLowerCase()}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <ProductsList uuid={uuid} />
    </div>
  );
};
