
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import TypingText from './TypingText';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  className?: string;
  animated?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  className, 
  animated = false 
}) => {
  return (
    <div className={cn("text-center mb-12", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="inline-block"
      >
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent">
          {animated ? <TypingText text={title} typingSpeed={70} cursorBlink={false} /> : title}
        </h2>
        <div className="h-1 w-24 bg-primary rounded-full mx-auto mt-2 mb-4"></div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        {animated ? 
          <TypingText 
            text={subtitle} 
            typingSpeed={30} 
            startDelay={title.length * 70 + 500} 
            cursorBlink={false}
          /> 
          : subtitle}
      </motion.p>
    </div>
  );
};

export default SectionHeading;
