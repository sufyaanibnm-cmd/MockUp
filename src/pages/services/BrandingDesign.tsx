import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  SEOHead,
  ServiceHero,
  ProcessTimeline,
  StatStrip,
  FormulaSection,
  EcosystemGrid,
  ServiceGalleryGrid,
  ServiceClosingCTA,
} from "@/components/services";
import { getServiceContent } from "@/data/serviceContent";
import { getPortfolioForService } from "@/data/portfolio";

const SLUG = "branding-design";

const stages = [
  { title: "Strategy", desc: "Positioning, audience, and tone of voice defined." },
  { title: "Identity", desc: "Logo, color, and type come together into a mark." },
  { title: "System", desc: "The identity extends into a documented visual language." },
  { title: "Application", desc: "The system shows up consistently, everywhere it needs to." },
];

export default function BrandingDesign() {
  const content = getServiceContent(SLUG);
  const work = getPortfolioForService(SLUG, 4);

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
            <span className="italic font-light text-white/50">system that scales.</span>
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
      <section id="work" className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Selected Work
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            Identity systems, in the{" "}
            <span className="italic font-light text-white/50">wild.</span>
          </h2>
          <ServiceGalleryGrid items={work} accent={content.accent} />
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
