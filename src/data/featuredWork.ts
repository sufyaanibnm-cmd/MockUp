import type { GalleryProject } from "@/components/portfolio/ProjectGallery";

export interface FeaturedProject extends GalleryProject {
  width: "wide" | "standard" | "narrow";
}

// Add real project image URLs when they are ready.
// Empty galleries show project details without substitute imagery.
export const featuredWork: FeaturedProject[] = [
  {
    id: "visioncraft",
    name: "VisionCraft",
    category: "Branding · Presentation",
    description: "Visual identities, packaging, and presentations that bring a brand's character into focus.",
    servicePath: "/services/branding-design",
    images: [],
    width: "wide",
  },
  {
    id: "campaign-pulse",
    name: "Campaign Pulse",
    category: "Creative Campaign · Social Media",
    description: "Creative campaigns and social content designed to tell a consistent story across every touchpoint.",
    servicePath: "/services/social-media-management",
    images: [],
    width: "narrow",
  },
  {
    id: "motionverse",
    name: "MotionVerse",
    category: "Video Editing · Motion Graphics",
    description: "Editing, animation, and motion design that give stories rhythm, dimension, and energy.",
    servicePath: "/services/content-creation-animation",
    images: [],
    width: "standard",
  },
  {
    id: "studio-sessions",
    name: "Studio Sessions",
    category: "Photography · Creative Shoots",
    description: "Photography and film shaped by thoughtful lighting, considered composition, and a clear creative direction.",
    servicePath: "/services/videography-photography",
    images: [],
    width: "standard",
  },
  {
    id: "shopsphere",
    name: "ShopSphere",
    category: "E-Commerce · Websites",
    description: "Digital storefronts and websites that balance an expressive visual identity with an intuitive experience.",
    servicePath: "/services/website-design-development",
    images: [],
    width: "standard",
  },
  {
    id: "pixel-perfect",
    name: "Pixel Perfect",
    category: "Website Banners · Digital Assets",
    description: "Banners and digital assets that connect the details into one cohesive visual language.",
    servicePath: "/services/website-design-development",
    images: [],
    width: "wide",
  },
  {
    id: "techvision",
    name: "TechVision",
    category: "Technical Graphics · Animation",
    description: "Technical ideas made clear through precise graphics, considered movement, and visual storytelling.",
    servicePath: "/services/content-creation-animation",
    images: [],
    width: "standard",
  },
];
