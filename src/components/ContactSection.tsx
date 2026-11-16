import { useId, useState, type FormEvent } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { CONTACT_EMAIL } from '../data/propertyData';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setStatusMessage(`Copied ${CONTACT_EMAIL} to clipboard`);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setStatusMessage(`Owner email address: ${CONTACT_EMAIL}`);
    }
  };

  const handleComposeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent('Inquiry: Cedar Hills Unit 5 Lots 85 & 86 (Apache County, AZ)');
    const lines = [
      `Name: ${buyerName || '(not provided)'}`,
      `Reply Email: ${buyerEmail || '(see sender)'}`,
      `Preferred Closing Method: ${closingPreference}`,
      '',
      note,
    ];
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatusMessage(`Opening email draft to ${CONTACT_EMAIL}`);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-14 sm:py-20 border-t border-[var(--border-subtle)]"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="desert-card rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: Direct Owner Contact */}
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-sunset)]">
                Direct From Owner
              </p>
              <h2 id="contact-heading" className="display-section mt-1.5 text-[var(--text-primary)]">
                Inquire or Purchase Lots 85 &amp; 86
              </h2>
              <p className="mt-3 text-base text-[var(--text-secondary)] prose-copy">
                Email directly for purchase agreements, escrow setup, or any questions after reviewing
                the county packet.
              </p>

              <div className="mt-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 sm:p-5">
                <p className="text-xs uppercase tracking-wider font-semibold text-[var(--text-muted)]">
                  Owner Contact Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Cedar Hills Unit 5 Lots 85 & 86 Inquiry')}`}
                  className="mt-1.5 block font-mono-tabular text-[0.875rem] sm:text-base font-medium text-[var(--accent-sunset)] hover:underline [overflow-wrap:anywhere]"
                >
                  {CONTACT_EMAIL}
                </a>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Cedar Hills Unit 5 Lots 85 & 86 Inquiry')}`}
                    className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-xl bg-[var(--accent-sunset)] text-[var(--accent-sunset-ink)] text-sm font-semibold hover:bg-[var(--accent-sunset-hover)] transition-colors"
                  >
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    <span>Email Owner</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[var(--accent-juniper)]" aria-hidden="true" />
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
              className="lg:col-span-7 space-y-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-5 sm:p-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={nameId} className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                    Your Name
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    autoComplete="name"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full min-h-10 px-3.5 py-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label htmlFor={emailId} className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
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
                    className="w-full min-h-10 px-3.5 py-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={closingId} className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Preferred Closing Option
                </label>
                <select
                  id={closingId}
                  value={closingPreference}
                  onChange={(e) => setClosingPreference(e.target.value)}
                  className="w-full min-h-10 px-3.5 py-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)]"
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
                <label htmlFor={noteId} className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                  Message
                </label>
                <textarea
                  id={noteId}
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <p className="text-xs text-[var(--text-muted)]">
                  Opens your default email client pre-addressed to{' '}
                  <span className="font-mono-tabular">{CONTACT_EMAIL}</span>.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 min-h-10 px-5 py-2 rounded-xl bg-[var(--accent-juniper)] text-[var(--accent-juniper-ink)] text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
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
