import { useState } from 'react';
import { Check, Compass, Copy, ExternalLink } from 'lucide-react';
import { GPS_POINTS, type GpsPoint } from '../data/propertyData';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

const PARCEL_LOTS = [
  {
    id: 'lot-85',
    x: 80,
    centerX: 150,
    label: 'Lot 85 (West)',
    apn: 'APN 206-07-068',
    fillOpacity: '12%',
  },
  {
    id: 'lot-86',
    x: 220,
    centerX: 290,
    label: 'Lot 86 (East)',
    apn: 'APN 206-07-069',
    fillOpacity: '7%',
  },
] as const;

const PLOT_PINS = GPS_POINTS.filter((p) => p.svgX !== undefined && p.svgY !== undefined);

export function ParcelDiagram() {
  const [selectedId, setSelectedId] = useState<string>('center');
  const { copiedKey, statusMessage, copy } = useCopyToClipboard();

  const activePoint = GPS_POINTS.find((p) => p.id === selectedId) ?? GPS_POINTS[0];

  const handleCopy = (point: GpsPoint) => {
    const coord = `${point.lat}, ${point.lon}`;
    setSelectedId(point.id);
    void copy(
      coord,
      point.id,
      `Copied coordinates ${coord} for ${point.label}`,
      `Coordinates for ${point.label}: ${coord}`,
    );
  };

  return (
    <div className="desert-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-juniper" aria-hidden="true" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-secondary">
            Survey Layout &amp; KML Waypoints
          </h3>
        </div>
        <span className="text-xs font-mono-tabular px-2.5 py-1 rounded-full bg-juniper-soft text-juniper-soft-ink font-medium">
          660′ × 660′ · 10.00 Ac
        </span>
      </div>

      {/* Architectural SVG Schematic */}
      <div className="relative rounded-xl border border-line bg-subtle/65 p-3 sm:p-4">
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
              fontWeight="500"
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

          {/* Side-by-side 5-Acre Lots */}
          {PARCEL_LOTS.map((lot) => (
            <g key={lot.id}>
              <rect
                x={lot.x}
                y="65"
                width="140"
                height="200"
                fill={`color-mix(in oklab, var(--accent-juniper) ${lot.fillOpacity}, var(--bg-surface))`}
                stroke="var(--accent-juniper)"
                strokeWidth="2"
              />
              <text
                x={lot.centerX}
                y="138"
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fontFamily="var(--font-serif)"
                fill="var(--text-primary)"
              >
                {lot.label}
              </text>
              <text
                x={lot.centerX}
                y="155"
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-secondary)"
              >
                5.00 Acres
              </text>
              <text
                x={lot.centerX}
                y="172"
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-muted)"
              >
                {lot.apn}
              </text>
              <text
                x={lot.centerX}
                y="248"
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="var(--font-mono)"
                fill="var(--text-muted)"
              >
                330′ E–W
              </text>
            </g>
          ))}

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
          {PLOT_PINS.map((point) => {
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
        <div className="mt-3 pt-3 border-t border-line flex flex-wrap gap-1.5" role="group" aria-label="Select a GPS waypoint">
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
                    ? 'bg-juniper text-juniper-ink'
                    : 'bg-surface text-ink-secondary border border-line hover:border-line-strong'
                }`}
              >
                {point.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Waypoint Detail + Copy & Map Actions */}
      <div className="mt-4 rounded-xl border border-line bg-canvas p-3.5 sm:p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink">{activePoint.label}</p>
            <p className="mt-0.5 font-mono-tabular text-sm text-sunset font-medium">
              {activePoint.lat}, {activePoint.lon}
            </p>
            <p className="mt-1 text-xs text-ink-muted">{activePoint.note}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleCopy(activePoint)}
              className="inline-flex items-center gap-1.5 min-h-9 px-3 py-1.5 rounded-lg border border-line-strong bg-surface text-xs font-medium text-ink hover:bg-subtle transition-colors cursor-pointer"
            >
              {copiedKey === activePoint.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-juniper" aria-hidden="true" />
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
              className="inline-flex items-center gap-1.5 min-h-9 px-3 py-1.5 rounded-lg bg-juniper text-juniper-ink text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <span>Pin</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="visually-hidden">(opens Google Maps in new tab)</span>
            </a>
          </div>
        </div>
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">
        {statusMessage}
      </p>
    </div>
  );
}
