import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
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

const SLUG = "meta-ads";

const engineStages = ["Creative", "Audience", "Campaign", "Targeting", "Conversion", "Optimization"];

export default function MetaAds() {
  const content = getServiceContent(SLUG);
  const work = getPortfolioForService(SLUG, 4);

  return (
    <>
      <SEOHead
        title="Shaffedits | Meta Ads & Performance Marketing"
        description="Campaign strategy, audience research, creative testing, and optimization — Shaffedits builds Meta ad creative that converts."
        path="/services/meta-ads"
      />

      <ServiceHero content={content} />

      {/* PERFORMANCE ENGINE */}
      <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Performance Engine
          </p>
          <h2 className="mb-14 text-center font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            One system, from creative to{" "}
            <span className="italic font-light text-white/50">conversion.</span>
          </h2>
          <div className="mx-auto flex max-w-xs flex-col items-center gap-2">
            {engineStages.map((stage, i) => (
              <motion.div key={stage} className="flex w-full flex-col items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex w-full items-center justify-between rounded-lg border px-5 py-3"
                  style={{
                    borderColor: i === engineStages.length - 1 ? content.accent : "rgba(255,255,255,0.12)",
                    backgroundColor: i === engineStages.length - 1 ? content.accentSoft : "transparent",
                  }}
                >
                  <span className="text-sm font-semibold">{stage}</span>
                  <span className="text-xs tabular-nums text-white/30">{String(i + 1).padStart(2, "0")}</span>
                </motion.div>
                {i < engineStages.length - 1 && (
                  <ChevronDown className="h-4 w-4 text-white/20 service-pulse-dot" aria-hidden="true" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATIVE -> PERFORMANCE */}
      <FormulaSection content={content} />

      {/* CAMPAIGN CASE STUDIES */}
      <section id="work" className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Campaign Case Studies
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            Creative built to be{" "}
            <span className="italic font-light text-white/50">tested and scaled.</span>
          </h2>
          <ServiceGalleryGrid items={work} accent={content.accent} />
          <p className="mt-6 max-w-lg text-sm text-white/45">
            Campaign performance figures are shared directly with clients and shown
            here only where a project has public, verifiable results.
          </p>
        </div>
      </section>

      <StatStrip stats={content.stats} accent={content.accent} />
      <ProcessTimeline steps={content.process} accent={content.accent} />
      <EcosystemGrid currentSlug={SLUG} />
      <ServiceClosingCTA content={content} />
    </>
  );
}
