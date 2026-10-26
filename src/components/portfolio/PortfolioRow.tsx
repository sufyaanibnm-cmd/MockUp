import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { FeaturedProject } from "@/data/featuredWork";

interface PortfolioRowProps {
  projects: FeaturedProject[];
  direction: "left" | "right";
  number: string;
  automatic: boolean;
}

interface CardPosition {
  element: HTMLElement;
  center: number;
  width: number;
  visible: boolean;
}

// The middle copy leaves a full set of artwork on either side of the viewport.
const wrapPosition = (position: number, width: number) =>
  width / 2 + (((position - width / 2) % width) + width) % width;

function ProjectCard({ project }: {
  project: FeaturedProject;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className="fw-card-shell"
      style={{ "--fw-image-ratio": project.imageWidth / project.imageHeight } as CSSProperties}
    >
      <div className="fw-card">
        <div className="fw-card__art" style={{ aspectRatio: `${project.imageWidth} / ${project.imageHeight}` }}>
          {imageFailed ? <span className="fw-card__notice">Image unavailable</span> : (
            <img
              src={project.images[0]}
              alt={project.name}
              draggable={false}
              width={project.imageWidth}
              height={project.imageHeight}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          )}
        </div>
        <div className="fw-card__caption">
          <div>
            <p>{project.category}</p>
            <h3>{project.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioRow({ projects, direction, number, automatic }: PortfolioRowProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef({ viewportWidth: 0, groupWidth: 0, cards: [] as CardPosition[] });
  const lastPaintedRef = useRef(Number.NaN);
  const animatingRef = useRef(false);
  const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerDownRef = useRef(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageHidden, setPageHidden] = useState(() => document.hidden);
  const stopped = hovered || focused || interacting || !inView || pageHidden;

  const resumeAfterInteraction = useCallback(() => {
    if (interactionTimerRef.current !== null) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => setInteracting(false), 900);
  }, []);

  useEffect(() => () => {
    if (interactionTimerRef.current !== null) clearTimeout(interactionTimerRef.current);
  }, []);

  const paintPerspective = useCallback((scrollLeft: number) => {
    if (lastPaintedRef.current === scrollLeft) return;
    lastPaintedRef.current = scrollLeft;
    const { viewportWidth: width, cards } = positionsRef.current;
    if (!width) return;
    const halfWidth = width / 2;
    const maxAngle = width < 768 ? 22 : 34;

    for (const card of cards) {
      const distance = card.center - scrollLeft - halfWidth;
      const visible = Math.abs(distance) < halfWidth + card.width;
      if (!visible) {
        if (card.visible) {
          card.element.style.transform = "";
          card.element.style.willChange = "";
        }
        card.visible = false;
        continue;
      }
      const progress = Math.max(-1, Math.min(1, distance / halfWidth));
      const angle = -progress * maxAngle;
      const scale = 0.97 + progress * progress * 0.03;
      card.element.style.transform = `perspective(700px) rotateY(${angle.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
      if (!card.visible) card.element.style.willChange = "transform";
      card.visible = true;
    }
  }, []);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;
    const previous = positionsRef.current;
    for (const card of previous.cards) {
      card.element.style.transform = "";
      card.element.style.willChange = "";
    }
    const groupWidth = group.getBoundingClientRect().width;
    const width = viewport.clientWidth;
    const trackLeft = group.parentElement!.getBoundingClientRect().left;
    // Cache untransformed positions on resize, never measure layout per frame.
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>(".fw-card-shell"), (element) => {
      const rect = element.getBoundingClientRect();
      return { element, center: rect.left - trackLeft + rect.width / 2, width: rect.width, visible: false };
    });
    positionsRef.current = { viewportWidth: width, groupWidth, cards };
    if (automatic && groupWidth > 0) {
      if (previous.groupWidth === 0) {
        const first = group.firstElementChild as HTMLElement | null;
        viewport.scrollLeft = groupWidth + (first?.getBoundingClientRect().width ?? 0) / 2 - width / 2;
      } else if (previous.groupWidth !== groupWidth) {
        viewport.scrollLeft = viewport.scrollLeft / previous.groupWidth * groupWidth;
      }
    }
    lastPaintedRef.current = Number.NaN;
    paintPerspective(viewport.scrollLeft);
  }, [automatic, viewportWidth, projects, paintPerspective]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let scrollFrame = 0;
    const resize = new ResizeObserver(() => setViewportWidth(viewport.clientWidth));
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    const onVisibility = () => setPageHidden(document.hidden);
    const onScroll = () => {
      if (animatingRef.current || scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        paintPerspective(viewport.scrollLeft);
      });
    };
    resize.observe(viewport);
    visibility.observe(viewport);
    document.addEventListener("visibilitychange", onVisibility);
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      resize.disconnect();
      visibility.disconnect();
      cancelAnimationFrame(scrollFrame);
      document.removeEventListener("visibilitychange", onVisibility);
      viewport.removeEventListener("scroll", onScroll);
    };
  }, [paintPerspective]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const width = positionsRef.current.groupWidth;
    if (!automatic || stopped || !viewport || width <= 0) return;

    let frame = 0;
    let previousTime = 0;
    let position = viewport.scrollLeft;
    let lastApplied = viewport.scrollLeft;
    animatingRef.current = true;
    const tick = (time: number) => {
      // Cap inactive-tab time and retain fractional pixels for steady motion.
      const elapsed = previousTime ? Math.min(time - previousTime, 48) : 0;
      previousTime = time;
      if (Math.abs(viewport.scrollLeft - lastApplied) > 2) position = viewport.scrollLeft;
      position = wrapPosition(position + elapsed * 0.026 * (direction === "left" ? 1 : -1), width);
      viewport.scrollLeft = position;
      lastApplied = viewport.scrollLeft;
      paintPerspective(lastApplied);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      animatingRef.current = false;
      cancelAnimationFrame(frame);
    };
  }, [automatic, stopped, direction, viewportWidth, projects, paintPerspective]);

  const scroll = (sign: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setInteracting(true);
    resumeAfterInteraction();
    const width = positionsRef.current.groupWidth;
    if (automatic && width > 0) viewport.scrollLeft = wrapPosition(viewport.scrollLeft, width);
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
      onPointerDown={(event) => {
        if (event.pointerType === "touch" || event.pointerType === "pen") {
          pointerDownRef.current = true;
          if (interactionTimerRef.current !== null) clearTimeout(interactionTimerRef.current);
          setInteracting(true);
        }
      }}
      onPointerUp={() => {
        if (pointerDownRef.current) {
          pointerDownRef.current = false;
          resumeAfterInteraction();
        }
      }}
      onPointerCancel={() => {
        pointerDownRef.current = false;
        resumeAfterInteraction();
      }}
      onFocusCapture={(event) => setFocused(event.target.matches(":focus-visible"))}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <div
        id={`project-row-${number}`}
        ref={viewportRef}
        className={`fw-viewport${automatic ? " fw-viewport--loop" : ""}`}
        role="region"
        tabIndex={0}
        aria-label={`Project row ${number}, ${automatic ? `moves ${direction}` : "swipe to explore"}`}
        onWheel={(event) => {
          if (Math.abs(event.deltaX) > 0 || event.shiftKey) {
            setInteracting(true);
            resumeAfterInteraction();
          }
        }}
        onScroll={() => {
          if (interacting && !pointerDownRef.current) resumeAfterInteraction();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            setFocused(true);
            scroll(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className="fw-track">
          {copies.map((copy) => (
            <div
              className="fw-group"
              key={copy}
              ref={copy === 1 ? groupRef : undefined}
              aria-hidden={copy !== 1 ? true : undefined}
            >
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
