export const cacheControl = ({
  maxAge = 60,
  sMaxAge = 604800,
  staleWhileRevalidate = 6048000,
}: {
  maxAge?: number;
  sMaxAge?: number;
  staleWhileRevalidate?: number;
}) => {
  return {
    "Cache-Control": `public,max-age=${maxAge}, s-maxage=${sMaxAge}, stale-while-revalidate:${staleWhileRevalidate}`,
  };
};
