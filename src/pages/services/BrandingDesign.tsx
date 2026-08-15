import { Palette } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import { serviceAsset } from "@/lib/assets";

const SLUG = "branding-design";

// Drop image files into public/services/branding-design/ and list the
// filenames here — the first image renders as the large hero tile.
// Example: images.push(serviceAsset(SLUG, "hero.png"))
const images: string[] = [
  // serviceAsset(SLUG, "hero.png"),
];

export default function BrandingDesign() {
  return (
    <ServicePageLayout
      icon={Palette}
      eyebrow="Branding & Design"
      title={
        <>
          Identities that make brands <span className="italic font-light text-white/60">unmistakable</span>.
        </>
      }
      tagline="Identities and systems that make brands unmistakable."
      longDesc={[
        "We build brand identities from the ground up — logo systems, color and typography, packaging, and the guidelines that keep it all consistent as you grow.",
        "Every identity starts with strategy: who you're for, what you stand for, and how that should look and feel across every touchpoint your audience sees.",
      ]}
      features={[
        "Logo design & visual identity systems",
        "Brand guidelines & style documentation",
        "Packaging & print collateral",
        "Presentation decks & pitch materials",
        "Brand refreshes for existing businesses",
      ]}
      images={images}
      gallerySlug={SLUG}
    />
  );
}
