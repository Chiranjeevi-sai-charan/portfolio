import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HexColorPicker } from 'react-colorful';
import styles from './ColorSplash.module.css';

function generateColorVariants(hex) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  return {
    hex,
    rgb: `${r}, ${g}, ${b}`,
    textHex: adjustBrightness(hex, -40),
    textRgb: hexToRgb(adjustBrightness(hex, -40)),
    softHex: adjustBrightness(hex, 70),
    softRgb: hexToRgb(adjustBrightness(hex, 70)),
    softDarkHex: adjustBrightness(hex, -60),
    softDarkRgb: hexToRgb(adjustBrightness(hex, -60)),
  };
}

function adjustBrightness(hex, percent) {
  const num = parseInt(hex.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function hexToRgb(hex) {
  const num = parseInt(hex.slice(1), 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r}, ${g}, ${b}`;
}

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
  const [color, setColor] = useState('#3B82F6');

  const handleSelectColor = () => {
    const colorVariants = generateColorVariants(color);
    document.documentElement.style.setProperty('--accent', colorVariants.hex);
    document.documentElement.style.setProperty('--accent-rgb', colorVariants.rgb);
    document.documentElement.style.setProperty('--accent-text', colorVariants.textHex);
    document.documentElement.style.setProperty('--accent-text-rgb', colorVariants.textRgb);
    document.documentElement.style.setProperty('--accent-soft', colorVariants.softHex);

    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      document.documentElement.style.setProperty('--accent-soft', colorVariants.softDarkHex);
    }

    localStorage.setItem('portfolioThemeColor', JSON.stringify(colorVariants));
    onSelect();
  };

  return (
    <div className={styles.pickerContainer}>
      <div className={styles.pickerWrapper}>
        <HexColorPicker color={color} onChange={setColor} />
      </div>
      <div className={styles.previewBox} style={{ backgroundColor: color }} />
      <motion.button
        className={styles.confirmButton}
        onClick={handleSelectColor}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Use This Color
      </motion.button>
    </div>
  );
}
