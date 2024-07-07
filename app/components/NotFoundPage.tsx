import { Link } from '@remix-run/react';

export const NotFoundPage = () => {
  return (
    <div className="text-center mx-auto">
      <h1>Nothing here...</h1>

      <Link to="/" className="text-xl underline">
        Back to home
      </Link>
    </div>
  );
};
