import React from 'react';
import { colors, spacing, borderRadius, typography, chartPalette } from '../../../styles/sage/tokens';

/**
 * Generated from the "Panel — Most Asked Topics" frame in the Sage Figma
 * file via Figma's MCP (get_design_context), then adapted from the raw
 * React+Tailwind reference output to this project's actual convention:
 * inline style objects sourced from tokens.ts instead of Tailwind classes.
 */

interface Topic {
  name: string;
  value: number;
  color: string;
}

const TOPICS: Topic[] = [
  { name: 'Vacation & Time Off', value: 25, color: chartPalette.blue },
  { name: 'Health Insurance', value: 19, color: chartPalette.green },
  { name: 'Sick Leave', value: 17, color: chartPalette.amber },
  { name: 'Remote Work', value: 14, color: chartPalette.cyan },
  { name: 'Employee Handbook', value: 6, color: chartPalette.purple },
  { name: 'Benefits', value: 6, color: chartPalette.pink },
  { name: 'Other / Uncategorized', value: 4, color: chartPalette.teal },
  { name: 'Salary & Compensation', value: 4, color: colors['neutral-300'] },
];

export const FigmaGeneratedTopicsChart: React.FC = () => {
  const maxValue = Math.max(...TOPICS.map((t) => t.value));

  return (
    <div
      style={{
        backgroundColor: colors['neutral-white'],
        border: `0.8px solid rgba(26, 117, 219, 0.06)`,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.md,
        boxShadow: '0px 1px 3px 0px rgba(16,24,40,0.04)',
      }}
    >
      <p
        style={{
          fontSize: typography.fontSize['h4'],
          fontWeight: typography.fontWeight.semibold,
          color: colors['neutral-900'],
          margin: 0,
        }}
      >
        Most Asked Topics
      </p>

      {TOPICS.map((topic) => (
        <div
          key={topic.name}
          style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}
        >
          <span
            style={{
              width: 140,
              fontSize: typography.fontSize['body-xs'],
              color: colors['neutral-700'],
            }}
          >
            {topic.name}
          </span>
          <div
            style={{
              flex: 1,
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
              width: 28,
              textAlign: 'right',
              fontSize: typography.fontSize['body-xs'],
              fontWeight: typography.fontWeight.semibold,
              color: colors['neutral-900'],
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
