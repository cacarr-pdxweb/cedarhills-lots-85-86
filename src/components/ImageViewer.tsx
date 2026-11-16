import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Maximize2, Minimize2, X } from 'lucide-react';
import { PROPERTY_IMAGES, type PropertyImage } from '../data/propertyData';
import { PictureAsset } from './PictureAsset';

let cachedSupportsDisplayTransition: boolean | undefined;

function canTransitionDisplay(): boolean {
  if (cachedSupportsDisplayTransition !== undefined) return cachedSupportsDisplayTransition;
  if (typeof window === 'undefined' || !window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
    return false;
  }
  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = 'none';
  cachedSupportsDisplayTransition = getComputedStyle(probe).display === 'block';
  probe.remove();
  return cachedSupportsDisplayTransition;
}

function supportsTopLayerExit(): boolean {
  return typeof window !== 'undefined' && Boolean(window.CSS?.supports?.('overlay', 'auto')) && canTransitionDisplay();
}

interface ImageViewerProps {
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  lightboxOpen: boolean;
  onOpenLightbox: (index?: number) => void;
  onCloseLightbox: () => void;
}

type CategoryFilter = 'all' | 'parcel' | 'route';

export function ImageViewer({
  activeIndex,
  onChangeIndex,
  lightboxOpen,
  onOpenLightbox,
  onCloseLightbox,
}: ImageViewerProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [zoomed, setZoomed] = useState(false);
  const [stageAnnouncement, setStageAnnouncement] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingRef = useRef(false);

  const visibleImages: PropertyImage[] = useMemo(() => {
    if (filter === 'all') return PROPERTY_IMAGES;
    return PROPERTY_IMAGES.filter((img) => img.category === filter);
  }, [filter]);

  const currentImage = PROPERTY_IMAGES[activeIndex] ?? PROPERTY_IMAGES[0];
  const visiblePosition = Math.max(
    0,
    visibleImages.findIndex((img) => img.id === currentImage.id),
  );

  const stepStage = useCallback(
    (delta: number, list: PropertyImage[] = visibleImages) => {
      const idxInList = Math.max(
        0,
        list.findIndex((img) => img.id === PROPERTY_IMAGES[activeIndex]?.id),
      );
      const nextInList = (idxInList + delta + list.length) % list.length;
      const globalIdx = PROPERTY_IMAGES.findIndex((img) => img.id === list[nextInList].id);
      if (globalIdx !== -1) {
        onChangeIndex(globalIdx);
        setZoomed(false);
        setStageAnnouncement(`Showing image ${nextInList + 1} of ${list.length}: ${list[nextInList].title}`);
      }
    },
    [activeIndex, onChangeIndex, visibleImages],
  );

  const handleFilterChange = (nextFilter: CategoryFilter) => {
    setFilter(nextFilter);
    const matching =
      nextFilter === 'all' ? PROPERTY_IMAGES : PROPERTY_IMAGES.filter((img) => img.category === nextFilter);
    if (matching.length > 0 && !matching.some((img) => img.id === currentImage.id)) {
      const firstGlobal = PROPERTY_IMAGES.findIndex((img) => img.id === matching[0].id);
      if (firstGlobal !== -1) onChangeIndex(firstGlobal);
    }
  };

  const closeTopLayer = useCallback(async () => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open || closingRef.current) return;
    closingRef.current = true;

    if (!supportsTopLayerExit()) {
      dialog.setAttribute('data-closing', '');
      const animations = dialog.getAnimations({ subtree: true });
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((r) => window.setTimeout(r, 2000)),
        ]);
      }
      if (!dialog.hasAttribute('data-closing')) {
        closingRef.current = false;
        return;
      }
      dialog.removeAttribute('data-closing');
    }

    closingRef.current = false;
    dialog.close();
  }, []);

  // Sync React lightboxOpen prop -> native dialog.showModal()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (lightboxOpen && !dialog.open) {
      dialog.removeAttribute('data-closing');
      closingRef.current = false;
      dialog.showModal();
    } else if (!lightboxOpen && dialog.open) {
      closeTopLayer();
    }
  }, [lightboxOpen, closeTopLayer]);

  // Handle native close, cancel (Esc / closedby light-dismiss), and closedby pointer fallback
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onClose = () => {
      dialog.returnValue = '';
      dialog.removeAttribute('data-closing');
      closingRef.current = false;
      setZoomed(false);
      onCloseLightbox();
    };

    const onCancel = (event: Event) => {
      event.preventDefault();
      closeTopLayer();
    };

    dialog.addEventListener('close', onClose);
    dialog.addEventListener('cancel', onCancel);

    let cleanupPointerFallback: (() => void) | undefined;
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const isOutside = (e: PointerEvent) => {
        const r = dialog.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };
      let pressedOutside = false;
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = isOutside(e);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && isOutside(e)) closeTopLayer();
      };
      dialog.addEventListener('pointerdown', onPointerDown);
      dialog.addEventListener('pointerup', onPointerUp);
      cleanupPointerFallback = () => {
        dialog.removeEventListener('pointerdown', onPointerDown);
        dialog.removeEventListener('pointerup', onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener('close', onClose);
      dialog.removeEventListener('cancel', onCancel);
      cleanupPointerFallback?.();
    };
  }, [closeTopLayer, onCloseLightbox]);

  // Arrow navigation while lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stepStage(-1, PROPERTY_IMAGES);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        stepStage(1, PROPERTY_IMAGES);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, stepStage]);

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="py-14 sm:py-20 border-t border-[var(--border-subtle)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-sunset)]">
              Visual Survey &amp; Plat Archive
            </p>
            <h2 id="gallery-heading" className="display-section mt-1.5 text-[var(--text-primary)]">
              Property &amp; Approach Image Viewer
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter property imagery"
            className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
          >
            {(
              [
                { id: 'all', label: `All Views (${PROPERTY_IMAGES.length})` },
                { id: 'parcel', label: 'Parcel & Plat (3)' },
                { id: 'route', label: 'Access & Route (4)' },
              ] as const
            ).map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`min-h-9 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-[var(--accent-juniper)] text-[var(--accent-juniper-ink)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Viewer Stage */}
        <div className="desert-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden">
          <div className="relative bg-[var(--bg-subtle)]">
            <button
              type="button"
              onClick={() => onOpenLightbox(activeIndex)}
              className="group relative block w-full text-left cursor-zoom-in focus-visible:outline-offset-[-3px]"
              aria-label={`Open full-resolution viewer for ${currentImage.title}`}
            >
              <PictureAsset
                image={currentImage}
                sizes="(max-width: 1024px) 100vw, 1100px"
                priority="lazy"
                imgClassName="block w-full aspect-[16/10] object-contain bg-[#141714]"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur-xs transition-transform group-hover:scale-105">
                <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Inspect Full Resolution</span>
              </span>
            </button>

            {/* Stage Overlay Arrows */}
            <button
              type="button"
              onClick={() => stepStage(-1)}
              aria-label="Previous property image"
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/65 text-white hover:bg-black/85 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => stepStage(1)}
              aria-label="Next property image"
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/65 text-white hover:bg-black/85 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Caption & Controls Bar */}
          <div className="p-4 sm:p-6 flex flex-wrap items-start justify-between gap-4 border-t border-[var(--border-subtle)]">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono-tabular text-xs px-2.5 py-0.5 rounded-full bg-[var(--accent-sunset-soft)] text-[var(--accent-sunset-soft-ink)] font-medium">
                  {visiblePosition + 1} / {visibleImages.length}
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                  {currentImage.title}
                </h3>
              </div>
              <p className="mt-1.5 text-sm text-[var(--text-secondary)] prose-copy">
                {currentImage.caption}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenLightbox(activeIndex)}
              className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors shrink-0 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 text-[var(--accent-sunset)]" aria-hidden="true" />
              <span>Expand Viewer</span>
            </button>
          </div>

          {/* Thumbnail Selector Strip */}
          <div className="px-4 sm:px-6 pb-5 pt-1">
            <div
              role="group"
              aria-label="Choose a property image"
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5"
            >
              {visibleImages.map((img, idx) => {
                const isSelected = img.id === currentImage.id;
                const globalIndex = PROPERTY_IMAGES.findIndex((item) => item.id === img.id);
                return (
                  <button
                    key={img.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      onChangeIndex(globalIndex);
                      setStageAnnouncement(`Selected image ${idx + 1} of ${visibleImages.length}: ${img.title}`);
                    }}
                    className={`group text-left rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--accent-sunset)] bg-[var(--accent-sunset-soft)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-[#141714]">
                      <PictureAsset
                        image={img}
                        sizes="(max-width: 640px) 45vw, 180px"
                        priority="lazy"
                        imgClassName="block w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <span className="block px-2 py-1.5 text-xs font-medium truncate text-[var(--text-primary)]">
                      {img.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="visually-hidden" role="status" aria-live="polite">
          {stageAnnouncement}
        </p>
      </div>

      {/* Native <dialog> Full-Resolution Lightbox */}
      <dialog
        ref={dialogRef}
        id="property-lightbox"
        aria-labelledby="lightbox-title"
        className="lightbox-dialog w-[94dvw] max-w-6xl shadow-2xl"
        {...({ closedby: 'any' } as Record<string, string>)}
      >
        <div className="flex flex-col max-h-[92dvh]">
          <header className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="min-w-0">
              <p className="font-mono-tabular text-xs text-[var(--text-muted)]">
                Image {activeIndex + 1} of {PROPERTY_IMAGES.length}
              </p>
              <h2 id="lightbox-title" className="text-sm sm:text-base font-semibold text-[var(--text-primary)] truncate">
                {currentImage.title}
              </h2>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-pressed={zoomed}
                className="inline-flex items-center gap-1.5 min-h-9 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] cursor-pointer"
              >
                {zoomed ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Fit Screen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Zoom Detail</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => closeTopLayer()}
                aria-label="Close image viewer"
                autoFocus
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </header>

          <div
            className={`relative flex-1 bg-[#111411] overscroll-contain ${
              zoomed ? 'overflow-auto' : 'overflow-hidden flex items-center justify-center'
            }`}
          >
            <div className={zoomed ? 'min-w-[1400px] p-4' : 'w-full h-full flex items-center justify-center p-2 sm:p-4'}>
              <PictureAsset
                image={currentImage}
                sizes="95vw"
                imgClassName={
                  zoomed
                    ? 'block w-full h-auto'
                    : 'block max-h-[68dvh] w-auto max-w-full object-contain mx-auto'
                }
              />
            </div>

            {!zoomed && (
              <>
                <button
                  type="button"
                  onClick={() => stepStage(-1, PROPERTY_IMAGES)}
                  aria-label="Previous image in viewer"
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/70 text-white hover:bg-black/90 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => stepStage(1, PROPERTY_IMAGES)}
                  aria-label="Next image in viewer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/70 text-white hover:bg-black/90 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          <footer className="px-4 sm:px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl">
              {currentImage.caption}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => stepStage(-1, PROPERTY_IMAGES)}
                className="min-h-8 px-3 py-1 rounded-lg border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] cursor-pointer"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => stepStage(1, PROPERTY_IMAGES)}
                className="min-h-8 px-3 py-1 rounded-lg border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] cursor-pointer"
              >
                Next
              </button>
            </div>
          </footer>
        </div>
      </dialog>
    </section>
  );
}
