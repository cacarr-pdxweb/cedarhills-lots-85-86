import { Download, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { DRIVING_STEPS, KML_FILENAME, LINKS } from '../data/propertyData';

export function MapAndAccess() {
  return (
    <section
      id="map"
      aria-labelledby="map-heading"
      className="py-14 sm:py-20 border-t border-line"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sunset">
              Interactive Location &amp; GPS Route
            </p>
            <h2 id="map-heading" className="display-section mt-1.5 text-ink">
              Google My Maps &amp; Turn-by-Turn Access
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={LINKS.kmlDownload}
              download={KML_FILENAME}
              className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-xl border border-line-strong bg-surface text-sm font-medium text-ink hover:bg-subtle transition-colors"
            >
              <Download className="w-4 h-4 text-juniper" aria-hidden="true" />
              <span>Download .KML File</span>
            </a>
            <a
              href={LINKS.myMapsViewer}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-xl bg-juniper text-juniper-ink text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <span>Open Full My Maps</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span className="visually-hidden">(opens in new tab)</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Embedded Google My Maps Viewer */}
          <div className="lg:col-span-7 desert-card overflow-hidden">
            <div className="aspect-[4/3] w-full bg-subtle">
              <iframe
                title="Interactive Google My Maps viewer showing Chambers AZ driving route, Cherrys Road turnoff, and boundaries for Lots 85 and 86"
                src={LINKS.myMapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full h-full border-0"
                allowFullScreen
              />
            </div>
            <div className="px-4 sm:px-5 py-3.5 border-t border-line flex flex-wrap items-center justify-between gap-2 text-xs text-ink-secondary">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sunset" aria-hidden="true" />
                <span>Includes I-40 Exit 325 route, Cherrys Rd turnoff, and parcel polygons</span>
              </span>
              <span className="font-mono-tabular text-ink-muted">WGS84 · Sec 29 T18N R27E</span>
            </div>
          </div>

          {/* Concise Driving Directions & Road Disclosure */}
          <div className="lg:col-span-5 space-y-4">
            <div className="desert-card p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Navigation className="w-4 h-4 text-sunset" aria-hidden="true" />
                <h3 className="text-base font-semibold text-ink">
                  Approach from Chambers, AZ (~22.6 mi / ~33 min)
                </h3>
              </div>

              <ol className="space-y-4">
                {DRIVING_STEPS.map((item) => (
                  <li key={item.step} className="flex gap-3.5">
                    <span className="font-mono-tabular text-xs font-semibold shrink-0 w-7 h-7 rounded-full bg-sunset-soft text-sunset-soft-ink flex items-center justify-center mt-0.5">
                      {item.step}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{item.leg}</p>
                      <p className="mt-0.5 text-sm text-ink-secondary leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-5 pt-4 border-t border-line rounded-xl bg-sunset-soft/55 p-3.5 text-xs sm:text-sm text-ink-secondary">
                <strong className="font-semibold text-ink">Access note:</strong>{' '}
                After the 7.8-mile paved highway leg to I-40 Exit 325, the final 14.8 miles use
                unmaintained dirt/sand ranch and subdivision roads. High-clearance or 4WD and the
                offline <code className="font-mono-tabular text-xs">.KML</code> route file are
                recommended.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
