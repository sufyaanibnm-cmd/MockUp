import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Check, type LucideIcon } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { ServiceGallery } from "./ServiceGallery";

interface ServicePageLayoutProps {
  icon: LucideIcon;
  eyebrow: string;
  title: ReactNode;
  tagline: string;
  longDesc: string[];
  features: string[];
  images: string[];
  gallerySlug: string;
}

/**
 * Shared layout used by every /services/:slug page. Reuses the same
 * section rhythm, typography scale, and components already established
 * across the site (Hero/About/Services heading treatment, GlowButton,
 * the Portfolio gallery-placeholder pattern) so each service page looks
 * like part of the same site rather than a new design.
 */
export function ServicePageLayout({
  icon: Icon,
  eyebrow,
  title,
  tagline,
  longDesc,
  features,
  images,
  gallerySlug,
}: ServicePageLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-black px-6 pb-16 pt-40 text-white md:pb-24 md:pt-48">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/services"
              className="mb-8 inline-block text-xs font-medium uppercase tracking-[0.3em] text-white/40 transition-colors hover:text-white"
            >
              ← All Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.4em] text-white/50">
              <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              {eyebrow}
            </p>
            <h1 className="max-w-4xl font-display text-[clamp(2.25rem,6vw,5rem)] font-black leading-[0.98] tracking-tight">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">{tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Content: description + features, gallery */}
      <section className="bg-black px-6 pb-28 text-white md:pb-40">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6"
          >
            {longDesc.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-lg leading-relaxed text-white/75"
                    : "mt-6 leading-relaxed text-white/55"
                }
              >
                {p}
              </p>
            ))}

            <ul className="mt-10 space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/50" strokeWidth={2} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-6"
          >
            <ServiceGallery images={images} label={gallerySlug} />
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-white/10 bg-black px-6 py-24 text-center text-white md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-black leading-none tracking-tight">
            Ready to talk <span className="italic font-light text-white/60">{eyebrow.toLowerCase()}</span>?
          </h2>
          <p className="mt-5 text-white/60">
            Tell us about your brand and goals — we'll get back to you within one
            business day.
          </p>
          <div className="mt-10 flex justify-center">
            <GlowButton as="a" href="/#contact" tone="onDark">
              Book a Call
            </GlowButton>
          </div>
        </motion.div>
      </section>
    </>
  );
}
