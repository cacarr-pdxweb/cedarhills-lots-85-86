import { ChevronDown, ExternalLink, FileCheck2, FolderOpen, ShieldCheck } from 'lucide-react';
import { DISCLOSURE_ITEMS, FAQ_ITEMS, LINKS } from '../data/propertyData';

export function DisclosuresAndFaq() {
  return (
    <section
      id="disclosures"
      aria-labelledby="disclosures-heading"
      className="py-14 sm:py-20 border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: 14-File Disclosure Packet & Closing Options */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-sunset)]">
              Verified County Records
            </p>
            <h2 id="disclosures-heading" className="display-section mt-1.5 text-[var(--text-primary)]">
              14-File Buyer Disclosure Packet
            </h2>
            <p className="mt-3 text-base text-[var(--text-secondary)] prose-copy">
              Inspect every official title, tax, assessor, and survey record immediately—no gatekeeping
              or sign-up required.
            </p>

            <div className="mt-6 desert-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent-juniper-soft)] text-[var(--accent-juniper-soft-ink)] flex items-center justify-center shrink-0">
                    <FolderOpen className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      Complete Digital Packet (Google Drive)
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      Deed #2017-000363 · Plat 1-46 · Oct 2026 Tax Receipt · GIS &amp; KML
                    </p>
                  </div>
                </div>
                <a
                  href={LINKS.disclosureDrive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-xl bg-[var(--accent-sunset)] text-[var(--accent-sunset-ink)] text-sm font-semibold hover:bg-[var(--accent-sunset-hover)] transition-colors"
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
                    className="flex items-start gap-2.5 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] p-3"
                  >
                    <FileCheck2
                      className="w-4 h-4 text-[var(--accent-juniper)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{item.file}</p>
                      <p className="mt-0.5 text-xs text-[var(--text-muted)] leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-start gap-3">
                <ShieldCheck
                  className="w-5 h-5 text-[var(--accent-juniper)] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  <strong className="font-semibold text-[var(--text-primary)]">
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
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-juniper)]">
              Due Diligence
            </p>
            <h2 className="display-section mt-1.5 text-[var(--text-primary)]">
              Common Buyer Questions
            </h2>

            <div className="mt-6 space-y-3">
              {FAQ_ITEMS.map((item, idx) => (
                <details
                  key={item.id}
                  name="buyer-faq"
                  open={idx === 0}
                  className="faq-item desert-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-4"
                >
                  <summary className="flex items-center justify-between gap-3 font-semibold text-sm sm:text-base text-[var(--text-primary)]">
                    <span>{item.question}</span>
                    <ChevronDown
                      className="faq-chevron w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-200"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 pt-3 border-t border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] leading-relaxed">
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
