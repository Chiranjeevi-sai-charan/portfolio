import React from 'react';
import { colors, spacing, borderRadius, typography, chartPalette } from '../../../styles/sage/tokens';

/**
 * Generated from the "Most Asked Topics" frame in the Sage Figma file via
 * Figma's MCP (get_design_context), then adapted from the raw React+Tailwind
 * reference output to this project's actual convention: inline style objects
 * sourced from tokens.ts instead of Tailwind classes.
 */

interface Topic {
  name: string;
  value: number;
  color: string;
}

const TOPICS: Topic[] = [
  { name: 'Vacation & Time Off', value: 29, color: chartPalette.blue },
  { name: 'Health Insurance', value: 21, color: chartPalette.green },
  { name: 'Sick Leave', value: 18, color: chartPalette.amber },
  { name: 'Remote Work', value: 12, color: chartPalette.cyan },
  { name: 'Benefits', value: 10, color: chartPalette.purple },
];

export const FigmaGeneratedTopicsChart: React.FC = () => {
  const maxValue = Math.max(...TOPICS.map((t) => t.value));

  return (
    <div
      style={{
        backgroundColor: colors['neutral-white'],
        border: `1px solid ${colors['neutral-200']}`,
        borderRadius: borderRadius.lg,
        padding: `${spacing.lg} ${spacing.xl}`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.lg,
      }}
    >
      <p
        style={{
          fontSize: typography.fontSize['h4'],
          fontWeight: typography.fontWeight.bold,
          color: colors['neutral-900'],
          margin: 0,
        }}
      >
        Most Asked Topics
      </p>

      {TOPICS.map((topic) => (
        <div
          key={topic.name}
          style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}
        >
          <span
            style={{
              width: 140,
              fontSize: typography.fontSize['body-sm'],
              color: colors['neutral-700'],
            }}
          >
            {topic.name}
          </span>
          <div
            style={{
              width: 280,
              height: 12,
              borderRadius: borderRadius.sm,
              backgroundColor: colors['neutral-100'],
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(topic.value / maxValue) * 100}%`,
                height: '100%',
                borderRadius: borderRadius.sm,
                backgroundColor: topic.color,
              }}
            />
          </div>
          <span
            style={{
              fontSize: typography.fontSize['body-sm'],
              color: colors['neutral-700'],
            }}
          >
            {topic.value}
          </span>
        </div>
      ))}
    </div>
  );
};

FigmaGeneratedTopicsChart.displayName = 'FigmaGeneratedTopicsChart';
