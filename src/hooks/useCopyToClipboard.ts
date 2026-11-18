import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Copies text to the clipboard with transient confirmation state, live-region
 * status updates, and automatic timeout cleanup on rapid clicks or unmount.
 */
export function useCopyToClipboard(resetMs = 2200) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const timerRef = useRef<number | null>(null);

  const clearPendingTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearPendingTimer, [clearPendingTimer]);

  const copy = useCallback(
    async (text: string, key: string, successMessage: string, fallbackMessage: string) => {
      clearPendingTimer();
      try {
        await navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setStatusMessage(successMessage);
        timerRef.current = window.setTimeout(() => {
          setCopiedKey((prev) => (prev === key ? null : prev));
          timerRef.current = null;
        }, resetMs);
      } catch {
        setStatusMessage(fallbackMessage);
      }
    },
    [clearPendingTimer, resetMs],
  );

  const announce = useCallback((message: string) => {
    setStatusMessage(message);
  }, []);

  return { copiedKey, statusMessage, copy, announce };
}
