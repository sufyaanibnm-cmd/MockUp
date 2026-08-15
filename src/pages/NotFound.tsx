import { GlowButton } from "@/components/ui/GlowButton";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center bg-black px-6 text-center text-white">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-white/50">
        404
      </p>
      <h1 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-black leading-none tracking-tight">
        Page not <span className="italic font-light text-white/60">found</span>.
      </h1>
      <p className="mx-auto mt-6 max-w-md text-white/60">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="mt-10">
        <GlowButton as="a" href="/" tone="onDark">
          Back to Home
        </GlowButton>
      </div>
    </section>
  );
}
