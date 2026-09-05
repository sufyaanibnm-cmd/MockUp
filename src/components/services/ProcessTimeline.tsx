import { motion } from "motion/react";
import type { ProcessStep } from "@/data/serviceContent";

interface ProcessTimelineProps {
  steps: ProcessStep[];
  accent: string;
}

export function ProcessTimeline({ steps, accent }: ProcessTimelineProps) {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-12 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: accent }}>
          Our Process
        </p>
        <ol
          className="grid gap-10 sm:grid-cols-2"
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))` }}
        >
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative border-t border-white/10 pt-6"
            >
              <span
                aria-hidden
                className="absolute -top-px left-0 h-px w-10"
                style={{ backgroundColor: accent }}
              />
              <span className="text-xs font-semibold tabular-nums text-white/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-wide">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
