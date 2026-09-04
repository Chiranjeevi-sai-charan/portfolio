import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HexColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
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
  const [color, setColor] = useState('#3B82F6');

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '59, 130, 246';
  };

  const generateColorVariants = (hex) => {
    const rgb = hexToRgb(hex);
    const isDark = parseInt(hex.slice(1), 16) < 0x808080;

    return {
      hex,
      rgb,
      textHex: isDark ? '#FFFFFF' : '#000000',
      textRgb: isDark ? '255, 255, 255' : '0, 0, 0',
      softHex: hex + '20',
      softRgb: rgb,
      softDarkHex: hex + '30',
      softDarkRgb: rgb,
    };
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleConfirm = () => {
    const colorData = generateColorVariants(color);

    document.documentElement.style.setProperty('--accent', colorData.hex);
    document.documentElement.style.setProperty('--accent-rgb', colorData.rgb);
    document.documentElement.style.setProperty('--accent-text', colorData.textHex);
    document.documentElement.style.setProperty('--accent-text-rgb', colorData.textRgb);
    document.documentElement.style.setProperty('--accent-soft', colorData.softHex);

    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      document.documentElement.style.setProperty('--accent-soft', colorData.softDarkHex);
    }

    localStorage.setItem('portfolioThemeColor', JSON.stringify(colorData));
    onSelect();
  };

  return (
    <div className={styles.pickerContainer}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={styles.colorPickerWrapper}
      >
        <HexColorPicker color={color} onChange={handleColorChange} />
      </motion.div>
      <motion.button
        onClick={handleConfirm}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={styles.confirmButton}
        style={{
          backgroundColor: color,
          color: parseInt(color.slice(1), 16) < 0x808080 ? '#fff' : '#000'
        }}
      >
        Continue with this color
      </motion.button>
    </div>
  );
}
