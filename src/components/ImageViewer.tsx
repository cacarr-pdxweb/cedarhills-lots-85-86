import { useCallback, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Maximize2 } from 'lucide-react';
import { PROPERTY_IMAGES, type PropertyImage } from '../data/propertyData';
import { ImageLightbox } from './ImageLightbox';
import { PictureAsset } from './PictureAsset';

interface ImageViewerProps {
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  lightboxOpen: boolean;
  onOpenLightbox: (index?: number) => void;
  onCloseLightbox: () => void;
}

type CategoryFilter = 'all' | 'parcel' | 'route';

const PARCEL_COUNT = PROPERTY_IMAGES.filter((img) => img.category === 'parcel').length;
const ROUTE_COUNT = PROPERTY_IMAGES.filter((img) => img.category === 'route').length;

const FILTER_TABS: ReadonlyArray<{ id: CategoryFilter; label: string }> = [
  { id: 'all', label: `All Views (${PROPERTY_IMAGES.length})` },
  { id: 'parcel', label: `Parcel & Plat (${PARCEL_COUNT})` },
  { id: 'route', label: `Access & Route (${ROUTE_COUNT})` },
];

export function ImageViewer({
  activeIndex,
  onChangeIndex,
  lightboxOpen,
  onOpenLightbox,
  onCloseLightbox,
}: ImageViewerProps) {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [stageAnnouncement, setStageAnnouncement] = useState('');

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
        setStageAnnouncement(`Showing image ${nextInList + 1} of ${list.length}: ${list[nextInList].title}`);
      }
    },
    [activeIndex, onChangeIndex, visibleImages],
  );

  const stepAllImages = useCallback((delta: number) => stepStage(delta, PROPERTY_IMAGES), [stepStage]);

  const handleFilterChange = (nextFilter: CategoryFilter) => {
    setFilter(nextFilter);
    const matching =
      nextFilter === 'all' ? PROPERTY_IMAGES : PROPERTY_IMAGES.filter((img) => img.category === nextFilter);
    if (matching.length > 0 && !matching.some((img) => img.id === currentImage.id)) {
      const firstGlobal = PROPERTY_IMAGES.findIndex((img) => img.id === matching[0].id);
      if (firstGlobal !== -1) onChangeIndex(firstGlobal);
    }
  };

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="py-14 sm:py-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sunset">
              Visual Survey &amp; Plat Archive
            </p>
            <h2 id="gallery-heading" className="display-section mt-1.5 text-ink">
              Property &amp; Approach Image Viewer
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter property imagery"
            className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-line bg-surface"
          >
            {FILTER_TABS.map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleFilterChange(tab.id)}
                  className={`min-h-9 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-juniper text-juniper-ink'
                      : 'text-ink-secondary hover:bg-subtle'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Viewer Stage */}
        <div className="desert-card overflow-hidden">
          <div className="relative bg-subtle">
            <button
              type="button"
              onClick={() => onOpenLightbox(activeIndex)}
              className="group relative block w-full text-left cursor-zoom-in focus-visible:outline-offset-[-3px]"
              aria-label={`Inspect Full Resolution — ${currentImage.title}`}
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
          <div className="p-4 sm:p-6 flex flex-wrap items-start justify-between gap-4 border-t border-line">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono-tabular text-xs px-2.5 py-0.5 rounded-full bg-sunset-soft text-sunset-soft-ink font-medium">
                  {visiblePosition + 1} / {visibleImages.length}
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-ink">
                  {currentImage.title}
                </h3>
              </div>
              <p className="mt-1.5 text-sm text-ink-secondary prose-copy">
                {currentImage.caption}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenLightbox(activeIndex)}
              className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-xl border border-line-strong bg-canvas text-sm font-medium text-ink hover:bg-subtle transition-colors shrink-0 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 text-sunset" aria-hidden="true" />
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
                        ? 'border-sunset bg-sunset-soft'
                        : 'border-line bg-canvas hover:border-line-strong'
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
                    <span className="block px-2 py-1.5 text-xs font-medium truncate text-ink">
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

      <ImageLightbox
        open={lightboxOpen}
        activeIndex={activeIndex}
        onStep={stepAllImages}
        onClose={onCloseLightbox}
      />
    </section>
  );
}
