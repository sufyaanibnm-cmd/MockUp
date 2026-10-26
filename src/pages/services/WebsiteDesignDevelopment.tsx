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
import { websiteArtwork } from "@/data/websiteArtwork";

const SLUG = "website-design-development";

const experienceStages = ["Research", "UX", "UI", "Development", "Testing", "Launch"];

export default function WebsiteDesignDevelopment() {
  const content = getServiceContent(SLUG);

  return (
    <>
      <SEOHead
        title="Shaffedits | Website Design & Development"
        description="UX/UI design, responsive development, e-commerce builds, and performance optimization — Shaffedits builds digital experiences built to perform."
        path="/services/website-design-development"
      />

      <ServiceHero content={content} />

      {/* DIGITAL EXPERIENCE */}
      <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Digital Experience
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            From a blank page to a{" "}
            <span className="italic font-light text-white/50">working product</span>
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {experienceStages.map((stage, i) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-3"
              >
                <span
                  className="rounded-full border px-5 py-3 text-sm font-semibold"
                  style={{
                    borderColor: i === experienceStages.length - 1 ? content.accent : "rgba(255,255,255,0.15)",
                    color: i === experienceStages.length - 1 ? content.accent : "rgba(255,255,255,0.75)",
                  }}
                >
                  {stage}
                </span>
                {i < experienceStages.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-white/25" aria-hidden="true" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD — gallery of builds */}
      <section id="work" className="scroll-mt-20 overflow-x-clip border-t border-white/10 bg-black py-4 text-white" aria-labelledby="website-work-title">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-6">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.33em]" style={{ color: content.accent }}>
              Selected Work / Website Design &amp; Development
            </p>
            <h2 id="website-work-title" className="max-w-2xl font-display text-[clamp(1.75rem,4vw,2.625rem)] font-bold leading-[1.08] tracking-tight">
              Stores and sites, built to{" "}
              <span className="italic font-light text-white/50">convert</span>
            </h2>
          </div>
          <p className="mb-1 hidden shrink-0 text-[10px] uppercase tracking-[0.16em] text-white/55 md:block">
            One collection. {websiteArtwork.length} websites.
          </p>
        </div>
        <CardFanCarousel images={websiteArtwork} accent={content.accent} label="Website Design & Development artwork" />
        <div className="mx-auto mt-5 max-w-6xl px-6">
          <div className="flex justify-between gap-6 border-t border-white/10 pt-4 text-[9px] uppercase tracking-[0.17em] text-white/50">
            <span>E-commerce stores &amp; websites</span>
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
