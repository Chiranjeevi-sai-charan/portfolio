import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Reveal from './Reveal';
import styles from './TestimonialCarousel.module.css';

export default function TestimonialCarousel({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [autoPlay, testimonials.length]);

  const handlePrev = () => {
    setAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setAutoPlay(false);
    setActiveIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselInner}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={styles.carouselItem}
          >
            <Reveal>
              <div
                className={styles.testimonialCard}
              >
                <p className={styles.testimonialQuote}>
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                  <div className={styles.authorInfo}>
                    <div className={styles.testimonialName}>
                      {testimonials[activeIndex].name}
                    </div>
                    <div className={styles.testimonialRole}>
                      {testimonials[activeIndex].role}
                    </div>
                    <div className={styles.testimonialContext}>
                      {testimonials[activeIndex].context}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button
          onClick={handlePrev}
          className={styles.arrowBtn}
          aria-label="Previous testimonial"
        >
          ←
        </button>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`${styles.dot} ${activeIndex === i ? styles.active : ''}`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className={styles.dotInner} />
            </motion.button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className={styles.arrowBtn}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>

      <div className={styles.autoPlayToggle}>
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={styles.toggleBtn}
        >
          {autoPlay ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}
