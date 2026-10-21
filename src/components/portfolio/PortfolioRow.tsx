import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { FeaturedProject } from "@/data/featuredWork";

interface PortfolioRowProps {
  projects: FeaturedProject[];
  direction: "left" | "right";
  number: string;
  automatic: boolean;
  paused: boolean;
  onPause: () => void;
  onSelect: (project: FeaturedProject) => void;
}

function ProjectCard({ project, duplicate, onSelect }: {
  project: FeaturedProject;
  duplicate: boolean;
  onSelect: (project: FeaturedProject) => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(project.images[0]) && !imageFailed;

  return (
    <button
      type="button"
      className={`fw-card fw-card--${project.width}${hasImage ? " fw-card--image" : ""}`}
      tabIndex={duplicate ? -1 : 0}
      aria-label={`Explore ${project.name} — ${project.category}`}
      aria-haspopup="dialog"
      onPointerDown={(event) => { if (duplicate) event.preventDefault(); }}
      onClick={() => onSelect(project)}
    >
      {hasImage ? (
        <div className="fw-card__art">
          <img src={project.images[0]} alt="" loading="lazy" decoding="async" onError={() => setImageFailed(true)} />
        </div>
      ) : <span className="fw-card__notice">Project images coming soon</span>}
      <div className="fw-card__caption">
        <div>
          <p>{project.category}</p>
          <h3>{project.name}</h3>
        </div>
        <ArrowUpRight size={23} strokeWidth={1.6} aria-hidden="true" />
      </div>
    </button>
  );
}

export function PortfolioRow({ projects, direction, number, automatic, paused, onPause, onSelect }: PortfolioRowProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const stopped = paused || hovered || focused || !inView;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const resize = new ResizeObserver(() => setViewportWidth(viewport.clientWidth));
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    resize.observe(viewport);
    visibility.observe(viewport);
    return () => { resize.disconnect(); visibility.disconnect(); };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;
    viewport.scrollLeft = automatic ? group.getBoundingClientRect().width : 0;
  }, [automatic, viewportWidth]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!automatic || stopped || !viewport || !group) return;
    const width = group.getBoundingClientRect().width;
    if (width <= 0) return;

    let frame = 0;
    let previousTime = 0;
    let position = viewport.scrollLeft;
    let lastApplied = viewport.scrollLeft;
    const tick = (time: number) => {
      // Cap inactive-tab time and retain fractional pixels for steady motion.
      const elapsed = previousTime ? Math.min(time - previousTime, 48) : 0;
      previousTime = time;
      if (Math.abs(viewport.scrollLeft - lastApplied) > 2) position = viewport.scrollLeft;
      position += elapsed * 0.026 * (direction === "left" ? 1 : -1);
      if (position < width) position += width;
      if (position >= width * 2) position -= width;
      viewport.scrollLeft = position;
      lastApplied = viewport.scrollLeft;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [automatic, stopped, direction, viewportWidth]);

  const scroll = (sign: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    onPause();
    if (automatic && groupRef.current) {
      const width = groupRef.current.getBoundingClientRect().width;
      if (width > 0) viewport.scrollLeft = width + ((viewport.scrollLeft % width) + width) % width;
    }
    viewport.scrollBy({
      left: sign * Math.min(viewport.clientWidth * 0.75, 440),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  const copies = automatic ? [0, 1, 2] : [1];
  return (
    <div
      className="fw-row"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <div className="fw-row__bar">
        <div className="fw-row__direction">
          <span className="fw-row__direction-icon" aria-hidden="true">
            {direction === "right" ? <ArrowRight size={17} /> : <ArrowLeft size={17} />}
          </span>
          <span>{automatic ? `Scroll ${direction}` : "Explore the work"}</span>
        </div>
        <span className="fw-row__rule" />
        <span className="fw-row__number">{number} / 02</span>
        <div className="fw-row__controls">
          <button type="button" onClick={() => scroll(-1)} aria-label={`Scroll project row ${number} left`} aria-controls={`project-row-${number}`}><ArrowLeft size={16} aria-hidden="true" /></button>
          <button type="button" onClick={() => scroll(1)} aria-label={`Scroll project row ${number} right`} aria-controls={`project-row-${number}`}><ArrowRight size={16} aria-hidden="true" /></button>
        </div>
      </div>
      <div
        id={`project-row-${number}`}
        ref={viewportRef}
        className={`fw-viewport${automatic ? " fw-viewport--loop" : ""}`}
        role="region"
        aria-label={`Project row ${number}, ${automatic ? `moves ${direction}` : "swipe to explore"}`}
      >
        <div className="fw-track">
          {copies.map((copy) => (
            <div
              className="fw-group"
              key={copy}
              ref={copy === 1 ? groupRef : undefined}
              aria-hidden={copy !== 1 ? true : undefined}
              style={automatic ? { minWidth: viewportWidth } : undefined}
            >
              {projects.map((project) => <ProjectCard key={project.id} project={project} duplicate={copy !== 1} onSelect={onSelect} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
