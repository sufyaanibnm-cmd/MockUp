import { motion } from "motion/react";
import { Plus, Equal } from "lucide-react";
import type { ServiceContent } from "@/data/serviceContent";

interface FormulaSectionProps {
  content: ServiceContent;
}

/**
 * "Services work together" formula — communicates that Shaffedits isn't
 * six unrelated services (see brief section 10).
 */
export function FormulaSection({ content }: FormulaSectionProps) {
  const { inputs, output } = content.formula;
  return (
    <section className="border-t border-white/10 bg-white px-6 py-24 text-black md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-black/40">
          How It Connects
        </p>
        <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4vw,3rem)] font-black leading-tight tracking-tight">
          This discipline rarely works{" "}
          <span className="italic font-light text-black/40">alone.</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-4 md:gap-6"
        >
          {inputs.map((term, i) => (
            <div key={term.label} className="flex items-center gap-4 md:gap-6">
              <div className="rounded-xl border border-black/10 bg-black/[0.02] px-6 py-5 text-center">
                <span className="font-display text-base font-bold sm:text-lg">{term.label}</span>
              </div>
              {i < inputs.length - 1 && <Plus className="h-5 w-5 shrink-0 text-black/30" aria-hidden="true" />}
            </div>
          ))}
          <Equal className="h-6 w-6 shrink-0 text-black/40" aria-hidden="true" />
          <div
            className="rounded-xl px-6 py-5 text-center text-white"
            style={{ backgroundColor: content.accent }}
          >
            <span className="font-display text-base font-bold sm:text-lg">{output.label}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
