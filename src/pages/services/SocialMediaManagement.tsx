import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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

const SLUG = "social-media-management";

const systemStages = ["Strategy", "Content", "Publishing", "Community", "Analytics"];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const calendarPattern = ["Static", "Reel", "", "Carousel", "Static", "Reel", ""];

export default function SocialMediaManagement() {
  const content = getServiceContent(SLUG);
  const work = getPortfolioForService(SLUG, 4);

  return (
    <>
      <SEOHead
        title="Shaffedits | Social Media Management"
        description="Social strategy, content planning, community management, and analytics — Shaffedits builds social presence that compounds over time."
        path="/services/social-media-management"
      />

      <ServiceHero content={content} />

      {/* SOCIAL SYSTEM */}
      <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Social System
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            A loop, not a{" "}
            <span className="italic font-light text-white/50">one-off post.</span>
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {systemStages.map((stage, i) => (
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
                    borderColor: i === 0 ? content.accent : "rgba(255,255,255,0.15)",
                    color: i === 0 ? content.accent : "rgba(255,255,255,0.75)",
                  }}
                >
                  {stage}
                </span>
                {i < systemStages.length - 1 ? (
                  <ArrowRight className="h-4 w-4 text-white/25" aria-hidden="true" />
                ) : (
                  <ArrowRight className="h-4 w-4 rotate-[135deg] text-white/15" aria-hidden="true" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL CAMPAIGNS */}
      <section id="work" className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Social Campaigns
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            Feeds we've built and{" "}
            <span className="italic font-light text-white/50">kept running.</span>
          </h2>
          <ServiceGalleryGrid items={work} accent={content.accent} />
        </div>
      </section>

      {/* CONTENT CALENDAR */}
      <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            Content Calendar
          </p>
          <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            Publishing that runs on a{" "}
            <span className="italic font-light text-white/50">rhythm.</span>
          </h2>
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {weekDays.map((day, i) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-white/10 p-2 text-center"
                style={
                  calendarPattern[i]
                    ? { backgroundColor: content.accentSoft, borderColor: content.accent }
                    : undefined
                }
              >
                <span className="text-[10px] uppercase tracking-widest text-white/40">{day}</span>
                {calendarPattern[i] && (
                  <span className="text-[10px] font-semibold sm:text-xs" style={{ color: content.accent }}>
                    {calendarPattern[i]}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          <p className="mt-6 max-w-lg text-sm text-white/45">
            A representative weekly cadence — the real calendar is built around each
            brand's platforms, audience, and goals.
          </p>
        </div>
      </section>

      {/* RESULTS — qualitative only, no invented client metrics */}
      <section className="border-t border-white/10 bg-white px-6 py-24 text-black md:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-black/40">Results</p>
          <h2 className="mb-10 max-w-2xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
            What consistent social{" "}
            <span className="italic font-light text-black/40">management delivers.</span>
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {[
              "A recognizable, on-brand feed instead of one-off posts.",
              "A publishing rhythm that keeps the brand consistently visible.",
              "Community handled with the same voice as the brand itself.",
              "Content decisions guided by what the data actually shows.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-black/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: content.accent }} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessTimeline steps={content.process} accent={content.accent} />
      <FormulaSection content={content} />
      <EcosystemGrid currentSlug={SLUG} />
      <ServiceClosingCTA content={content} />
    </>
  );
}
