import { useCallback, useState } from 'react';
import {
  ArrowUpRight,
  Compass,
  Download,
  Expand,
  FolderOpen,
  Mail,
  MapPin,
  Sun,
  Trees,
} from 'lucide-react';
import { ContactSection } from './components/ContactSection';
import { DisclosuresAndFaq } from './components/DisclosuresAndFaq';
import { ImageViewer } from './components/ImageViewer';
import { MapAndAccess } from './components/MapAndAccess';
import { ParcelDiagram } from './components/ParcelDiagram';
import { PictureAsset } from './components/PictureAsset';
import {
  CONTACT_EMAIL,
  KEY_SPECS,
  LINKS,
  PROPERTY_HIGHLIGHTS,
  PROPERTY_IMAGES,
} from './data/propertyData';

const HERO_IMAGE_INDEX = PROPERTY_IMAGES.findIndex((img) => img.id === 'route-3d-sat');

export default function App() {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const heroImage = PROPERTY_IMAGES[HERO_IMAGE_INDEX >= 0 ? HERO_IMAGE_INDEX : 0];

  const handleOpenLightbox = useCallback((index?: number) => {
    if (typeof index === 'number') {
      setActiveImageIndex(index);
    }
    setLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <a href="#main-heading" className="skip-link visually-hidden">
        Skip to content
      </a>

      {/* Compact Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 text-sm sm:text-base font-semibold tracking-tight text-[var(--text-primary)]"
          >
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[var(--accent-sunset)] to-[var(--accent-juniper)]"
            />
            <span>Cedar Hills · Lots 85 &amp; 86</span>
          </a>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm text-[var(--text-secondary)]">
            <a href="#overview" className="hover:text-[var(--text-primary)] transition-colors">
              Overview
            </a>
            <a href="#gallery" className="hover:text-[var(--text-primary)] transition-colors">
              Images
            </a>
            <a href="#map" className="hover:text-[var(--text-primary)] transition-colors">
              Map &amp; Route
            </a>
            <a href="#disclosures" className="hover:text-[var(--text-primary)] transition-colors">
              Disclosures
            </a>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 min-h-9 px-3.5 py-1.5 rounded-xl bg-[var(--accent-sunset)] text-[var(--accent-sunset-ink)] text-xs sm:text-sm font-semibold hover:bg-[var(--accent-sunset-hover)] transition-colors shrink-0"
          >
            <span>$4,950 Cash · Inquire</span>
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero Section */}
        <section className="desert-horizon-wash pt-10 pb-12 sm:pt-14 sm:pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-6">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-juniper-soft)] text-[var(--accent-juniper-soft-ink)] text-xs font-semibold tracking-wide">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Apache County, AZ · Between Petrified Forest &amp; US-191</span>
                </p>

                <h1
                  id="main-heading"
                  tabIndex={-1}
                  className="display-hero mt-4 text-[var(--text-primary)]"
                >
                  10 Contiguous Acres of High-Desert Juniper Land
                </h1>

                <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] prose-copy leading-relaxed">
                  Two separately deeded 5-acre parcels side-by-side (
                  <span className="font-medium text-[var(--text-primary)]">Lots 85 &amp; 86</span>,{' '}
                  <span className="font-mono-tabular text-sm">660′ × 660′</span>) with direct dirt-road
                  frontage, zero HOA, clear 2017 Warranty Deed, and paid-in-full 2026 taxes.
                </p>

                {/* Price Callout */}
                <div className="mt-6 inline-flex flex-wrap items-baseline gap-x-4 gap-y-1.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3.5">
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-[var(--accent-sunset)]">
                    $4,950 Cash
                  </span>
                  <span className="text-sm text-[var(--text-secondary)]">
                    $2,475 per 5-acre lot · 22% below County FCV ($6,350)
                  </span>
                </div>

                {/* Hero Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-xl bg-[var(--accent-sunset)] text-[var(--accent-sunset-ink)] text-sm font-semibold hover:bg-[var(--accent-sunset-hover)] transition-colors"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Contact Owner</span>
                  </a>

                  <a
                    href={LINKS.disclosureDrive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-11 px-4 py-2.5 rounded-xl bg-[var(--accent-juniper)] text-[var(--accent-juniper-ink)] text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <FolderOpen className="w-4 h-4" aria-hidden="true" />
                    <span>Disclosure Packet</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    <span className="visually-hidden">(opens Google Drive in new tab)</span>
                  </a>

                  <a
                    href={LINKS.kmlDownload}
                    download="Cedar_Hills_Lots_85_86.kml"
                    className="inline-flex items-center gap-2 min-h-11 px-4 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
                  >
                    <Download className="w-4 h-4 text-[var(--accent-sunset)]" aria-hidden="true" />
                    <span>Download .KML</span>
                  </a>
                </div>
              </div>

              {/* Hero LCP Visual */}
              <div className="lg:col-span-6">
                <div className="desert-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleOpenLightbox(HERO_IMAGE_INDEX >= 0 ? HERO_IMAGE_INDEX : 0)}
                    aria-label="Inspect 3D high-desert plateau view of Lots 85 and 86 in full screen"
                    className="group relative block w-full text-left cursor-zoom-in focus-visible:outline-offset-[-3px]"
                  >
                    <PictureAsset
                      image={heroImage}
                      sizes="(max-width: 1024px) 100vw, 560px"
                      priority="hero"
                      decoding="sync"
                      imgClassName="block w-full aspect-[16/10] object-cover"
                    />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur-xs transition-transform group-hover:scale-105">
                      <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>View 7 Photos &amp; Plat</span>
                    </span>
                  </button>
                  <div className="px-4 py-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-secondary)]">
                    <span>3D approach looking NW toward I-40 Exit 325 &amp; Chambers</span>
                    <span className="font-mono-tabular text-[var(--text-muted)]">
                      34.926956, -109.501120
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Specifications Strip */}
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {KEY_SPECS.map((spec) => (
                <div
                  key={spec.label}
                  className="desert-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {spec.label}
                  </dt>
                  <dd className="mt-1.5 font-serif text-xl sm:text-2xl font-medium text-[var(--text-primary)]">
                    {spec.value}
                  </dd>
                  <dd className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed">
                    {spec.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Property Overview & Interactive Parcel Schematic */}
        <section
          id="overview"
          aria-labelledby="overview-heading"
          className="py-14 sm:py-20 border-t border-[var(--border-subtle)]"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-sunset)]">
                  Land Profile &amp; Zoning
                </p>
                <h2 id="overview-heading" className="display-section mt-1.5 text-[var(--text-primary)]">
                  Ready for Off-Grid Homesteading or Long-Term Hold
                </h2>

                <div className="mt-6 space-y-4">
                  {PROPERTY_HIGHLIGHTS.map((item) => (
                    <article
                      key={item.title}
                      className="desert-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5"
                    >
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed prose-copy">
                        {item.summary}
                      </p>
                    </article>
                  ))}
                </div>

                {/* Climate & Terrain Quick Pills */}
                <ul className="mt-5 flex flex-wrap gap-2.5 text-xs font-medium">
                  <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-sunset-soft)] text-[var(--accent-sunset-soft-ink)]">
                    <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>35°F / 71°F Winter–Summer Avg Highs</span>
                  </li>
                  <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-juniper-soft)] text-[var(--accent-juniper-soft-ink)]">
                    <Trees className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>~6,000 ft · One-Seed Juniper Savanna</span>
                  </li>
                  <li className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>~8.2″ Rain · ~4″ Snow Annually</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6">
                <ParcelDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* Image Viewer + Native Lightbox */}
        <ImageViewer
          activeIndex={activeImageIndex}
          onChangeIndex={setActiveImageIndex}
          lightboxOpen={lightboxOpen}
          onOpenLightbox={handleOpenLightbox}
          onCloseLightbox={handleCloseLightbox}
        />

        {/* Embedded Google My Maps + Driving Route */}
        <MapAndAccess />

        {/* 14-File Disclosure Packet + FAQ */}
        <DisclosuresAndFaq />

        {/* Contact Owner */}
        <ContactSection />
      </main>

      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[var(--text-muted)]">
          <div>
            <p className="font-medium text-[var(--text-secondary)]">
              Cedar Hills Unit Five, Lots 85 &amp; 86 · Apache County, Arizona
            </p>
            <p className="mt-0.5 font-mono-tabular text-xs">
              Sec 29, T18N, R27E, G&amp;SRBM · APNs 206-07-068 &amp; 206-07-069 · Plat 1-46
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={LINKS.disclosureDrive}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] underline-offset-4 hover:underline"
            >
              Disclosure Packet
            </a>
            <a
              href={LINKS.myMapsViewer}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] underline-offset-4 hover:underline"
            >
              Google My Maps
            </a>
            <a
              href={LINKS.kmlDownload}
              download="Cedar_Hills_Lots_85_86.kml"
              className="hover:text-[var(--text-primary)] underline-offset-4 hover:underline"
            >
              Download .KML
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-mono-tabular text-[var(--accent-sunset)] hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
