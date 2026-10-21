import { useCallback, useState } from "react";
import { Pause, Play } from "lucide-react";
import { featuredWork, type FeaturedProject } from "@/data/featuredWork";
import { PortfolioRow } from "@/components/portfolio/PortfolioRow";
import { ProjectGallery } from "@/components/portfolio/ProjectGallery";
import "@/components/portfolio/portfolio.css";

export function Portfolio() {
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<FeaturedProject | null>(null);
  const closeGallery = useCallback(() => setSelected(null), []);
  const pauseMotion = useCallback(() => setPaused(true), []);

  return (
    <section id="work" className="featured-work" aria-labelledby="featured-work-title">
      <div className="fw-heading">
        <div>
          <p className="fw-eyebrow">Featured Work / 03</p>
          <h2 id="featured-work-title">Selected <span>projects</span></h2>
        </div>
        <div className="fw-heading__aside">
          <p>Creative work for<br />forward-thinking brands.</p>
          <button
            type="button"
            className="fw-motion-toggle"
            aria-label={paused ? "Play project motion" : "Pause project motion"}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
            {paused ? "Play motion" : "Pause motion"}
          </button>
        </div>
      </div>
      <div className="fw-rows">
        <PortfolioRow
          projects={featuredWork.slice(0, 4)}
          direction="right"
          number="01"
          automatic
          paused={paused || selected !== null}
          onPause={pauseMotion}
          onSelect={setSelected}
        />
        <PortfolioRow
          projects={featuredWork.slice(4)}
          direction="left"
          number="02"
          automatic
          paused={paused || selected !== null}
          onPause={pauseMotion}
          onSelect={setSelected}
        />
      </div>
      {featuredWork.every((project) => project.images.length === 0) && (
        <p className="fw-footnote">Project images coming soon.</p>
      )}
      <ProjectGallery project={selected} onClose={closeGallery} />
    </section>
  );
}
