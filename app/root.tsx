import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  json,
} from '@remix-run/react';
import type {
  ActionFunctionArgs,
  LinksFunction,
  MetaFunction,
} from '@remix-run/node';
import { storyblokInit, apiPlugin, getStoryblokApi } from '@storyblok/react';
import styles from './styles/global.css?url';
import { GlobalLayout } from './components/layout';
import {
  NavItem,
  Content,
  Page,
  Profile,
  Profiles,
  Awards,
  Award,
  ArchitectEyes,
  ArchitectEye,
  Publications,
  Publication,
  AllProjects,
  Project,
  HomeSlideShow,
  Category,
  Product,
  AllProducts,
  ImageFields,
  ProductSerie,
  ImageFull,
  Career,
  CareersList,
  AllDesigners,
  Designer,
  LinkSlideShow,
  Slide,
} from './components/bloks';
import { isPreview } from './lib';
import Cart from '~/components/Cart';

const isServer = typeof window === 'undefined';

const accessToken = isServer
  ? process.env.STORYBLOK_PREVIEW_TOKEN
  : //@ts-ignore
    window.env.STORYBLOK_PREVIEW_TOKEN;

const components = {
  'nav-item': NavItem,
  content: Content,
  page: Page,
  profile: Profile,
  profiles: Profiles,
  awards: Awards,
  award: Award,
  'architect-eyes': ArchitectEyes,
  'architect-eye': ArchitectEye,
  publications: Publications,
  publication: Publication,
  'all-projects': AllProjects,
  project: Project,
  slideshow: HomeSlideShow,
  category: Category,
  product: Product,
  'all-products': AllProducts,
  'image-fields': ImageFields,
  'product-serie': ProductSerie,
  'image-full': ImageFull,
  career: Career,
  'careers-list': CareersList,
  'all-designers': AllDesigners,
  designer: Designer,
  'link-slideshow': LinkSlideShow,
  slide: Slide,
};

storyblokInit({
  accessToken,
  use: [apiPlugin],
  components,
  bridge: isPreview(),
});

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    href: '/assets/fonts/NeueHaasUnica-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/assets/fonts/NeueHaasUnica-Regular.woff',
    as: 'font',
    type: 'font/woff',
    crossOrigin: 'anonymous',
  },
  { rel: 'stylesheet', href: styles },
];

export const meta: MetaFunction = () => {
  return [
    {
      title:
        'Galerie56 - Art Gallery in New York | Platform for Art, Architecture, and Design',
    },
    {
      name: 'description',
      content:
        'Galerie56 is a platform celebrating the intersection of art, architecture, and design in New York. Located at 56 Leonard Street, we offer a unique space for cultural dialogue and artistic expression.',
    },
    { name: 'robots', content: 'index,follow' },
    { charset: 'utf-8' },
    { viewport: 'width=device-width,initial-scale=1' },
    // Favicon
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    // Open Graph tags for social sharing
    {
      property: 'og:title',
      content:
        'Galerie56 - Art Gallery in New York | Platform for Art, Architecture, and Design',
    },
    {
      property: 'og:description',
      content:
        'Galerie56 is a platform celebrating the intersection of art, architecture, and design in New York. Located at 56 Leonard Street, we offer a unique space for cultural dialogue and artistic expression.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://galerie56.com' },
  ];
};

export const loader = async () => {
  const sbApi = getStoryblokApi();
  const { data: config } = await sbApi.get(`cdn/stories/config`, {
    version: 'draft',
    resolve_links: 'url',
  });

  const {
    logo,
    header_nav,
    address,
    address_2,
    address_3,
    footer_text,
    phone,
    mail,
    facebook,
    instagram,
    linkedin,
    pinterest,
    posts_per_page,
  } = config?.story?.content || {};
  return json({
    env: {
      STORYBLOK_PREVIEW_TOKEN: process.env.STORYBLOK_PREVIEW_TOKEN,
      STORYBLOK_IS_PREVIEW: process.env.STORYBLOK_IS_PREVIEW,
    },
    logo,
    headerNav: header_nav,
    address,
    address_2,
    address_3,
    footerText: footer_text,
    phone,
    mail,
    facebook,
    instagram,
    linkedin,
    pinterest,
    perPage: posts_per_page,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email');

  if (typeof email !== 'string' || !email) {
    return json(
      { error: 'Please enter a valid email address' },
      { status: 400 }
    );
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const API_SERVER = process.env.MAILCHIMP_SERVER;
  const AUDIENCE_ID = process.env.MAILCHIMP_LIST_ID;

  const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: 'pending',
    tags: ['newsletter_signup'],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `api_key ${API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.ok) {
      return json(
        {
          message:
            'Success! Please check your email to confirm your subscription.',
        },
        { status: 201 }
      );
    } else if (responseData.title === 'Member Exists') {
      return json(
        { error: 'Uh oh, it looks like this email is already subscribed' },
        { status: 400 }
      );
    } else if (responseData.title === 'Invalid Resource') {
      return json(
        {
          error:
            'There was an issue with your subscription. Please try again or contact support.',
        },
        { status: 400 }
      );
    } else {
      // Log the full error for debugging
      console.error('Mailchimp API error:', responseData);
      throw new Error(responseData.detail || 'An unknown error occurred');
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return json(
      {
        error:
          'Oops! There was an error subscribing you to the newsletter. Please try again later.',
      },
      { status: 500 }
    );
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  if (!data) {
    // Handle the case where data is not available, e.g., render an error message or a loading spinner
    return <div>Loading or error...</div>;
  }
  const storeId = '107254008';
  const { env } = data;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.ec = window.ec || {};
            window.ec.config = window.ec.config || {};
            window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};
            window.ec.config.storefrontUrls.cleanUrls = true;
            window.ec.config.enable_canonical_urls = true;
          `,
          }}
        />
        <script src={`https://app.ecwid.com/script.js?${storeId}`} async />
        <Cart storeId={storeId} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <GlobalLayout>
      <Outlet />
    </GlobalLayout>
  );
}
