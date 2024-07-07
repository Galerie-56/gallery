import { Link } from '@remix-run/react';

interface ProjectNavigationProps {
  className: string;
  photographer?: string;
  nextProject?: { full_slug: string; headline: string };
  prevProject?: { full_slug: string; headline: string };
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  className,
  photographer,
  nextProject,
  prevProject,
}) => {
  return (
    <div className={className}>
      <div className="flex gap-10">
        <div className="w-1/2 space-y-5">
          {photographer && (
            <div>
              <h4 className="text-[12px]">Photographer</h4>
              <div className="uppercase">{photographer}</div>
            </div>
          )}
        </div>
        <div className="w-1/2 space-y-5">
          {nextProject && (
            <div>
              <h4 className="text-[12px]">Next</h4>
              <Link
                prefetch="intent"
                to={`/${nextProject.full_slug}`}
                className="uppercase"
              >
                {nextProject.headline}
              </Link>
            </div>
          )}
          {prevProject && (
            <div>
              <h4 className="text-[12px]">Previous</h4>
              <Link
                prefetch="intent"
                to={`/${prevProject.full_slug}`}
                className="uppercase"
              >
                {prevProject.headline}
              </Link>
            </div>
          )}
          <div>
            <h4 className="text-[12px]">View all</h4>
            <Link to="/exhibitions" prefetch="intent" className="uppercase">
              exhibitions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
