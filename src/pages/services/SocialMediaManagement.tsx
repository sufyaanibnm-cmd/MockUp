import { Share2 } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import { serviceAsset } from "@/lib/assets";

const SLUG = "social-media-management";

// Drop image files into public/services/social-media-management/ and
// list the filenames here — the first image renders as the large hero tile.
const images: string[] = [
  // serviceAsset(SLUG, "hero.png"),
];

export default function SocialMediaManagement() {
  return (
    <ServicePageLayout
      icon={Share2}
      eyebrow="Social Media Management"
      title={
        <>
          Content, community, and calendars that <span className="italic font-light text-white/60">compound</span>.
        </>
      }
      tagline="Content, community, and calendars that compound growth."
      longDesc={[
        "We plan, create, and manage social presence end to end — content calendars, platform strategy, community engagement, and performance tracking.",
        "Every post is designed to build on the last, turning a feed into a consistent, recognizable channel rather than one-off posts.",
      ]}
      features={[
        "Content calendars & platform strategy",
        "Community management & engagement",
        "Static, carousel, and reel content",
        "Trend-responsive & campaign-tied content",
        "Monthly performance reporting",
      ]}
      images={images}
      gallerySlug={SLUG}
    />
  );
}
