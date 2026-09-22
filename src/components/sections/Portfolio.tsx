import { memo, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

// ─────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────

interface PortfolioProject {
  /** Display name of the project (also used as the React list key). */
  name: string;
  /** Category / service label rendered under the project name. */
  tag: string;
  /** Ordered list of image URLs for the hover gallery. Can be empty. */
  images: string[];
}

// ─────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────

const portfolioProjects: PortfolioProject[] = [
  {
    name: "VisionCraft",
    tag: ".Branding + Presentation",
    images: [],
  },
  {
    name: "Campaign Pulse",
    tag: "Creative Campaign + Social Media",
    images: [],
  },
  {
    name: "MotionVerse",
    tag: "Video Editing + Motion Graphic + Animation",
    images: [],
  },
  {
    name: "Studio Sessions",
    tag: "Creative Shoots",
    images: [],
  },
  {
    name: "ShopSphere",
    tag: "E-Commerce Store + Website",
    images: [],
  },
  {
    name: "Pixel Perfect",
    tag: "Website Banners + Assets",
    images: [],
  },
  {
    name: "TechVision",
    tag: "Technical Graphics + Animations",
    images: [],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// ProjectImage — single gallery slide
// ─────────────────────────────────────────────────────────────────────────

interface ProjectImageProps {
  src: string;
  alt: string;
  eager?: boolean;
}

const ProjectImage = memo(function ProjectImage({
  src,
  alt,
  eager = false,
}: ProjectImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
});

// ─────────────────────────────────────────────────────────────────────────
// ProjectPlaceholder — shown for projects with an empty images array
// ─────────────────────────────────────────────────────────────────────────

interface ProjectPlaceholderProps {
  label: string;
}

function ProjectPlaceholder({ label }: ProjectPlaceholderProps) {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-black"
      role="img"
      aria-label={`${label} gallery coming soon`}
    >
      <div className="flex flex-col items-center gap-2 text-white/30">
        <ImageOff className="h-8 w-8" aria-hidden="true" />
        <span className="text-xs uppercase tracking-widest">Coming soon</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// ProjectCard — one grid card: Swiper instance + hover-driven autoplay
// ─────────────────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
}

const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const hasImages = project.images.length > 0;

  const handleMouseEnter = useCallback(() => {
    swiperRef.current?.autoplay.start();
  }, []);

  const handleMouseLeave = useCallback(() => {
    swiperRef.current?.autoplay.stop();
  }, []);

  const handleSwiperInit = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    swiper.autoplay.stop(); 
  }, []);

  const spanClass = index === 0 || index === 3 ? "md:col-span-4" : "md:col-span-2";

  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative block overflow-hidden rounded-xl bg-black ${spanClass}`}
      aria-label={`View ${project.name} — ${project.tag}`}
    >
      <div className="aspect-4/3 overflow-hidden relative z-0">
        {hasImages ? (
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop
            speed={1000}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            onSwiper={handleSwiperInit}
            className="h-full w-full"
          >
            {project.images.map((image, imgIndex) => (
              <SwiperSlide key={image}>
                <ProjectImage
                  src={image}
                  alt={`${project.name} preview ${imgIndex + 1}`}
                  eager={index === 0 && imgIndex === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <ProjectPlaceholder label={project.name} />
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between bg-linear-to-t from-black/90 via-black/30 to-transparent p-6 text-white">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/70">{project.tag}</p>
          <h3 className="mt-1 font-display text-2xl font-bold">{project.name}</h3>
        </div>
        <span
          aria-hidden="true"
          className="relative z-30 flex h-12 w-12 items-center justify-center rounded-full
                     border border-transparent
                     transition-all duration-300
                     hover:border-white hover:bg-white hover:text-black"
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
        </span>
      </div>
    </motion.a>
  );
});

// ─────────────────────────────────────────────────────────────────────────
// Portfolio — section shell + heading
// ─────────────────────────────────────────────────────────────────────────

export function Portfolio() {
  return (
    <section id="work" className="bg-white px-6 py-28 text-black md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-black/50">
              Featured Work / 03
            </p>

            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-tight">
              Selected{" "}
              <span className="italic font-light text-black/50">projects</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-6">
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
