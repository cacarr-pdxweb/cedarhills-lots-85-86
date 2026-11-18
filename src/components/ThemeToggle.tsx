import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type ColorScheme = 'light' | 'dark';

const STORAGE_KEY = 'color-scheme';

function getSystemScheme(): ColorScheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredScheme(): ColorScheme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function applyMetaScheme(value: ColorScheme | 'light dark') {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  if (meta) {
    meta.content = value;
  }
}

export function ThemeToggle() {
  const [scheme, setScheme] = useState<ColorScheme>(() => getStoredScheme() ?? getSystemScheme());
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const onMediaChange = (event: MediaQueryListEvent) => {
      if (getStoredScheme() === null) {
        setScheme(event.matches ? 'dark' : 'light');
      }
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      const stored = getStoredScheme();
      applyMetaScheme(stored ?? 'light dark');
      setScheme(stored ?? getSystemScheme());
    };

    mediaQuery.addEventListener('change', onMediaChange);
    window.addEventListener('storage', onStorage);
    return () => {
      mediaQuery.removeEventListener('change', onMediaChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const selectScheme = (target: ColorScheme) => {
    const systemScheme = getSystemScheme();
    try {
      if (target !== systemScheme) {
        localStorage.setItem(STORAGE_KEY, target);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Storage unavailable; still apply the meta override for this session.
    }

    applyMetaScheme(target !== systemScheme ? target : 'light dark');
    setScheme(target);
    setAnnouncement(`Switched to ${target} mode`);
  };

  return (
    <div className="flex items-center">
      <div
        role="group"
        aria-label="Color theme"
        className="inline-flex items-center p-0.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
      >
        <button
          type="button"
          aria-pressed={scheme === 'light'}
          onClick={() => selectScheme('light')}
          className={`inline-flex items-center justify-center gap-1.5 min-h-8 min-w-8 sm:min-w-0 px-2 sm:px-2.5 py-1 rounded-[0.625rem] text-xs font-semibold transition-colors cursor-pointer ${
            scheme === 'light'
              ? 'bg-[var(--accent-juniper)] text-[var(--accent-juniper-ink)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Sun className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Light</span>
          <span className="sm:hidden visually-hidden">Light mode</span>
        </button>

        <button
          type="button"
          aria-pressed={scheme === 'dark'}
          onClick={() => selectScheme('dark')}
          className={`inline-flex items-center justify-center gap-1.5 min-h-8 min-w-8 sm:min-w-0 px-2 sm:px-2.5 py-1 rounded-[0.625rem] text-xs font-semibold transition-colors cursor-pointer ${
            scheme === 'dark'
              ? 'bg-[var(--accent-juniper)] text-[var(--accent-juniper-ink)]'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Moon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Dark</span>
          <span className="sm:hidden visually-hidden">Dark mode</span>
        </button>
      </div>

      <span className="visually-hidden" role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
