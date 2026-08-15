import { MonitorSmartphone } from "lucide-react";
import { ServicePageLayout } from "./ServicePageLayout";
import { serviceAsset } from "@/lib/assets";

const SLUG = "website-design-development";

// Drop image files into public/services/website-design-development/ and
// list the filenames here — the first image renders as the large hero tile.
const images: string[] = [
  // serviceAsset(SLUG, "hero.png"),
];

export default function WebsiteDesignDevelopment() {
  return (
    <ServicePageLayout
      icon={MonitorSmartphone}
      eyebrow="Website Design & Development"
      title={
        <>
          Websites built for performance and <span className="italic font-light text-white/60">conversion</span>.
        </>
      }
      tagline="Modern websites built for performance, user experience, and conversions."
      longDesc={[
        "We design and build websites and e-commerce stores that load fast, look considered, and are structured around getting visitors to take action.",
        "From landing pages to full e-commerce builds, every site is designed responsive-first and handed off production-ready.",
      ]}
      features={[
        "Custom website design & development",
        "E-commerce store builds",
        "Landing pages & conversion-focused UX",
        "Performance & SEO fundamentals",
        "Ongoing maintenance & support",
      ]}
      images={images}
      gallerySlug={SLUG}
    />
  );
}
