import type {
  ProjectStoryblok,
  ProductStoryblok,
  DesignerStoryblok,
} from '~/types';

export function getProjectCardData(p: ProjectStoryblok) {
  return {
    id: p.id,
    headline: p.name,
    full_slug: p.full_slug,
    image: p.content.portrait_image,
    category: p.content.category,
    project_code: p.content.project_code,
    tags: p.tag_list,
    uuid: p.uuid,
  };
}

export function getProductCardData(p: ProductStoryblok) {
  return {
    id: p.id,
    headline: p.name,
    subtitle: p.content.subtitle,
    full_slug: p.full_slug,
    image: p.content.image,
  };
}

export function getWorkCardData(p: ProductStoryblok) {
  return {
    id: p.id,
    headline: p.name,
    full_slug: p.full_slug,
    image: p.content.gallery[0].filename,
  };
}

export function getDesignerCardData(d: DesignerStoryblok) {
  return {
    id: d.id,
    headline: d.name,
    full_slug: d.full_slug,
    image: d.content.image,
  };
}
