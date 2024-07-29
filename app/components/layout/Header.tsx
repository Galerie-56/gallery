import { Link, useLoaderData } from '@remix-run/react';
import type { loader } from '~/root';
import { MainMenu } from './MainMenu';
import { SlideMenu } from './SlideMenu';

export const Header = () => {
  const { logo } = useLoaderData<typeof loader>();

  return (
    <header>
      <div className="container py-5 lg:pt-10 lg:pb-12 flex items-center justify-between">
        <Link to="/">
          <img
            src={`${logo.filename}/m/700x150`}
            alt={logo.alt}
            className="md:w-[350px] w-[200px]"
          />
        </Link>
        <MainMenu />
        <SlideMenu className="lg:hidden" />
      </div>
    </header>
  );
};
