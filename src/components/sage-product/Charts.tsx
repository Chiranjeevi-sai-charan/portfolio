import React from 'react';
import { colors, typography, spacing, borderRadius } from '../../styles/sage/tokens';

/** Default pastel accent used when a chart isn't given an explicit color/palette */
const PASTEL_DEFAULT = '#8FB3E8';

/**
 * Lightweight, dependency-free SVG chart primitives for the Analytics dashboard.
 * Kept intentionally simple (no charting library) to match the rest of the
 * Sage product's zero-dependency component style.
 */

// ============================================================================
// Bar Chart (horizontal)
// ============================================================================

export interface BarDatum {
  label: string;
  value: number;
  color?: string;
}

export const BarChart: React.FC<{ data: BarDatum[]; defaultColor?: string }> = ({
  data,
  defaultColor = PASTEL_DEFAULT,
}) => {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
      {data.map((d) => (
        <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <div
            style={{
              width: '140px',
              flexShrink: 0,
              fontSize: typography.fontSize['body-xs'],
              color: colors['neutral-700'],
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={d.label}
          >
            {d.label}
          </div>
          <div style={{ flex: 1, backgroundColor: colors['neutral-100'], borderRadius: '4px', height: '18px', position: 'relative' }}>
            <div
              style={{
                width: `${Math.max(2, (d.value / max) * 100)}%`,
                height: '100%',
                borderRadius: '4px',
                backgroundColor: d.color || defaultColor,
                transition: 'width 0.3s ease',
              }}
            />
          </div>
          <div style={{ width: '28px', flexShrink: 0, textAlign: 'right', fontSize: typography.fontSize['body-xs'], fontWeight: 600, color: colors['neutral-900'] }}>
            {d.value}
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// Donut / Pie Chart
// ============================================================================

export interface DonutDatum {
  label: string;
  value: number;
  color: string;
}

export const DonutChart: React.FC<{ data: DonutDatum[]; size?: number; strokeWidth?: number }> = ({
  data,
  size = 140,
  strokeWidth = 22,
}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  let cumulative = 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {total === 0 ? (
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={colors['neutral-200']} strokeWidth={strokeWidth} />
          ) : (
            data.map((d) => {
              const fraction = d.value / total;
              const dash = fraction * circumference;
              const offset = -cumulative * circumference;
              cumulative += fraction;
              return (
                <circle
                  key={d.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke={d.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={offset}
                />
              );
            })
          )}
        </g>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fontSize={typography.fontSize['h4']} fontWeight={700} fill={colors['neutral-900']}>
          {total}
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
        {data.map((d) => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, fontSize: typography.fontSize['body-xs'], color: colors['neutral-700'] }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: d.color, flexShrink: 0 }} />
            {d.label}
            <span style={{ color: colors['neutral-400'] }}>
              ({total > 0 ? Math.round((d.value / total) * 100) : 0}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// Radar Chart
// ============================================================================

export interface RadarDatum {
  label: string;
  value: number; // 0-100
}

export const RadarChart: React.FC<{ data: RadarDatum[]; size?: number; color?: string }> = ({
  data,
  size = 240,
  color = PASTEL_DEFAULT,
}) => {
  const center = size / 2;
  const maxR = size / 2 - 36;
  const levels = 4;
  const n = data.length;

  const pointFor = (i: number, value: number) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2;
    const r = (Math.max(0, Math.min(100, value)) / 100) * maxR;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  };

  const dataPoints = data.map((d, i) => pointFor(i, d.value));
  const polygonPoints = dataPoints.map((p) => p.join(',')).join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid rings */}
      {Array.from({ length: levels }, (_, lvl) => {
        const ringR = (maxR * (lvl + 1)) / levels;
        const ringPoints = data
          .map((_, i) => {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2;
            return [center + ringR * Math.cos(angle), center + ringR * Math.sin(angle)].join(',');
          })
          .join(' ');
        return <polygon key={lvl} points={ringPoints} fill="none" stroke={colors['neutral-200']} strokeWidth={1} />;
      })}
      {/* Axis lines + labels */}
      {data.map((d, i) => {
        const angle = (2 * Math.PI * i) / n - Math.PI / 2;
        const x2 = center + maxR * Math.cos(angle);
        const y2 = center + maxR * Math.sin(angle);
        const lx = center + (maxR + 20) * Math.cos(angle);
        const ly = center + (maxR + 20) * Math.sin(angle);
        return (
          <g key={d.label}>
            <line x1={center} y1={center} x2={x2} y2={y2} stroke={colors['neutral-200']} strokeWidth={1} />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={typography.fontSize['body-xs']}
              fill={colors['neutral-600']}
            >
              {d.label}
            </text>
          </g>
        );
      })}
      {/* Data polygon */}
      <polygon points={polygonPoints} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={2} />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3} fill={color} />
      ))}
    </svg>
  );
};

// ============================================================================
// Sparkline (simple line chart for activity over time)
// ============================================================================

export const Sparkline: React.FC<{
  data: number[];
  /** Optional per-point label (e.g. a date string) used in hover tooltips and the axis captions */
  labels?: string[];
  width?: number;
  height?: number;
  color?: string;
  /** Unit label appended after the value in tooltips, e.g. "questions" */
  unitLabel?: string;
}> = ({ data, labels, width = 640, height = 100, color = PASTEL_DEFAULT, unitLabel = '' }) => {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const max = Math.max(1, ...data);
  const stepX = data.length > 1 ? width / (data.length - 1) : width;
  const points = data.map((v, i) => [i * stepX, height - (v / max) * (height - 16) - 8]);
  const linePoints = points.map((p) => p.join(',')).join(' ');
  const areaPoints = `0,${height} ${linePoints} ${width},${height}`;

  const yAxisStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height,
    paddingRight: '6px',
    flexShrink: 0,
    fontSize: typography.fontSize['body-xs'],
    color: colors['neutral-400'],
  };

  const hoveredPoint = hovered !== null ? points[hovered] : null;

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={yAxisStyles}>
          <span>{max}</span>
          <span>{Math.round(max / 2)}</span>
          <span>0</span>
        </div>
        <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
          {hoveredPoint && (
            <div
              style={{
                position: 'absolute',
                left: `${(hoveredPoint[0] / width) * 100}%`,
                top: `${(hoveredPoint[1] / height) * 100}%`,
                transform: 'translate(-50%, -130%)',
                backgroundColor: colors['neutral-900'],
                color: colors['neutral-white'],
                padding: '4px 8px',
                borderRadius: borderRadius.sm,
                fontSize: typography.fontSize['body-xs'],
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              {(labels?.[hovered!] ?? `Day ${hovered! + 1}`)}: {data[hovered!]} {unitLabel}
            </div>
          )}
          <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ overflow: 'visible', display: 'block' }}>
            <polygon points={areaPoints} fill={color} fillOpacity={0.08} />
            <polyline points={linePoints} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {points.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r={hovered === i ? 4 : 2.5} fill={color} />
            ))}
            {/* Larger invisible hit targets — the visible dots are too small to hover reliably */}
            {points.map((p, i) => (
              <circle
                key={`hit-${i}`}
                cx={p[0]}
                cy={p[1]}
                r={10}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((prev) => (prev === i ? null : prev))}
              />
            ))}
          </svg>
        </div>
      </div>
      {labels && labels.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: typography.fontSize['body-xs'], color: colors['neutral-400'], marginTop: '4px', paddingLeft: '24px' }}>
          <span>{labels[0]}</span>
          <span>{labels[labels.length - 1]}</span>
        </div>
      )}
    </div>
  );
};
