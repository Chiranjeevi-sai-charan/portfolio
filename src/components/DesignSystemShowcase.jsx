import { useState } from 'react';
import { motion } from 'motion/react';
import Reveal from './Reveal';
import styles from './DesignSystemShowcase.module.css';

const DESIGN_TOKENS = {
  colors: [
    { name: 'Primary Accent', hex: 'var(--accent)', variable: '--accent' },
    { name: 'Background', hex: 'var(--bg)', variable: '--bg' },
    { name: 'Text Primary', hex: 'var(--text-primary)', variable: '--text-primary' },
    { name: 'Text Secondary', hex: 'var(--text-secondary)', variable: '--text-secondary' },
  ],
  spacing: [
    { name: '4px', value: '0.25rem' },
    { name: '8px', value: '0.5rem' },
    { name: '12px', value: '0.75rem' },
    { name: '16px', value: '1rem' },
    { name: '24px', value: '1.5rem' },
    { name: '32px', value: '2rem' },
  ],
  typography: [
    { name: 'Display', size: '2.5rem', weight: '700', example: 'Designing the future' },
    { name: 'Heading', size: '1.875rem', weight: '600', example: 'Section title' },
    { name: 'Body', size: '1rem', weight: '400', example: 'Regular text' },
    { name: 'Small', size: '0.875rem', weight: '500', example: 'Caption text' },
  ],
};

export default function DesignSystemShowcase() {
  const [activeTab, setActiveTab] = useState('colors');
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <Reveal className={styles.showcase}>
      <div className={styles.header}>
        <h3 className={styles.title}>Design System</h3>
        <p className={styles.description}>
          Explore the tokens and components that power this portfolio
        </p>
      </div>

      <div className={styles.tabs}>
        {['colors', 'spacing', 'typography'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className={styles.content}>
        {activeTab === 'colors' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.colorGrid}
          >
            {DESIGN_TOKENS.colors.map((color, i) => (
              <motion.div
                key={color.name}
                className={styles.colorCard}
                onClick={() => setSelectedColor(selectedColor === i ? null : i)}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div
                  className={styles.colorSwatch}
                  style={{ backgroundColor: color.hex }}
                />
                <div className={styles.colorInfo}>
                  <div className={styles.colorName}>{color.name}</div>
                  <div className={styles.colorVariable}>{color.variable}</div>
                </div>
                {selectedColor === i && (
                  <motion.div
                    className={styles.colorPreview}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <p>This color is used across interactive elements, accents, and highlights.</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'spacing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.spacingGrid}
          >
            {DESIGN_TOKENS.spacing.map((space, i) => (
              <motion.div
                key={space.name}
                className={styles.spacingCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div
                  className={styles.spacingBlock}
                  style={{ width: space.value, height: space.value }}
                />
                <div className={styles.spacingLabel}>{space.name}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'typography' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.typographyGrid}
          >
            {DESIGN_TOKENS.typography.map((type, i) => (
              <motion.div
                key={type.name}
                className={styles.typographyCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div
                  className={styles.typographyExample}
                  style={{
                    fontSize: type.size,
                    fontWeight: type.weight,
                  }}
                >
                  {type.example}
                </div>
                <div className={styles.typographyInfo}>
                  <div>{type.name}</div>
                  <div className={styles.typographyMeta}>
                    {type.size} / {type.weight}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className={styles.footer}>
        <p>
          This design system ensures consistency across all pages and components, built for
          scalability and accessibility.
        </p>
      </div>
    </Reveal>
  );
}
