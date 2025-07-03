import { motion } from 'framer-motion';
import { useMemo } from 'react';

const Star = ({ x, y, size, delay, duration }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
    }}
    animate={{
      opacity: [0.1, 0.8, 0.1],
    }}
    transition={{
      delay,
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export const Stars = ({ count = 200 }) => {
  const stars = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      key: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 10,
      duration: Math.random() * 5 + 5,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map(star => (
        <Star key={star.key} {...star} />
      ))}
    </div>
  );
};
