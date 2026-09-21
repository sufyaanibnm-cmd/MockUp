import { motion } from "motion/react";
import type { ServiceStat } from "@/data/serviceContent";

interface StatStripProps {
  stats: ServiceStat[];
  accent: string;
}

/**
 * Agency-level stats only — the same figures already published in
 * `TrustMarquee.tsx` on the homepage. Never client-specific metrics.
 */
export function StatStrip({ stats, accent }: StatStripProps) {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-14 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-start gap-4"
          >
            <stat.icon className="mt-1 h-5 w-5 shrink-0" style={{ color: accent }} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <p className="font-display text-3xl font-black tracking-tight">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
