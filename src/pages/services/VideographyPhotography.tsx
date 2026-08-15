import { Clapperboard } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import { serviceAsset } from "@/lib/assets";

const SLUG = "videography-photography";

// Drop image files into public/services/videography-photography/ and
// list the filenames here — the first image renders as the large hero tile.
const images: string[] = [
  // serviceAsset(SLUG, "hero.png"),
];

export default function VideographyPhotography() {
  return (
    <ServicePageLayout
      icon={Clapperboard}
      eyebrow="Videography & Photography"
      title={
        <>
          Cinematic capture with commercial <span className="italic font-light text-white/60">polish</span>.
        </>
      }
      tagline="Cinematic capture and edits with commercial polish."
      longDesc={[
        "We plan and shoot video and photography built for commercial use — product, lifestyle, campaign, and brand storytelling — then edit it to a cinematic standard.",
        "From pre-production planning to the final color grade, we handle every stage so the footage is ready to publish across web, social, and paid media.",
      ]}
      features={[
        "Product & lifestyle photography",
        "Brand & campaign videography",
        "Studio & on-location shoots",
        "Editing, color grading & sound design",
        "Deliverables cut for web, social, and ads",
      ]}
      images={images}
      gallerySlug={SLUG}
    />
  );
}
