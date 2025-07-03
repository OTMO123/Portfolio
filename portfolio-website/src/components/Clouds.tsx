import { motion, useMotionValue, useTransform } from 'framer-motion';

const Cloud = ({ delay, duration, x, y, scale, opacity, mouseX, mouseY, parallaxStrength, scrollYProgress }) => {
  const transformX = useTransform(mouseX, [0, window.innerWidth], [x[0] - parallaxStrength, x[0] + parallaxStrength]);
  const transformY = useTransform(mouseY, [0, window.innerHeight], [y[0] - parallaxStrength, y[0] + parallaxStrength]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
        width: '500px',
        height: '500px',
        filter: 'blur(100px)',
        x: transformX,
        y: transformY,
        translateY: scrollY,
      }}
      animate={{
        scale,
        opacity,
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }}
    />
  );
};

export const Clouds = ({ scrollYProgress }) => {
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const cloudData = [
    { delay: 0, duration: 60, x: [-200, 200], y: [-50, 50], scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], parallaxStrength: 20 },
    { delay: 5, duration: 70, x: [200, -200], y: [150, 250], scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4], parallaxStrength: 40 },
    { delay: 10, duration: 80, x: [-150, 150], y: [300, 200], scale: [1.1, 1.3, 1.1], opacity: [0.2, 0.4, 0.2], parallaxStrength: 60 },
    { delay: 15, duration: 90, x: [150, -150], y: [50, 150], scale: [1.3, 1.1, 1.3], opacity: [0.5, 0.3, 0.5], parallaxStrength: 80 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden" onMouseMove={handleMouseMove}>
      {cloudData.map((cloud, index) => (
        <Cloud key={index} {...cloud} mouseX={mouseX} mouseY={mouseY} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
};
