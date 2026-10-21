import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";

export interface GalleryProject {
  id: string;
  name: string;
  category: string;
  description: string;
  servicePath: string;
  images: string[];
}

interface ProjectGalleryProps {
  project: GalleryProject | null;
  onClose: () => void;
  showServiceLink?: boolean;
}

function OpenProjectGallery({
  project,
  onClose,
  showServiceLink,
}: {
  project: GalleryProject;
  onClose: () => void;
  showServiceLink: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [imageIndex, setImageIndex] = useState(0);
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const imageCount = project.images.length;
  const currentSource = project.images[imageIndex];
  const imageUnavailable = !currentSource || failedSources.includes(currentSource);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  const moveImage = (direction: number) => {
    if (imageCount < 2) return;
    setImageIndex((index) => (index + direction + imageCount) % imageCount);
  };

  return (
    <dialog
      ref={dialogRef}
      className="fw-gallery"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (imageCount < 2) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          moveImage(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className="fw-gallery__layout">
        <button
          type="button"
          className="fw-gallery__close"
          aria-label="Close project gallery"
          onClick={onClose}
          autoFocus
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="fw-gallery__visual">
          {imageUnavailable ? (
            <div className="fw-gallery__empty">
              <p>
                {imageCount === 0
                  ? "Project images coming soon"
                  : "This project image is currently unavailable."}
              </p>
            </div>
          ) : (
            <img
              key={currentSource}
              src={currentSource}
              alt={`${project.name} — image ${imageIndex + 1} of ${imageCount}`}
              decoding="async"
              onError={() => {
                setFailedSources((sources) => [...sources, currentSource]);
              }}
            />
          )}
        </div>

        <div className="fw-gallery__details">
          <p className="fw-gallery__eyebrow">{project.category}</p>
          <h3 id={titleId} className="fw-gallery__title">
            {project.name}
          </h3>
          <p id={descriptionId} className="fw-gallery__description">
            {project.description}
          </p>
          {imageCount > 0 && (
            <div className="fw-gallery__navigation" aria-label="Gallery images">
              <button
                type="button"
                aria-label="Previous project image"
                disabled={imageCount < 2}
                onClick={() => moveImage(-1)}
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <span className="fw-gallery__count" aria-live="polite" aria-atomic="true">
                {imageIndex + 1} / {imageCount}
              </span>
              <button
                type="button"
                aria-label="Next project image"
                disabled={imageCount < 2}
                onClick={() => moveImage(1)}
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}

          {showServiceLink && (
            <Link to={project.servicePath} className="fw-gallery__service" onClick={onClose}>
              Explore this service
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </dialog>
  );
}

export function ProjectGallery({ project, onClose, showServiceLink = true }: ProjectGalleryProps) {
  return project ? (
    <OpenProjectGallery
      key={project.id}
      project={project}
      onClose={onClose}
      showServiceLink={showServiceLink}
    />
  ) : null;
}
