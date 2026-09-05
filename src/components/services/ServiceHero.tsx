import { type ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import type { Capability, ServiceContent } from "@/data/serviceContent";
import { services } from "@/data/services";

interface ServiceHeroProps {
  content: ServiceContent;
  /** Optional visual to render below the hero copy (e.g. a device mockup). */
  visual?: ReactNode;
}

export function ServiceHero({ content, visual }: ServiceHeroProps) {
  const totalServices = services.length;

  return (
    <section className="relative overflow-hidden bg-black px-6 pb-16 pt-40 text-white md:pb-24 md:pt-48">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(60% 50% at 15% 0%, ${content.accentSoft}, transparent 70%)`,
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center justify-between"
        >
          <Link
            to="/services"
            className="inline-block text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-white"
          >
            ← All Services
          </Link>
          <p
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em]"
            style={{ color: content.accent }}
          >
            {String(content.order).padStart(2, "0")} / {String(totalServices).padStart(2, "0")}
            <span className="text-white/30">— {content.eyebrow}</span>
          </p>
        </motion.div>

        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-7"
          >
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,5.25rem)] font-black leading-[0.98] tracking-tight">
              {content.headlinePlain}
              <br />
              <span style={{ color: content.accent }}>{content.headlineAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
              {content.heroSupport}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <GlowButton as="a" href="/#contact" tone="onDark">
                {content.heroCta}
              </GlowButton>
              <a
                href="#work"
                className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-white"
              >
                {content.heroWatch}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-5"
          >
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]"
              style={{ color: content.accent }}
            >
              What We Do
            </p>
            <CapabilityGrid capabilities={content.capabilities} accent={content.accent} />
          </motion.div>
        </div>

        {visual && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16"
          >
            {visual}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function CapabilityGrid({ capabilities, accent }: { capabilities: Capability[]; accent: string }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-6 border-t border-white/10 pt-6 sm:grid-cols-2">
      {capabilities.map((cap, i) => (
        <li key={cap.title} className="group">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[10px] font-semibold tabular-nums" style={{ color: accent }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <cap.icon className="h-4 w-4 text-white/50" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <h3 className="text-sm font-semibold text-white">{cap.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-white/45">{cap.desc}</p>
        </li>
      ))}
    </ul>
  );
}
