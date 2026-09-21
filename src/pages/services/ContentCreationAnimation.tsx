import { motion } from "motion/react";
import { Play, ArrowRight } from "lucide-react";
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

const SLUG = "content-creation-animation";

const motionStages = ["Concept", "Storyboard", "Production", "Animation", "Final"];

export default function ContentCreationAnimation() {
  const content = getServiceContent(SLUG);
  const work = getPortfolioForService(SLUG, 4);

  return (
    <>
      <SEOHead
        title="Shaffedits | Content Creation & Animation"
        description="Social content, motion graphics, 2D/3D animation, and campaign creative — Shaffedits turns ideas into content that holds attention."
        path="/services/content-creation-animation"
      />

      <ServiceHero content={content} />

      {/* SHOWREEL */}
      <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Showreel
          </p>
          <h2 className="mb-10 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            A reel says more than a{" "}
            <span className="italic font-light text-white/50">page of copy.</span>
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl ring-1 ring-white/10"
            style={{ background: `linear-gradient(135deg, ${content.accentSoft}, rgba(255,255,255,0.02))` }}
          >
            {/* Reusable showreel container — drop a real <video> element in
                here later without touching layout or surrounding markup. */}
            <button
              type="button"
              aria-label="Play showreel"
              className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
            >
              <Play className="h-7 w-7 translate-x-0.5 text-white" fill="currentColor" />
            </button>
            <span className="absolute bottom-6 left-6 text-xs uppercase tracking-widest text-white/40">
              Showreel — coming soon
            </span>
          </motion.div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Selected Work
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            A cinematic look at recent{" "}
            <span className="italic font-light text-white/50">campaigns.</span>
          </h2>
          <ServiceGalleryGrid items={work} accent={content.accent} />
        </div>
      </section>

      {/* MOTION SYSTEM */}
      <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Motion System
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            How an idea becomes{" "}
            <span className="italic font-light text-white/50">a finished edit.</span>
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {motionStages.map((stage, i) => (
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span
                  className="rounded-full border px-5 py-3 text-sm font-semibold"
                  style={{
                    borderColor: i === motionStages.length - 1 ? content.accent : "rgba(255,255,255,0.15)",
                    color: i === motionStages.length - 1 ? content.accent : "rgba(255,255,255,0.75)",
                  }}
                >
                  {stage}
                </span>
                {i < motionStages.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-white/25" aria-hidden="true" />
                )}
              </motion.div>
            ))}
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
