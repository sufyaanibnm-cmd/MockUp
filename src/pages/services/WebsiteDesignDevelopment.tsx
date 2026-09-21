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
  MediaTile,
} from "@/components/services";
import { getServiceContent } from "@/data/serviceContent";
import { getPortfolioForService } from "@/data/portfolio";

const SLUG = "website-design-development";

const experienceStages = ["Research", "UX", "UI", "Development", "Testing", "Launch"];

export default function WebsiteDesignDevelopment() {
  const content = getServiceContent(SLUG);
  const work = getPortfolioForService(SLUG, 4);
  const showcase = work[0];

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
            <span className="italic font-light text-white/50">working product.</span>
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

      {/* FEATURED WEBSITES — desktop / tablet / mobile presentation */}
      {showcase && (
        <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
              Featured Website
            </p>
            <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
              One build, every{" "}
              <span className="italic font-light text-white/50">screen size.</span>
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-end justify-center gap-6 sm:flex-row"
            >
              <div className="w-full max-w-xl overflow-hidden rounded-t-xl border border-white/10 bg-neutral-950 shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
                <MediaTile
                  src={showcase.images[0]}
                  alt={`${showcase.title} — desktop view`}
                  eager
                  className="aspect-16/10 w-full object-cover object-top"
                />
              </div>
              <div className="w-40 shrink-0 overflow-hidden rounded-2xl border-4 border-neutral-800 bg-neutral-950 shadow-2xl sm:w-32">
                <MediaTile
                  src={showcase.images[1] ?? showcase.images[0]}
                  alt={`${showcase.title} — mobile view`}
                  className="aspect-9/19 w-full object-cover object-top"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* WHAT WE BUILD — gallery of builds */}
      <section id="work" className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Selected Websites
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            Stores and sites, built to{" "}
            <span className="italic font-light text-white/50">convert.</span>
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
