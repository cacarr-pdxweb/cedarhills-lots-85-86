import { ChevronDown, ExternalLink, FileCheck2, FolderOpen, ShieldCheck } from 'lucide-react';
import { DISCLOSURE_ITEMS, FAQ_ITEMS, LINKS } from '../data/propertyData';

export function DisclosuresAndFaq() {
  return (
    <section
      id="disclosures"
      aria-labelledby="disclosures-heading"
      className="py-14 sm:py-20 border-t border-line"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: 14-File Disclosure Packet & Closing Options */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sunset">
              Verified County Records
            </p>
            <h2 id="disclosures-heading" className="display-section mt-1.5 text-ink">
              14-File Buyer Disclosure Packet
            </h2>
            <p className="mt-3 text-base text-ink-secondary prose-copy">
              Inspect every official title, tax, assessor, and survey record immediately—no gatekeeping
              or sign-up required.
            </p>

            <div className="mt-6 desert-card p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-line">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-juniper-soft text-juniper-soft-ink flex items-center justify-center shrink-0">
                    <FolderOpen className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-ink">
                      Complete Digital Packet (Google Drive)
                    </h3>
                    <p className="text-xs text-ink-muted">
                      Deed #2017-000363 · Plat 1-46 · Oct 2026 Tax Receipt · GIS &amp; KML
                    </p>
                  </div>
                </div>
                <a
                  href={LINKS.disclosureDrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-xl bg-sunset text-sunset-ink text-sm font-semibold hover:bg-sunset-hover transition-colors"
                >
                  <span>Open Google Drive Packet</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  <span className="visually-hidden">(opens Google Drive folder in new tab)</span>
                </a>
              </div>

              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {DISCLOSURE_ITEMS.map((item) => (
                  <li
                    key={item.file}
                    className="flex items-start gap-2.5 rounded-xl bg-canvas border border-line p-3"
                  >
                    <FileCheck2
                      className="w-4 h-4 text-juniper shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink">{item.file}</p>
                      <p className="mt-0.5 text-xs text-ink-muted leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-line flex items-start gap-3">
                <ShieldCheck
                  className="w-5 h-5 text-juniper shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  <strong className="font-semibold text-ink">
                    Straightforward Closing:
                  </strong>{' '}
                  Conveyed by notarized Arizona Statutory Warranty Deed &amp; Form 82162 Affidavit
                  ($17 Apache County recording fee). Close via Escrow.com, direct wire/cashier’s
                  check, or a licensed Arizona title agency at buyer’s option.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Native <details> Exclusive FAQ */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-juniper">
              Due Diligence
            </p>
            <h2 className="display-section mt-1.5 text-ink">
              Common Buyer Questions
            </h2>

            <div className="mt-6 space-y-3">
              {FAQ_ITEMS.map((item, idx) => (
                <details
                  key={item.id}
                  name="buyer-faq"
                  open={idx === 0}
                  className="faq-item desert-card px-5 py-4"
                >
                  <summary className="flex items-center justify-between gap-3 font-semibold text-sm sm:text-base text-ink">
                    <span>{item.question}</span>
                    <ChevronDown
                      className="faq-chevron w-4 h-4 text-ink-muted shrink-0 transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 pt-3 border-t border-line text-sm text-ink-secondary leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
