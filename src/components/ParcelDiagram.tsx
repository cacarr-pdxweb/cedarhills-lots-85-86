import { useState } from 'react';
import { Check, Copy, ExternalLink, Compass } from 'lucide-react';
import { GPS_POINTS, type GpsPoint } from '../data/propertyData';

export function ParcelDiagram() {
  const [selectedId, setSelectedId] = useState<string>('center');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [liveStatus, setLiveStatus] = useState<string>('');

  const activePoint = GPS_POINTS.find((p) => p.id === selectedId) ?? GPS_POINTS[0];

  const handleCopy = async (point: GpsPoint) => {
    const coord = `${point.lat}, ${point.lon}`;
    try {
      await navigator.clipboard.writeText(coord);
      setCopiedId(point.id);
      setSelectedId(point.id);
      setLiveStatus(`Copied coordinates ${coord} for ${point.label}`);
      window.setTimeout(() => setCopiedId((prev) => (prev === point.id ? null : prev)), 2200);
    } catch {
      setLiveStatus(`Coordinates for ${point.label}: ${coord}`);
    }
  };

  return (
    <div className="desert-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[var(--accent-juniper)]" aria-hidden="true" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Survey Layout &amp; KML Waypoints
          </h3>
        </div>
        <span className="text-xs font-mono-tabular px-2.5 py-1 rounded-full bg-[var(--accent-juniper-soft)] text-[var(--accent-juniper-soft-ink)] font-medium">
          660′ × 660′ · 10.00 Ac
        </span>
      </div>

      {/* Architectural SVG Schematic */}
      <div className="relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)]/65 p-3 sm:p-4">
        <svg
          viewBox="0 0 440 316"
          className="block w-full h-auto"
          role="img"
          aria-label="Schematic survey diagram showing Lot 85 West and Lot 86 East bordered by the western dirt road and northern 50-foot platted easement"
        >
          {/* Northern 50-ft Platted Easement */}
          <rect
            x="80"
            y="34"
            width="280"
            height="31"
            fill="color-mix(in oklab, var(--accent-horizon) 18%, transparent)"
            stroke="var(--accent-sunset)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x="220"
            y="49.5"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="8.75"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            50′ Platted Road &amp; Utility Easement · Plat 1-46
          </text>

          {/* Western N-S Physical Dirt Road */}
          <rect
            x="38"
            y="34"
            width="42"
            height="245"
            fill="color-mix(in oklab, var(--accent-sunset) 14%, transparent)"
            stroke="var(--accent-sunset)"
            strokeWidth="1"
          />
          <g transform="translate(59, 156.5) rotate(-90)">
            <text
              x="0"
              y="-6.5"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="9"
              fontWeight="600"
              fontFamily="var(--font-mono)"
              fill="var(--accent-sunset-soft-ink)"
            >
              N–S Dirt Road Frontage
            </text>
            <text
              x="0"
              y="7"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="8"
              fontFamily="var(--font-mono)"
              fill="var(--text-secondary)"
            >
              1.32 mi S of Cherrys Rd
            </text>
          </g>

          {/* Lot 85 (West 5 Acres) */}
          <rect
            x="80"
            y="65"
            width="140"
            height="200"
            fill="color-mix(in oklab, var(--accent-juniper) 12%, var(--bg-surface))"
            stroke="var(--accent-juniper)"
            strokeWidth="2"
          />
          {/* Lot 86 (East 5 Acres) */}
          <rect
            x="220"
            y="65"
            width="140"
            height="200"
            fill="color-mix(in oklab, var(--accent-juniper) 7%, var(--bg-surface))"
            stroke="var(--accent-juniper)"
            strokeWidth="2"
          />

          {/* Lot Labels */}
          <text
            x="150"
            y="138"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fontFamily="var(--font-serif)"
            fill="var(--text-primary)"
          >
            Lot 85 (West)
          </text>
          <text
            x="150"
            y="155"
            textAnchor="middle"
            fontSize="10.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            5.00 Acres
          </text>
          <text
            x="150"
            y="172"
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-muted)"
          >
            APN 206-07-068
          </text>
          <text
            x="150"
            y="248"
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-muted)"
          >
            330′ E–W
          </text>

          <text
            x="290"
            y="138"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fontFamily="var(--font-serif)"
            fill="var(--text-primary)"
          >
            Lot 86 (East)
          </text>
          <text
            x="290"
            y="155"
            textAnchor="middle"
            fontSize="10.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            5.00 Acres
          </text>
          <text
            x="290"
            y="172"
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-muted)"
          >
            APN 206-07-069
          </text>
          <text
            x="290"
            y="248"
            textAnchor="middle"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-muted)"
          >
            330′ E–W
          </text>

          {/* East 660' dimension */}
          <text
            x="378"
            y="165"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-muted)"
            transform="rotate(90 378 165)"
          >
            660.00′ N–S
          </text>

          {/* Neighboring lot context */}
          <text
            x="220"
            y="297"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="9.5"
            fontFamily="var(--font-mono)"
            fill="var(--text-muted)"
          >
            South: Lots 108 &amp; 107 · East: Lot 87 · Sec 29 T18N R27E
          </text>

          {/* Pin indicators */}
          {GPS_POINTS.filter((p) => p.svgX !== undefined && p.svgY !== undefined).map((point) => {
            const isSelected = point.id === selectedId;
            return (
              <g key={point.id} transform={`translate(${point.svgX}, ${point.svgY})`}>
                <circle
                  r={isSelected ? 7 : 5}
                  fill={isSelected ? 'var(--accent-sunset)' : 'var(--bg-surface)'}
                  stroke={isSelected ? 'var(--bg-surface)' : 'var(--accent-sunset)'}
                  strokeWidth="2.5"
                />
              </g>
            );
          })}
        </svg>

        {/* Interactive Waypoint Selector Bar */}
        <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5" role="group" aria-label="Select a GPS waypoint">
          {GPS_POINTS.map((point) => {
            const active = point.id === selectedId;
            return (
              <button
                key={point.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedId(point.id)}
                className={`min-h-8 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-[var(--accent-juniper)] text-[var(--accent-juniper-ink)]'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                }`}
              >
                {point.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Waypoint Detail + Copy & Map Actions */}
      <div className="mt-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-3.5 sm:p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--text-primary)]">{activePoint.label}</p>
            <p className="mt-0.5 font-mono-tabular text-sm text-[var(--accent-sunset)] font-medium">
              {activePoint.lat}, {activePoint.lon}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{activePoint.note}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleCopy(activePoint)}
              className="inline-flex items-center gap-1.5 min-h-9 px-3 py-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
            >
              {copiedId === activePoint.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[var(--accent-juniper)]" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy GPS</span>
                </>
              )}
            </button>
            <a
              href={`https://maps.google.com/?q=${activePoint.lat},${activePoint.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-9 px-3 py-1.5 rounded-lg bg-[var(--accent-juniper)] text-[var(--accent-juniper-ink)] text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <span>Pin</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="visually-hidden">(opens Google Maps in new tab)</span>
            </a>
          </div>
        </div>
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">
        {liveStatus}
      </p>
    </div>
  );
}
