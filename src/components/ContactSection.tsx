import { useId, useState, type FormEvent } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { buildMailtoHref, CONTACT_EMAIL } from '../data/propertyData';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

const DIRECT_INQUIRY_HREF = buildMailtoHref('Cedar Hills Unit 5 Lots 85 & 86 Inquiry');

export function ContactSection() {
  const { copiedKey, statusMessage, copy, announce } = useCopyToClipboard(2400);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [closingPreference, setClosingPreference] = useState('Escrow.com');
  const [note, setNote] = useState(
    'Hi, I reviewed the disclosure packet for Cedar Hills Unit 5 Lots 85 & 86 ($4,950 cash) and would like to move forward or ask a quick question.',
  );

  const nameId = useId();
  const emailId = useId();
  const closingId = useId();
  const noteId = useId();

  const handleCopyEmail = () => {
    void copy(
      CONTACT_EMAIL,
      'email',
      `Copied ${CONTACT_EMAIL} to clipboard`,
      `Owner email address: ${CONTACT_EMAIL}`,
    );
  };

  const handleComposeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lines = [
      `Name: ${buyerName || '(not provided)'}`,
      `Reply Email: ${buyerEmail || '(see sender)'}`,
      `Preferred Closing Method: ${closingPreference}`,
      '',
      note,
    ];
    window.location.href = buildMailtoHref(
      'Inquiry: Cedar Hills Unit 5 Lots 85 & 86 (Apache County, AZ)',
      lines.join('\n'),
    );
    announce(`Opening email draft to ${CONTACT_EMAIL}`);
  };

  const copied = copiedKey === 'email';

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-14 sm:py-20 border-t border-line"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="desert-card rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Direct Owner Contact */}
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sunset">
                Direct From Owner
              </p>
              <h2 id="contact-heading" className="display-section mt-1.5 text-ink">
                Inquire or Purchase Lots 85 &amp; 86
              </h2>
              <p className="mt-3 text-base text-ink-secondary prose-copy">
                Email directly for purchase agreements, escrow setup, or any questions after reviewing
                the county packet.
              </p>

              <div className="mt-6 rounded-2xl border border-line bg-canvas p-4 sm:p-5">
                <p className="text-xs uppercase tracking-wider font-semibold text-ink-muted">
                  Owner Contact Email
                </p>
                <a
                  href={DIRECT_INQUIRY_HREF}
                  className="mt-1.5 block font-mono-tabular text-[0.875rem] sm:text-base font-medium text-sunset hover:underline [overflow-wrap:anywhere]"
                >
                  {CONTACT_EMAIL}
                </a>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <a
                    href={DIRECT_INQUIRY_HREF}
                    className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-xl bg-sunset text-sunset-ink text-sm font-semibold hover:bg-sunset-hover transition-colors"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Email Owner</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-xl border border-line-strong bg-surface text-sm font-medium text-ink hover:bg-subtle transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-juniper" aria-hidden="true" />
                        <span>Copied Email</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Lightweight Mailto Draft Builder */}
            <form
              onSubmit={handleComposeSubmit}
              className="lg:col-span-7 space-y-4 rounded-2xl border border-line bg-canvas p-5 sm:p-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={nameId} className="block text-xs font-semibold text-ink-secondary mb-1.5">
                    Your Name
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    autoComplete="name"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full min-h-10 px-3.5 py-2 rounded-xl border border-line-strong bg-surface text-sm text-ink"
                  />
                </div>
                <div>
                  <label htmlFor={emailId} className="block text-xs font-semibold text-ink-secondary mb-1.5">
                    Your Email
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full min-h-10 px-3.5 py-2 rounded-xl border border-line-strong bg-surface text-sm text-ink"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={closingId} className="block text-xs font-semibold text-ink-secondary mb-1.5">
                  Preferred Closing Option
                </label>
                <select
                  id={closingId}
                  value={closingPreference}
                  onChange={(e) => setClosingPreference(e.target.value)}
                  className="w-full min-h-10 px-3.5 py-2 rounded-xl border border-line-strong bg-surface text-sm text-ink"
                >
                  <option value="Escrow.com">Escrow.com Online Settlement</option>
                  <option value="Direct Cash / Wire + Recorded Deed">
                    Direct Cash / Wire with Recorded Warranty Deed
                  </option>
                  <option value="Licensed Arizona Title Agency (Buyer Expense)">
                    Licensed Arizona Title Agency (Buyer’s Expense)
                  </option>
                  <option value="General Property Question">Just Asking a Question</option>
                </select>
              </div>

              <div>
                <label htmlFor={noteId} className="block text-xs font-semibold text-ink-secondary mb-1.5">
                  Message
                </label>
                <textarea
                  id={noteId}
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-line-strong bg-surface text-sm text-ink"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <p className="text-xs text-ink-muted">
                  Opens your default email client pre-addressed to{' '}
                  <span className="font-mono-tabular">{CONTACT_EMAIL}</span>.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 min-h-10 px-5 py-2 rounded-xl bg-juniper text-juniper-ink text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Compose Email Draft</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">
        {statusMessage}
      </p>
    </section>
  );
}
