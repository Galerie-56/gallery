import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = () => {
  const content = `User-agent: *
Allow: /
Sitemap: https://galerie56.com/sitemap.xml`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
