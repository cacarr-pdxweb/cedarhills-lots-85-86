import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from 'lucide-react';
import { PROPERTY_IMAGES } from '../data/propertyData';
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

interface ImageLightboxProps {
  open: boolean;
  activeIndex: number;
  onStep: (delta: number) => void;
  onClose: () => void;
}

export function ImageLightbox({ open, activeIndex, onStep, onClose }: ImageLightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const [mediaMounted, setMediaMounted] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(activeIndex);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingRef = useRef(false);
  const unmountTimerRef = useRef<number | null>(null);

  const currentImage = PROPERTY_IMAGES[displayedIndex] ?? PROPERTY_IMAGES[0];

  const clearUnmountTimer = useCallback(() => {
    if (unmountTimerRef.current !== null) {
      window.clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }
  }, []);

  useEffect(() => clearUnmountTimer, [clearUnmountTimer]);

  useEffect(() => {
    if (open) {
      clearUnmountTimer();
      setMediaMounted(true);
      setDisplayedIndex(activeIndex);
    } else if (mediaMounted) {
      clearUnmountTimer();
      unmountTimerRef.current = window.setTimeout(() => {
        setMediaMounted(false);
        unmountTimerRef.current = null;
      }, 300);
    }
  }, [open, activeIndex, mediaMounted, clearUnmountTimer]);

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

  // Sync open prop -> native dialog.showModal()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.removeAttribute('data-closing');
      closingRef.current = false;
      dialog.showModal();
    } else if (!open && dialog.open) {
      closeTopLayer();
    }
  }, [open, closeTopLayer]);

  // Handle native close, cancel (Esc / closedby light-dismiss), and closedby pointer fallback
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleNativeClose = () => {
      dialog.returnValue = '';
      dialog.removeAttribute('data-closing');
      closingRef.current = false;
      setZoomed(false);
      onClose();
    };

    const handleCancel = (event: Event) => {
      event.preventDefault();
      closeTopLayer();
    };

    dialog.addEventListener('close', handleNativeClose);
    dialog.addEventListener('cancel', handleCancel);

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
      dialog.removeEventListener('close', handleNativeClose);
      dialog.removeEventListener('cancel', handleCancel);
      cleanupPointerFallback?.();
    };
  }, [closeTopLayer, onClose]);

  // Arrow navigation while lightbox is open and not zoomed (when zoomed, arrows pan naturally)
  useEffect(() => {
    if (!open || zoomed) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setZoomed(false);
        onStep(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setZoomed(false);
        onStep(1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, zoomed, onStep]);

  const stepAndResetZoom = (delta: number) => {
    setZoomed(false);
    onStep(delta);
  };

  return (
    <dialog
      ref={dialogRef}
      id="property-lightbox"
      aria-labelledby="lightbox-title"
      className="lightbox-dialog w-[94dvw] max-w-6xl shadow-2xl"
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      <div className="flex flex-col max-h-[92dvh]">
        <header className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-line bg-surface">
          <div className="min-w-0">
            <p className="font-mono-tabular text-xs text-ink-muted">
              Image {displayedIndex + 1} of {PROPERTY_IMAGES.length}
            </p>
            <h2 id="lightbox-title" className="text-sm sm:text-base font-semibold text-ink truncate">
              {currentImage.title}
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              aria-pressed={zoomed}
              className="inline-flex items-center gap-1.5 min-h-9 px-3 py-1.5 rounded-lg border border-line bg-canvas text-xs font-medium text-ink hover:bg-subtle cursor-pointer"
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
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-line bg-canvas text-ink hover:bg-subtle cursor-pointer"
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
            {mediaMounted && (
              <PictureAsset
                image={currentImage}
                sizes="95vw"
                imgClassName={
                  zoomed
                    ? 'block w-full h-auto'
                    : 'block max-h-[68dvh] w-auto max-w-full object-contain mx-auto'
                }
              />
            )}
          </div>

          {!zoomed && (
            <>
              <button
                type="button"
                onClick={() => stepAndResetZoom(-1)}
                aria-label="Previous image in viewer"
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/70 text-white hover:bg-black/90 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => stepAndResetZoom(1)}
                aria-label="Next image in viewer"
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/70 text-white hover:bg-black/90 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        <footer className="px-4 sm:px-6 py-3 border-t border-line bg-surface flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-ink-secondary max-w-3xl">
            {currentImage.caption}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => stepAndResetZoom(-1)}
              className="min-h-8 px-3 py-1 rounded-lg border border-line text-xs font-medium text-ink hover:bg-subtle cursor-pointer"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => stepAndResetZoom(1)}
              className="min-h-8 px-3 py-1 rounded-lg border border-line text-xs font-medium text-ink hover:bg-subtle cursor-pointer"
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
