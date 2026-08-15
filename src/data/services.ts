import {
  Palette,
  PenLine,
  Share2,
  Clapperboard,
  MonitorSmartphone,
  Target,
  type LucideIcon,
} from "lucide-react";

/**
 * Lightweight, shared metadata for each service — used to drive the
 * homepage teaser grid (`Services.tsx`), the `/services` overview page,
 * and route definitions in `App.tsx`.
 *
 * The full page content (long description, features, images) for each
 * service lives in its own dedicated page component under
 * `src/pages/services/`, not here — that keeps each page free to grow
 * independently instead of being boxed into one generic template.
 */
export interface ServiceMeta {
  slug: string;
  /** Full route, e.g. "/services/branding-design" */
  path: string;
  icon: LucideIcon;
  title: string;
  /** Same short one-liner used on the homepage teaser cards. */
  desc: string;
  /** CTA label used on the homepage teaser card. */
  cta: string;
}

export const services: ServiceMeta[] = [
  {
    slug: "branding-design",
    path: "/services/branding-design",
    icon: Palette,
    title: "Branding & Design",
    desc: "Identities and systems that make brands unmistakable.",
    cta: "View Portfolio",
  },
  {
    slug: "content-creation-animation",
    path: "/services/content-creation-animation",
    icon: PenLine,
    title: "Content Creation & Animation",
    desc: "We produce compelling content, cinematic visuals, and dynamic animations that bring your ideas to life.",
    cta: "Discover More",
  },
  {
    slug: "social-media-management",
    path: "/services/social-media-management",
    icon: Share2,
    title: "Social Media Management",
    desc: "Content, community, and calendars that compound growth.",
    cta: "Watch Projects",
  },
  {
    slug: "videography-photography",
    path: "/services/videography-photography",
    icon: Clapperboard,
    title: "Videography & Photography",
    desc: "Cinematic capture and edits with commercial polish.",
    cta: "View Websites",
  },
  {
    slug: "meta-ads",
    path: "/services/meta-ads",
    icon: Target,
    title: "Meta Ads",
    desc: "Performance campaigns that turn creative into ROI.",
    cta: "Explore Campaigns",
  },
  {
    slug: "website-design-development",
    path: "/services/website-design-development",
    icon: MonitorSmartphone,
    title: "Website Design & Development",
    desc: "Modern websites built for performance, user experience, and conversions.",
    cta: "View Websites",
  },
];

export function getServiceBySlug(slug: string | undefined): ServiceMeta | undefined {
  return services.find((s) => s.slug === slug);
}
