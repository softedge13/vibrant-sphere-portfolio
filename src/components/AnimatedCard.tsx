
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  image,
  index,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "group perspective w-full h-[300px] sm:h-[350px] relative rounded-xl overflow-hidden",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "preserve-3d backface-hidden absolute inset-0 rounded-xl transition-all duration-500",
          isHovered ? "[transform:rotateY(0deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center rounded-xl overflow-hidden"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
      </div>
      
      <div
        className={cn(
          "preserve-3d absolute inset-0 rounded-xl backface-hidden transition-all duration-500 glass p-6 flex flex-col justify-between",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        <div>
          <h3 className="text-xl font-bold mb-3 text-gradient">{title}</h3>
          <p className="text-sm text-foreground/80">{description}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm mt-4 self-start"
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
