import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Reveal from './Reveal';
import styles from './ColorThemeSelector.module.css';

const COLOR_THEMES = [
  { name: 'Ocean Blue', hex: '#3B82F6', rgb: '59, 130, 246', textHex: '#1E40AF', textRgb: '30, 64, 175' },
  { name: 'Emerald Green', hex: '#10B981', rgb: '16, 185, 129', textHex: '#047857', textRgb: '4, 120, 87' },
  { name: 'Sunset Orange', hex: '#F97316', rgb: '249, 115, 22', textHex: '#B45309', textRgb: '180, 83, 9' },
  { name: 'Purple Dream', hex: '#8B5CF6', rgb: '139, 92, 246', textHex: '#5B21B6', textRgb: '91, 33, 182' },
  { name: 'Rose Pink', hex: '#EC4899', rgb: '236, 72, 153', textHex: '#BE185D', textRgb: '190, 24, 93' },
  { name: 'Teal', hex: '#14B8A6', rgb: '20, 184, 166', textHex: '#0D9488', textRgb: '13, 148, 136' },
  { name: 'Indigo', hex: '#6366F1', rgb: '99, 102, 241', textHex: '#3730A3', textRgb: '55, 48, 163' },
  { name: 'Cyan', hex: '#06B6D4', rgb: '6, 182, 212', textHex: '#0E7490', textRgb: '14, 116, 144' },
];

export default function ColorThemeSelector() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const savedColor = localStorage.getItem('portfolioThemeColor');
    if (savedColor) {
      try {
        const colorData = JSON.parse(savedColor);
        const color = COLOR_THEMES.find(c => c.hex === colorData.hex);
        if (color) {
          setSelectedColor(color);
          applyTheme(color);
        }
      } catch {
        // Fallback for old string format
        const color = COLOR_THEMES.find(c => c.hex === savedColor);
        if (color) {
          setSelectedColor(color);
          applyTheme(color);
        }
      }
    }
  }, []);

  const applyTheme = (color) => {
    document.documentElement.style.setProperty('--accent', color.hex);
    document.documentElement.style.setProperty('--accent-rgb', color.rgb);
    document.documentElement.style.setProperty('--accent-text', color.textHex);
    document.documentElement.style.setProperty('--accent-text-rgb', color.textRgb);
    localStorage.setItem('portfolioThemeColor', JSON.stringify(color));
    setIsApplied(true);
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    applyTheme(color);
  };

  const resetTheme = () => {
    localStorage.removeItem('portfolioThemeColor');
    document.documentElement.style.removeProperty('--accent');
    document.documentElement.style.removeProperty('--accent-rgb');
    setSelectedColor(null);
    setIsApplied(false);
  };

  return (
    <Reveal className={styles.selector}>
      <div className={styles.description}>
        <p>
          Select your favorite color to personalize this portfolio. Your choice is saved in your browser.
        </p>
      </div>

      <div className={styles.colorGrid}>
        {COLOR_THEMES.map((color, i) => (
          <motion.button
            key={color.hex}
            onClick={() => handleSelectColor(color)}
            className={`${styles.colorOption} ${selectedColor?.hex === color.hex ? styles.selected : ''}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            title={color.name}
          >
            <div
              className={styles.colorCircle}
              style={{ backgroundColor: color.hex }}
            />
            {selectedColor?.hex === color.hex && (
              <motion.div
                className={styles.checkmark}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                ✓
              </motion.div>
            )}
            <span className={styles.colorName}>{color.name}</span>
          </motion.button>
        ))}
      </div>

      {isApplied && (
        <motion.div
          className={styles.feedback}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.feedbackContent}>
            <span>Color applied! Your preference is saved.</span>
            <button onClick={resetTheme} className={styles.resetBtn}>
              Reset to default
            </button>
          </div>
        </motion.div>
      )}

      <div className={styles.note}>
        <p>
          Notice how the accent color changes throughout the page? Buttons, links, highlights, and interactive elements now reflect your choice.
        </p>
      </div>
    </Reveal>
  );
}
