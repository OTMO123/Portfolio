import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlowCard = ({ 
  children, 
  className = '', 
  glowColor = 'bg-blue-500/20' 
}: GlowCardProps) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur-lg opacity-0 group-hover:opacity-75"></div>
      <div className={`relative bg-white dark:bg-gray-900 rounded-lg ${className}`}>
        {children}
      </div>
    </motion.div>
  );
};