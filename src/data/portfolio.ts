/**
 * Central, presentation-agnostic project/case-study data used across the
 * service pages' gallery + case-study sections.
 *
 * Image paths point at the same `public/portfolio/<folder>/...` assets
 * already used by the homepage `Portfolio.tsx` gallery — nothing here is
 * fabricated: client names match the real clients already referenced
 * elsewhere in the project (see `Testimonials.tsx`), and no performance
 * numbers, dates, or results are invented. Where a project has no
 * quantifiable public result yet, `resultNote` is left undefined and the
 * UI falls back to a qualitative description instead of a stat.
 */

const BASE = import.meta.env.BASE_URL;
const asset = (folder: string, file: string): string => `${BASE}portfolio/${folder}/${file}`;

export interface PortfolioItem {
  slug: string;
  title: string;
  client?: string;
  category: string;
  description: string;
  /** Which service-page slugs this project is relevant to. */
  services: string[];
  images: string[];
  /** Optional qualitative note — never a fabricated metric. */
  resultNote?: string;
  featured?: boolean;
}

export const portfolio: PortfolioItem[] = [
  {
    slug: "cloud-apparels-brand-system",
    title: "Cloud Apparels — Brand & Campaign System",
    client: "Cloud Apparels",
    category: "Branding + Social Campaign",
    description:
      "A full identity refresh paired with an ongoing content and paid-social engine, built to keep the brand consistent across every touchpoint.",
    services: ["branding-design", "content-creation-animation", "social-media-management", "meta-ads"],
    images: [
      asset("Creative Campaign + Social Media", "Copy of Cloudapparels_Carousel01_042026_slide01.png"),
      asset("Creative Campaign + Social Media", "Copy of Cloudapparels_Static01_012026.png"),
      asset("Creative Campaign + Social Media", "Copy of Cloudapparels_Static02_112025.png"),
    ],
    featured: true,
  },
  {
    slug: "lspace-digital-ecosystem",
    title: "Lspace — Digital Ecosystem",
    client: "Lspace",
    category: "Website + Social + Content",
    description:
      "Website, storefront, and a recurring library of carousels and statics designed to work as one connected system rather than one-off assets.",
    services: ["website-design-development", "social-media-management", "content-creation-animation", "videography-photography"],
    images: [
      asset("E-Commerce Store + Website", "Lspace Website.png"),
      asset("Creative Campaign + Social Media", "Lspace_Carousel01_062026_Slide1.png"),
      asset("Creative Campaign + Social Media", "Lspace_Static01_012026.png"),
    ],
    featured: true,
  },
  {
    slug: "purple-curve-content-engine",
    title: "Purple Curve — Content Engine",
    client: "Purple Curve",
    category: "Social Media + Meta Ads",
    description:
      "A high-frequency content and paid-media pipeline covering carousels, reels, and statics, run as a continuous system rather than isolated campaigns.",
    services: ["social-media-management", "meta-ads", "content-creation-animation"],
    images: [
      asset("Creative Campaign + Social Media", "Purplecurve_Carousel01_042026_Slide01.png"),
      asset("Creative Campaign + Social Media", "Purplecurve_Static01_022026.png"),
      asset("Creative Campaign + Social Media", "Purplecurve_Carousel_01_052026_Slide1.png"),
    ],
    featured: true,
  },
  {
    slug: "brand-identity-presentations",
    title: "Identity & Presentation Systems",
    category: "Branding & Design",
    description:
      "Logo systems, packaging mockups, and presentation decks built as reusable brand systems rather than single-use deliverables.",
    services: ["branding-design"],
    images: [
      asset("Branding + Presentation", "b1.png"),
      asset("Branding + Presentation", "b4.png"),
      asset("Branding + Presentation", "Copy of mockup 3.png"),
    ],
  },
  {
    slug: "cloud-cricketeria-storefronts",
    title: "Storefront & Website Builds",
    category: "Website Design & Development",
    description:
      "Responsive, conversion-focused storefronts and business websites designed and built end to end.",
    services: ["website-design-development"],
    images: [
      asset("E-Commerce Store + Website", "Cloud Website.png"),
      asset("E-Commerce Store + Website", "Cricketeria Website.png"),
    ],
  },
  {
    slug: "banner-asset-library",
    title: "Web Banner & Digital Asset Library",
    category: "Website Design & Development",
    description:
      "Home-screen and dedicated-page banners designed across mobile breakpoints for an e-commerce sports brand.",
    services: ["website-design-development", "meta-ads"],
    images: [
      asset("Website Banners + Assets", "Main_hero_mobile_banner_slide1.png"),
      asset("Website Banners + Assets", "Bats_mobile_Home_Screen_banner.png"),
      asset("Website Banners + Assets", "Fielding_wicketkeeping_home_screen_banner.png"),
    ],
  },
];

export function getPortfolioForService(slug: string, limit?: number): PortfolioItem[] {
  const items = portfolio.filter((p) => p.services.includes(slug));
  return typeof limit === "number" ? items.slice(0, limit) : items;
}
