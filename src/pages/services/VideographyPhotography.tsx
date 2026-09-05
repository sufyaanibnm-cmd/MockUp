import { motion } from "motion/react";
import { Play } from "lucide-react";
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

const SLUG = "videography-photography";

const frameStages = [
  { title: "Concept", desc: "The visual story and mood get defined first." },
  { title: "Direction", desc: "Shot lists, references, and creative direction are locked." },
  { title: "Shoot", desc: "We capture cinematic footage and stills on location or in studio." },
  { title: "Edit", desc: "Grading, sound, and pacing shape the raw footage into a story." },
  { title: "Final", desc: "A polished deliverable, ready for its platform." },
];

export default function VideographyPhotography() {
  const content = getServiceContent(SLUG);
  const work = getPortfolioForService(SLUG, 4);

  return (
    <>
      <SEOHead
        title="Shaffedits | Videography & Photography"
        description="Cinematic brand films, commercial shoots, product photography, and event coverage — Shaffedits captures frames that linger."
        path="/services/videography-photography"
      />

      <ServiceHero content={content} />

      {/* SHOWREEL — cinematic, minimal UI */}
      <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="group relative flex aspect-21/9 w-full items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-white/10"
          >
            {/* Reusable cinematic showreel container — a real <video> can be
                dropped in here later without touching the surrounding layout. */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-70"
              style={{ background: `radial-gradient(60% 60% at 50% 40%, ${content.accentSoft}, transparent 75%)` }}
            />
            <button
              type="button"
              aria-label="Play showreel"
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
            >
              <Play className="h-7 w-7 translate-x-0.5 text-white" fill="currentColor" />
            </button>
            <span className="absolute bottom-6 left-6 z-10 text-xs uppercase tracking-widest text-white/40">
              Showreel — coming soon
            </span>
          </motion.div>
        </div>
      </section>

      {/* FEATURED WORK — large editorial compositions */}
      <section id="work" className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Featured Work
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            Stills and film, shown{" "}
            <span className="italic font-light text-white/50">full-bleed.</span>
          </h2>
          <ServiceGalleryGrid items={work} accent={content.accent} />
        </div>
      </section>

      {/* BEHIND THE FRAME */}
      <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Behind The Frame
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            Every shot starts with a{" "}
            <span className="italic font-light text-white/50">decision, not luck.</span>
          </h2>
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-5">
            {frameStages.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative border-t border-white/10 py-8 pr-6 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0"
              >
                <span
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold"
                  style={{ backgroundColor: content.accentSoft, color: content.accent }}
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-base font-bold">{stage.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{stage.desc}</p>
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
