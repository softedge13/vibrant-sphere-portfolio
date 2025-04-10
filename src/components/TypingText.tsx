
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  className,
  typingSpeed = 100,
  startDelay = 0,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStartTyping(true);
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!startTyping) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, typingSpeed, startTyping, onComplete]);

  return (
    <span className={cn("", className)}>
      {displayedText}
      <span className="inline-block w-[2px] h-[1em] bg-primary animate-pulse ml-1 align-middle">
        &nbsp;
      </span>
    </span>
  );
};

export default TypingText;
