import { PenLine } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import { serviceAsset } from "@/lib/assets";

const SLUG = "content-creation-animation";

// Drop image files into public/services/content-creation-animation/ and
// list the filenames here — the first image renders as the large hero tile.
const images: string[] = [
  // serviceAsset(SLUG, "hero.png"),
];

export default function ContentCreationAnimation() {
  return (
    <ServicePageLayout
      icon={PenLine}
      eyebrow="Content Creation & Animation"
      title={
        <>
          Content that brings ideas to <span className="italic font-light text-white/60">life</span>.
        </>
      }
      tagline="We produce compelling content, cinematic visuals, and dynamic animations that bring your ideas to life."
      longDesc={[
        "From short-form video to motion graphics, we produce content built to stop the scroll and hold attention — on brand, on message, every time.",
        "We handle the full pipeline: concept, scripting, production, and animation, so what ships is polished and ready to publish.",
      ]}
      features={[
        "Short-form & long-form video content",
        "Motion graphics & 2D/3D animation",
        "Concept development & scripting",
        "Explainer & product videos",
        "Content series built for consistent output",
      ]}
      images={images}
      gallerySlug={SLUG}
    />
  );
}
