import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  SEOHead,
  ServiceHero,
  ProcessTimeline,
  StatStrip,
  FormulaSection,
  EcosystemGrid,
  ServiceClosingCTA,
} from "@/components/services";
import { getServiceContent } from "@/data/serviceContent";
import { CardFanCarousel } from "@/components/ui/CardFanCarousel";
import { brandingArtwork } from "@/data/brandingArtwork";

const SLUG = "branding-design";

const stages = [
  { title: "Strategy", desc: "Positioning, audience, and tone of voice defined." },
  { title: "Identity", desc: "Logo, color, and type come together into a mark." },
  { title: "System", desc: "The identity extends into a documented visual language." },
  { title: "Application", desc: "The system shows up consistently, everywhere it needs to." },
];

export default function BrandingDesign() {
  const content = getServiceContent(SLUG);

  return (
    <>
      <SEOHead
        title="Shaffedits | Branding & Design"
        description="Brand strategy, visual identity, logo systems, packaging, and guidelines — Shaffedits builds brands that become impossible to ignore."
        path="/services/branding-design"
      />

      <ServiceHero content={content} />

      {/* BRAND TRANSFORMATION */}
      <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Brand Transformation
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            From an idea to a{" "}
            <span className="italic font-light text-white/50">system that scales</span>
          </h2>

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-4">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative border-t border-white/10 py-8 pr-8 sm:border-t-0 sm:border-l sm:pl-8 sm:pt-0"
              >
                <span
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold"
                  style={{ backgroundColor: content.accentSoft, color: content.accent }}
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-lg font-bold">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{stage.desc}</p>
                {i < stages.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-white/20 sm:block"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED BRANDING WORK */}
      <section id="work" className="scroll-mt-20 overflow-x-clip border-t border-white/10 bg-black py-4 text-white" aria-labelledby="branding-work-title">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-6">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.33em]" style={{ color: content.accent }}>
              Selected Work / Branding &amp; Design
            </p>
            <h2 id="branding-work-title" className="max-w-2xl font-display text-[clamp(1.75rem,4vw,2.625rem)] font-bold leading-[1.08] tracking-tight">
              Identity systems, <span className="font-light italic text-white/50">in the wild</span>
            </h2>
          </div>
          <p className="mb-1 hidden shrink-0 text-[10px] uppercase tracking-[0.16em] text-white/55 md:block">
            One collection. {brandingArtwork.length} artworks.
          </p>
        </div>
        <CardFanCarousel images={brandingArtwork} accent={content.accent} label="Branding & Design artwork" />
        <div className="mx-auto mt-5 max-w-6xl px-6">
          <div className="flex justify-between gap-6 border-t border-white/10 pt-4 text-[9px] uppercase tracking-[0.17em] text-white/50">
            <span>Brand identities &amp; applications</span>
            <span className="hidden sm:inline">Shaffedits — Selected work</span>
          </div>
        </div>
      </section>

      <StatStrip stats={content.stats} accent={content.accent} />
      <ProcessTimeline steps={content.process} accent={content.accent} />
      <FormulaSection content={content} />
      <EcosystemGrid currentSlug={SLUG} />
      <ServiceClosingCTA content={content} />
    </>
  );
}
