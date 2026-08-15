import { Target } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import { serviceAsset } from "@/lib/assets";

const SLUG = "meta-ads";

// Drop image files into public/services/meta-ads/ and list the filenames
// here — the first image renders as the large hero tile.
const images: string[] = [
  // serviceAsset(SLUG, "hero.png"),
];

export default function MetaAds() {
  return (
    <ServicePageLayout
      icon={Target}
      eyebrow="Meta Ads"
      title={
        <>
          Performance campaigns that turn creative into <span className="italic font-light text-white/60">ROI</span>.
        </>
      }
      tagline="Performance campaigns that turn creative into ROI."
      longDesc={[
        "We run Meta ad campaigns end to end — audience research, targeting, creative testing, and budget management — built around measurable return.",
        "Creative and media strategy are handled together, so ad content isn't just eye-catching, it's built to convert for the specific audience it's targeting.",
      ]}
      features={[
        "Campaign strategy & audience targeting",
        "Ad creative production & A/B testing",
        "Budget management & bid optimization",
        "Retargeting & funnel strategy",
        "Transparent performance reporting",
      ]}
      images={images}
      gallerySlug={SLUG}
    />
  );
}
