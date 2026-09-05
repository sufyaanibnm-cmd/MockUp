import { motion } from "motion/react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { SEOHead } from "@/components/services";
import { services } from "@/data/services";

export default function ServicesIndex() {
  return (
    <section className="bg-black px-6 pb-28 pt-40 text-white md:pb-40 md:pt-48">
      <SEOHead
        title="Shaffedits | Services"
        description="Six creative disciplines, one engine — branding, content, social, video, Meta ads, and web, all built to work together."
        path="/services"
      />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-white/50">
            What We Do
          </p>
          <h1 className="max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-tight">
            Six disciplines.<br /> One creative <span className="italic font-light text-white/60">engine</span>.
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 [&:hover>*:not(:hover)]:scale-[0.98] [&:hover>*:not(:hover)]:opacity-50 [&:hover>*:not(:hover)]:blur-[2px]">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <SpotlightCard tone="dark" className="h-full">
                <div className="flex h-full flex-col justify-between gap-10">
                  <s.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                  <div>
                    <span className="mb-6 block font-mono text-xs text-white/40">
                      0{i + 1} / 06
                    </span>
                    <h2 className="font-display text-3xl font-bold md:text-4xl">
                      {s.title}
                    </h2>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
                      {s.desc}
                    </p>
                  </div>
                  <ArrowButton as="a" href={s.path} tone="onDark" label={s.cta} />
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
