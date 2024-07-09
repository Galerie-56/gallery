import {StoryblokStory} from 'storyblok-generate-ts'

export interface AllDesignersStoryblok {
  Designers?: string;
  _uid: string;
  component: "all-designers";
  [k: string]: any;
}

export interface AllProductsStoryblok {
  _uid: string;
  component: "all-products";
  [k: string]: any;
}

export interface AllProjectsStoryblok {
  _uid: string;
  component: "all-projects";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

export interface AssetStoryblok {
  _uid?: string;
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  source?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface ArchitectEyeStoryblok {
  title?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  image?: AssetStoryblok;
  description?: string;
  date?: string;
  _uid: string;
  component: "architect-eye";
  [k: string]: any;
}

export interface ArchitectEyesStoryblok {
  items?: ArchitectEyeStoryblok[];
  _uid: string;
  component: "architect-eyes";
  [k: string]: any;
}

export interface AwardStoryblok {
  title?: string;
  year?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  thumbnail?: AssetStoryblok;
  description?: string;
  description_link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "award";
  [k: string]: any;
}

export interface AwardsStoryblok {
  items?: AwardStoryblok[];
  _uid: string;
  component: "awards";
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface CareerStoryblok {
  content?: RichtextStoryblok;
  category?: string;
  active?: boolean;
  _uid: string;
  component: "career";
  [k: string]: any;
}

export interface CareersListStoryblok {
  not_hiring?: string;
  _uid: string;
  component: "careers-list";
  [k: string]: any;
}

export interface CategoryStoryblok {
  headline?: string;
  _uid: string;
  component: "category";
  [k: string]: any;
}

export interface ConfigStoryblok {
  address?: string;
  address_2?: string;
  address_3?: string;
  phone?: string;
  mail?: string;
  linkedin?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  facebook?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  instagram?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  pinterest?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  footer_text?: string;
  logo?: AssetStoryblok;
  header_nav?: NavItemStoryblok[];
  posts_per_page?: string;
  _uid: string;
  component: "config";
  [k: string]: any;
}

export interface ContactStoryblok {
  address?: string;
  phone?: string;
  email?: string;
  image?: AssetStoryblok;
  _uid: string;
  component: "contact";
  [k: string]: any;
}

export interface ContentStoryblok {
  text?: RichtextStoryblok;
  image?: AssetStoryblok;
  _uid: string;
  component: "content";
  [k: string]: any;
}

export interface DesignerStoryblok {
  text?: RichtextStoryblok;
  image?: AssetStoryblok;
  products?: (StoryblokStory<ProductStoryblok> | string)[];
  _uid: string;
  component: "designer";
  [k: string]: any;
}

export interface ImageFieldsStoryblok {
  name?: string;
  image?: AssetStoryblok;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "image-fields";
  [k: string]: any;
}

export interface ImageFullStoryblok {
  image?: AssetStoryblok;
  _uid: string;
  component: "image-full";
  [k: string]: any;
}

export interface NavItemStoryblok {
  label?: string;
  link?: MultilinkStoryblok;
  is_submenu?: boolean;
  sub_menu?: NavItemStoryblok[];
  _uid: string;
  component: "nav-item";
  [k: string]: any;
}

export interface PageStoryblok {
  headline?: string;
  body?: (
    | AllDesignersStoryblok
    | AllProductsStoryblok
    | AllProjectsStoryblok
    | ArchitectEyeStoryblok
    | ArchitectEyesStoryblok
    | AwardStoryblok
    | AwardsStoryblok
    | CareerStoryblok
    | CareersListStoryblok
    | CategoryStoryblok
    | ConfigStoryblok
    | ContactStoryblok
    | ContentStoryblok
    | DesignerStoryblok
    | ImageFieldsStoryblok
    | ImageFullStoryblok
    | NavItemStoryblok
    | PageStoryblok
    | PeriodicalStoryblok
    | PeriodicalsStoryblok
    | ProductStoryblok
    | ProductSerieStoryblok
    | ProfileStoryblok
    | ProfilesStoryblok
    | ProjectStoryblok
    | PublicationStoryblok
    | PublicationsStoryblok
    | SeoStoryblok
    | SlideshowStoryblok
    | SpaceStoryblok
  )[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface PeriodicalStoryblok {
  title?: string;
  year?: string;
  periodical_name?: string;
  author?: string;
  photographer?: string;
  url?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  thumbnail?: AssetStoryblok;
  _uid: string;
  component: "periodical";
  [k: string]: any;
}

export interface PeriodicalsStoryblok {
  items?: PeriodicalStoryblok[];
  _uid: string;
  component: "periodicals";
  [k: string]: any;
}

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}[];

export interface ProductStoryblok {
  text?: RichtextStoryblok;
  gallery?: MultiassetStoryblok;
  pdf?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  categories?: (StoryblokStory<CategoryStoryblok> | string)[];
  add_to_cart?: boolean;
  _uid: string;
  component: "product";
  [k: string]: any;
}

export interface ProductSerieStoryblok {
  title?: string;
  text?: RichtextStoryblok;
  images?: ImageFieldsStoryblok[];
  _uid: string;
  component: "product-serie";
  [k: string]: any;
}

export interface ProfileStoryblok {
  photo?: AssetStoryblok;
  description?: RichtextStoryblok;
  _uid: string;
  component: "profile";
  [k: string]: any;
}

export interface ProfilesStoryblok {
  title?: string;
  items?: ProfileStoryblok[];
  _uid: string;
  component: "profiles";
  [k: string]: any;
}

export interface ProjectStoryblok {
  brief?: RichtextStoryblok;
  flipbook?: string;
  portrait_image?: AssetStoryblok;
  landscape_image?: AssetStoryblok;
  photographer?: string;
  category?: StoryblokStory<CategoryStoryblok> | StoryblokStory<CategoryStoryblok> | string;
  products?: (StoryblokStory<ProductStoryblok> | string)[];
  slideshow?: MultiassetStoryblok;
  seo?: SeoStoryblok[];
  _uid: string;
  component: "project";
  [k: string]: any;
}

export interface PublicationStoryblok {
  thumbnail?: AssetStoryblok;
  title?: string;
  author?: string;
  url?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  year?: string;
  _uid: string;
  component: "publication";
  [k: string]: any;
}

export interface PublicationsStoryblok {
  book_cover?: AssetStoryblok;
  purchase_link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  items?: PublicationStoryblok[];
  _uid: string;
  component: "publications";
  [k: string]: any;
}

export interface SeoStoryblok {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: AssetStoryblok;
  _uid: string;
  component: "seo";
  [k: string]: any;
}

export interface SlideshowStoryblok {
  images?: MultiassetStoryblok;
  _uid: string;
  component: "slideshow";
  [k: string]: any;
}

export interface SpaceStoryblok {
  headline?: string;
  subtitle?: string;
  images?: ImageFieldsStoryblok[];
  _uid: string;
  component: "space";
  [k: string]: any;
}
