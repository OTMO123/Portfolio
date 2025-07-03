import { motion } from 'framer-motion';

export const Aurora = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute top-0 left-0 w-full h-full"
      style={{
        background: 'linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1))'
      }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 200,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </div>
);
