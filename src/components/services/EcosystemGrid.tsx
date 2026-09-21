import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { serviceContent } from "@/data/serviceContent";

interface EcosystemGridProps {
  currentSlug: string;
}

/**
 * "Six disciplines. One creative engine." — appears on every service
 * page (see brief section 9). The current page is visually highlighted
 * and every other discipline links out, making the six pages feel like
 * one connected ecosystem rather than six isolated pages.
 */
export function EcosystemGrid({ currentSlug }: EcosystemGridProps) {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-24 text-white md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/40">
          The Shaffedits System
        </p>
        <h2 className="mb-14 max-w-3xl font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight">
          Six disciplines.<br />
          <span className="italic font-light text-white/50">One creative engine.</span>
        </h2>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {services.map((service, i) => {
            const content = serviceContent[service.slug];
            const isCurrent = service.slug === currentSlug;
            return (
              <motion.li
                key={service.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {isCurrent ? (
                  <div
                    className="flex items-center justify-between gap-6 py-6"
                    aria-current="page"
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className="font-display text-sm font-bold tabular-nums"
                        style={{ color: content.accent }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl font-black tracking-tight sm:text-2xl">
                        {service.title}
                      </span>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{ backgroundColor: content.accentSoft, color: content.accent }}
                    >
                      You are here
                    </span>
                  </div>
                ) : (
                  <Link
                    to={service.path}
                    className="group flex items-center justify-between gap-6 py-6 transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-display text-sm font-bold tabular-nums text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl font-medium tracking-tight text-white/70 transition-colors group-hover:text-white sm:text-2xl">
                        {service.title}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
