import {
  Clapperboard,
  Layers,
  Sparkles,
  Package,
  BookOpen,
  Smartphone,
  Film,
  Wand2,
  Megaphone,
  CalendarDays,
  Users,
  BarChart3,
  Camera,
  Aperture,
  Video,
  Scissors,
  Compass,
  Users2,
  ShieldCheck,
  Gauge,
  Search,
  LineChart,
  PencilRuler,
  Code2,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/** One capability tile in a page's "What We Do" grid. */
export interface Capability {
  icon: LucideIcon;
  title: string;
  desc: string;
}

/** One stage in a page's numbered process strip. */
export interface ProcessStep {
  title: string;
  desc: string;
}

/** One real, already-published agency-level stat (see TrustMarquee.tsx). */
export interface ServiceStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

/** One ingredient in the "services work together" formula section. */
export interface FormulaTerm {
  label: string;
}

export interface ServiceContent {
  slug: string;
  order: number;
  /** Accent color used sparingly for this discipline (hex). */
  accent: string;
  accentSoft: string;
  eyebrow: string;
  /** Headline split into a plain part and an emphasized part. */
  headlinePlain: string;
  headlineAccent: string;
  heroSupport: string;
  heroCta: string;
  heroWatch: string;
  capabilities: Capability[];
  process: ProcessStep[];
  stats: ServiceStat[];
  formula: {
    inputs: FormulaTerm[];
    output: FormulaTerm;
  };
  closingKicker: string;
  closingPlain: string;
  closingAccent: string;
  nextSlug: string;
}

export const serviceContent: Record<string, ServiceContent> = {
  "branding-design": {
    slug: "branding-design",
    order: 1,
    accent: "#C9A227",
    accentSoft: "rgba(201,162,39,0.14)",
    eyebrow: "Branding & Design",
    headlinePlain: "Brands that become",
    headlineAccent: "impossible to ignore.",
    heroSupport:
      "Strategy, identity systems, and visual language built so every touchpoint — from a logo mark to a pitch deck — feels like the same brand.",
    heroCta: "Start a Brand Project",
    heroWatch: "View Branding Work",
    capabilities: [
      { icon: Compass, title: "Brand Strategy", desc: "Positioning, tone, and audience clarity before a single pixel is drawn." },
      { icon: Sparkles, title: "Visual Identity", desc: "Color, type, and imagery systems built to hold together at scale." },
      { icon: Layers, title: "Logo Systems", desc: "Marks designed to flex across formats, sizes, and applications." },
      { icon: Package, title: "Packaging", desc: "Structural and print-ready design that stands out on a shelf or a screen." },
      { icon: BookOpen, title: "Brand Guidelines", desc: "Clear documentation so the identity stays consistent as the team grows." },
      { icon: Smartphone, title: "Digital Branding", desc: "The identity translated cleanly into web, social, and product surfaces." },
    ],
    process: [
      { title: "Discover", desc: "We learn the business, the audience, and the ambition behind the brand." },
      { title: "Strategy", desc: "Positioning and messaging get set before any visual direction begins." },
      { title: "Identity", desc: "Logo, color, type, and imagery come together into one system." },
      { title: "Refine", desc: "We pressure-test the system across real applications and formats." },
      { title: "Deliver", desc: "A complete, documented identity your team can run with." },
    ],
    stats: [
      { icon: Users, value: "40+", label: "Brands Trusted Us" },
      { icon: Package, value: "1500+", label: "Projects Delivered" },
      { icon: Sparkles, value: "8+", label: "Years of Experience" },
    ],
    formula: {
      inputs: [{ label: "Strategy" }, { label: "Identity" }, { label: "Applications" }],
      output: { label: "A brand system" },
    },
    closingKicker: "Ready to build your identity?",
    closingPlain: "Let's build a brand that's",
    closingAccent: "impossible to ignore.",
    nextSlug: "content-creation-animation",
  },

  "content-creation-animation": {
    slug: "content-creation-animation",
    order: 2,
    accent: "#E8542E",
    accentSoft: "rgba(232,84,46,0.14)",
    eyebrow: "Content Creation & Animation",
    headlinePlain: "Ideas,",
    headlineAccent: "brought to life.",
    heroSupport:
      "From kinetic typography to full campaign edits — content engineered to stop the scroll and hold attention on brand, every time.",
    heroCta: "Start a Content Project",
    heroWatch: "Watch the Reel",
    capabilities: [
      { icon: Megaphone, title: "Social Content", desc: "Static, carousel, and short-form built for how each platform is used." },
      { icon: Wand2, title: "Motion Graphics", desc: "Kinetic type and graphic animation that carries a message with rhythm." },
      { icon: Film, title: "2D/3D Animation", desc: "Custom animation for explainers, product stories, and brand films." },
      { icon: Clapperboard, title: "Reels", desc: "Short-form video cut for retention from the very first second." },
      { icon: Video, title: "Commercial Content", desc: "Polished, campaign-ready video built around a clear creative concept." },
      { icon: Sparkles, title: "Campaign Creative", desc: "A full set of assets that all speak the same creative language." },
    ],
    process: [
      { title: "Brief", desc: "We define the message, the audience, and the platform it lives on." },
      { title: "Concept", desc: "A creative concept and storyboard set the direction before production." },
      { title: "Create", desc: "Footage, motion, and graphics come together into a first cut." },
      { title: "Refine", desc: "Pacing, sound, and detail get sharpened until it lands." },
      { title: "Deliver", desc: "Final files, formatted for every platform it needs to run on." },
    ],
    stats: [
      { icon: Video, value: "300+", label: "Brand Videos Produced" },
      { icon: Users, value: "15M+", label: "Cumulative Views Generated" },
      { icon: Sparkles, value: "10,000+", label: "Hours of Creative Work" },
    ],
    formula: {
      inputs: [{ label: "Concept" }, { label: "Motion" }, { label: "Sound" }],
      output: { label: "Content that holds attention" },
    },
    closingKicker: "Ready to create something?",
    closingPlain: "Let's bring your next idea to",
    closingAccent: "life.",
    nextSlug: "social-media-management",
  },

  "social-media-management": {
    slug: "social-media-management",
    order: 3,
    accent: "#2E8B6B",
    accentSoft: "rgba(46,139,107,0.14)",
    eyebrow: "Social Media Management",
    headlinePlain: "Content that",
    headlineAccent: "keeps moving.",
    heroSupport:
      "Strategy, content, and community management run as one continuous system — not a folder of one-off posts.",
    heroCta: "Start a Social Project",
    heroWatch: "View Social Work",
    capabilities: [
      { icon: Compass, title: "Social Strategy", desc: "Platform and audience strategy that sets the direction for content." },
      { icon: CalendarDays, title: "Content Planning", desc: "Calendars that keep publishing consistent and on-message." },
      { icon: Sparkles, title: "Content Creation", desc: "Statics, carousels, and short-form produced on a recurring cadence." },
      { icon: Clapperboard, title: "Reels & Short-form", desc: "Fast-paced, platform-native video built for reach and retention." },
      { icon: Users2, title: "Community Management", desc: "Comments, DMs, and engagement handled with the brand's voice." },
      { icon: BarChart3, title: "Analytics", desc: "Performance tracked and used to shape what we make next." },
    ],
    process: [
      { title: "Research", desc: "We study the audience, competitors, and what's already working." },
      { title: "Strategy", desc: "Content pillars and a publishing cadence get set." },
      { title: "Create", desc: "Content is produced against the calendar, on brand every time." },
      { title: "Publish", desc: "Posts go out on schedule, formatted for each platform." },
      { title: "Optimize", desc: "Performance feeds back into what gets made next." },
    ],
    stats: [
      { icon: Users, value: "40+", label: "Brands Trusted Us" },
      { icon: Users, value: "15M+", label: "Cumulative Views Generated" },
      { icon: Package, value: "1500+", label: "Projects Delivered" },
    ],
    formula: {
      inputs: [{ label: "Brand" }, { label: "Content" }, { label: "Photography" }, { label: "Social" }],
      output: { label: "Consistent presence" },
    },
    closingKicker: "Ready to grow your presence?",
    closingPlain: "Let's keep your brand",
    closingAccent: "moving.",
    nextSlug: "videography-photography",
  },

  "videography-photography": {
    slug: "videography-photography",
    order: 4,
    accent: "#3D7BC9",
    accentSoft: "rgba(61,123,201,0.14)",
    eyebrow: "Videography & Photography",
    headlinePlain: "Frames that",
    headlineAccent: "linger.",
    heroSupport:
      "Cinematic capture, visual storytelling, and polished edits that bring your brand's story to life.",
    heroCta: "Book a Shoot",
    heroWatch: "Watch Our Work",
    capabilities: [
      { icon: Clapperboard, title: "Brand Films", desc: "Cinematic brand stories that build connection." },
      { icon: Aperture, title: "Commercial Shoots", desc: "High-impact visuals for ads and campaigns." },
      { icon: Package, title: "Product Photography", desc: "Clean, detailed imagery that sells." },
      { icon: Camera, title: "Event Coverage", desc: "Professional coverage of events, launches, and more." },
      { icon: Scissors, title: "Editing & Post", desc: "Expert editing, color grading, and motion polish." },
      { icon: Wand2, title: "Art Direction", desc: "Creative direction that shapes every visual moment." },
    ],
    process: [
      { title: "Concept", desc: "We define the visual story and the mood behind it." },
      { title: "Pre-production", desc: "Locations, shot lists, and logistics are locked before the shoot." },
      { title: "Production", desc: "We capture cinematic footage and stills on the day." },
      { title: "Post", desc: "Editing, grading, and sound design bring the footage to life." },
      { title: "Delivery", desc: "Final assets, formatted for web, social, and paid media." },
    ],
    stats: [
      { icon: Users, value: "40+", label: "Brands Trusted Us" },
      { icon: Video, value: "300+", label: "Brand Videos Produced" },
      { icon: Sparkles, value: "10,000+", label: "Hours of Creative Work" },
    ],
    formula: {
      inputs: [{ label: "Direction" }, { label: "Capture" }, { label: "Edit" }],
      output: { label: "A story worth watching" },
    },
    closingKicker: "Ready to tell your story?",
    closingPlain: "Let's make something worth",
    closingAccent: "watching.",
    nextSlug: "meta-ads",
  },

  "meta-ads": {
    slug: "meta-ads",
    order: 5,
    accent: "#4C6FFF",
    accentSoft: "rgba(76,111,255,0.14)",
    eyebrow: "Meta Ads",
    headlinePlain: "Creative that",
    headlineAccent: "converts.",
    heroSupport:
      "Audience research, creative testing, and budget management built around one goal — measurable return, not just reach.",
    heroCta: "Start a Campaign",
    heroWatch: "See Our Approach",
    capabilities: [
      { icon: Compass, title: "Campaign Strategy", desc: "A media plan built around your actual growth goals." },
      { icon: Search, title: "Audience Research", desc: "Finding and defining who the campaign should speak to." },
      { icon: Sparkles, title: "Creative Testing", desc: "Multiple creative directions tested to find what performs." },
      { icon: Rocket, title: "Campaign Setup", desc: "Accounts, pixels, and structures set up to be measurable from day one." },
      { icon: TrendingUp, title: "Retargeting", desc: "Funnels that bring warm audiences back to convert." },
      { icon: Gauge, title: "Optimization", desc: "Ongoing budget and creative optimization based on real data." },
    ],
    process: [
      { title: "Research", desc: "We study the market, the audience, and the competitive landscape." },
      { title: "Strategy", desc: "A media and budget plan gets built around clear goals." },
      { title: "Creative", desc: "Ad creative is produced and prepared for testing." },
      { title: "Launch", desc: "Campaigns go live with clean tracking in place." },
      { title: "Optimize", desc: "We refine targeting, budget, and creative based on performance." },
      { title: "Scale", desc: "What works gets scaled deliberately, not blindly." },
    ],
    stats: [
      { icon: Users, value: "40+", label: "Brands Trusted Us" },
      { icon: Package, value: "1500+", label: "Projects Delivered" },
      { icon: Video, value: "300+", label: "Brand Videos Produced" },
    ],
    formula: {
      inputs: [{ label: "Branding" }, { label: "Content" }, { label: "Landing Page" }, { label: "Meta Ads" }],
      output: { label: "A performance campaign" },
    },
    closingKicker: "Ready to grow with performance?",
    closingPlain: "Let's build a campaign that",
    closingAccent: "converts.",
    nextSlug: "website-design-development",
  },

  "website-design-development": {
    slug: "website-design-development",
    order: 6,
    accent: "#8B5CF6",
    accentSoft: "rgba(139,92,246,0.14)",
    eyebrow: "Website Design & Development",
    headlinePlain: "Digital experiences",
    headlineAccent: "built to perform.",
    heroSupport:
      "Websites and stores designed responsive-first, built on clean code, and handed off production-ready.",
    heroCta: "Start a Website Project",
    heroWatch: "View Our Websites",
    capabilities: [
      { icon: PencilRuler, title: "UX/UI Design", desc: "User-centered design that's intuitive, engaging, and built to convert." },
      { icon: Code2, title: "Web Development", desc: "Clean, scalable, and secure code that powers high-performance sites." },
      { icon: Smartphone, title: "Responsive Design", desc: "Seamless experiences across every device and screen size." },
      { icon: Gauge, title: "Performance Optimization", desc: "Lightning-fast websites optimized for speed and user experience." },
      { icon: Search, title: "SEO Foundations", desc: "On-page SEO and analytics setup that supports long-term growth." },
      { icon: ShieldCheck, title: "Maintenance & Support", desc: "Ongoing care and updates to keep the website running perfectly." },
    ],
    process: [
      { title: "Discover", desc: "We learn the business, the goals, and the target audience." },
      { title: "UX", desc: "Wireframes and structure get mapped before any visual design." },
      { title: "Design", desc: "Interfaces that are beautiful, on-brand, and easy to use." },
      { title: "Develop", desc: "The site gets built with clean, scalable, production-ready code." },
      { title: "Test", desc: "We test across devices and browsers for a flawless experience." },
      { title: "Launch", desc: "A smooth go-live, with performance monitored from day one." },
    ],
    stats: [
      { icon: Users, value: "40+", label: "Brands Trusted Us" },
      { icon: Package, value: "1500+", label: "Projects Delivered" },
      { icon: LineChart, value: "7+", label: "Countries Reached" },
    ],
    formula: {
      inputs: [{ label: "Brand" }, { label: "UX" }, { label: "Website" }, { label: "SEO" }, { label: "Ads" }],
      output: { label: "Digital growth" },
    },
    closingKicker: "Ready to build your website?",
    closingPlain: "Let's build something",
    closingAccent: "extraordinary together.",
    nextSlug: "branding-design",
  },
};

export function getServiceContent(slug: string): ServiceContent {
  const content = serviceContent[slug];
  if (!content) {
    throw new Error(`No service content registered for slug "${slug}"`);
  }
  return content;
}
