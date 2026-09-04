import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ColorThemeSelector from './ColorThemeSelector';
import styles from './ColorSplash.module.css';

export default function ColorSplash({ onColorSelected }) {
  const [isSelecting, setIsSelecting] = useState(true);

  const handleColorSelected = () => {
    setTimeout(() => {
      setIsSelecting(false);
      onColorSelected();
    }, 600);
  };

  if (!isSelecting) {
    return null;
  }

  return (
    <motion.div
      className={styles.splash}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.header}
        >
          <h1 className={styles.title}>Personalize Your Experience</h1>
          <p className={styles.subtitle}>Choose your favorite color to get started</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={styles.selectorWrapper}
        >
          <ColorThemeSplash onSelect={handleColorSelected} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={styles.footer}
        >
          <p>Your choice will be remembered for next time</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ColorThemeSplash({ onSelect }) {
  const COLOR_THEMES = [
    { name: 'Ocean Blue', hex: '#3B82F6', rgb: '59, 130, 246', textHex: '#1E40AF', textRgb: '30, 64, 175', softHex: '#DBEAFE', softRgb: '219, 234, 254', softDarkHex: '#1E3A8A', softDarkRgb: '30, 58, 138' },
    { name: 'Emerald Green', hex: '#10B981', rgb: '16, 185, 129', textHex: '#047857', textRgb: '4, 120, 87', softHex: '#D1FAE5', softRgb: '209, 250, 229', softDarkHex: '#064E3B', softDarkRgb: '6, 78, 59' },
    { name: 'Sunset Orange', hex: '#F97316', rgb: '249, 115, 22', textHex: '#B45309', textRgb: '180, 83, 9', softHex: '#FFEDD5', softRgb: '255, 237, 213', softDarkHex: '#7C2D12', softDarkRgb: '124, 45, 18' },
    { name: 'Purple Dream', hex: '#8B5CF6', rgb: '139, 92, 246', textHex: '#5B21B6', textRgb: '91, 33, 182', softHex: '#EDE9FE', softRgb: '237, 233, 254', softDarkHex: '#3F0F64', softDarkRgb: '63, 15, 100' },
    { name: 'Rose Pink', hex: '#EC4899', rgb: '236, 72, 153', textHex: '#BE185D', textRgb: '190, 24, 93', softHex: '#FCE7F3', softRgb: '252, 231, 243', softDarkHex: '#831843', softDarkRgb: '131, 24, 67' },
    { name: 'Teal', hex: '#14B8A6', rgb: '20, 184, 166', textHex: '#0D9488', textRgb: '13, 148, 136', softHex: '#CCFBF1', softRgb: '204, 251, 241', softDarkHex: '#134E4A', softDarkRgb: '19, 78, 74' },
    { name: 'Indigo', hex: '#6366F1', rgb: '99, 102, 241', textHex: '#3730A3', textRgb: '55, 48, 163', softHex: '#E0E7FF', softRgb: '224, 231, 255', softDarkHex: '#1E1B4B', softDarkRgb: '30, 27, 75' },
    { name: 'Cyan', hex: '#06B6D4', rgb: '6, 182, 212', textHex: '#0E7490', textRgb: '14, 116, 144', softHex: '#CFFAFE', softRgb: '207, 250, 254', softDarkHex: '#0F3A42', softDarkRgb: '15, 58, 66' },
  ];

  const handleSelectColor = (color) => {
    document.documentElement.style.setProperty('--accent', color.hex);
    document.documentElement.style.setProperty('--accent-rgb', color.rgb);
    document.documentElement.style.setProperty('--accent-text', color.textHex);
    document.documentElement.style.setProperty('--accent-text-rgb', color.textRgb);
    document.documentElement.style.setProperty('--accent-soft', color.softHex);

    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      document.documentElement.style.setProperty('--accent-soft', color.softDarkHex);
    }

    localStorage.setItem('portfolioThemeColor', JSON.stringify(color));
    onSelect();
  };

  return (
    <div className={styles.colorGrid}>
      {COLOR_THEMES.map((color, i) => (
        <motion.button
          key={color.hex}
          onClick={() => handleSelectColor(color)}
          className={styles.colorOption}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06 }}
          title={color.name}
        >
          <div
            className={styles.colorCircle}
            style={{ backgroundColor: color.hex }}
          />
          <span className={styles.colorName}>{color.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
