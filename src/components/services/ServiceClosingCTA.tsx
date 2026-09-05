import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import type { ServiceContent } from "@/data/serviceContent";

interface ServiceClosingCTAProps {
  content: ServiceContent;
}

export function ServiceClosingCTA({ content }: ServiceClosingCTAProps) {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-6xl flex-col justify-between gap-10 md:flex-row md:items-end"
      >
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: content.accent }}>
            {content.closingKicker}
          </p>
          <h2 className="max-w-2xl font-display text-[clamp(1.75rem,5vw,3.5rem)] font-black uppercase leading-[0.98] tracking-tight">
            {content.closingPlain}{" "}
            <span style={{ color: content.accent }}>{content.closingAccent}</span>
          </h2>
        </div>
        <GlowButton as="a" href="/#contact" tone="onDark" className="shrink-0">
          Start a Project
          <ArrowRight className="h-4 w-4" />
        </GlowButton>
      </motion.div>
    </section>
  );
}
