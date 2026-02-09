import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FLIRTY_QUOTES } from '@/lib/valentine-data';

interface RunawayButtonProps {
  onYesClick: () => void;
  receiverName: string;
}

export const RunawayButton = ({ onYesClick, receiverName }: RunawayButtonProps) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [quote, setQuote] = useState('');
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [escaped, setEscaped] = useState(false);

  const runAway = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    e?.preventDefault();
    
    // Get viewport dimensions for better movement range
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Determine max movement based on viewport size
    const maxX = Math.min(viewportWidth * 0.3, 400); // 30% of viewport width or 400px max
    const maxY = Math.min(viewportHeight * 0.25, 300); // 25% of viewport height or 300px max
    
    // Generate random position within viewport bounds
    // Use different quadrants to ensure it moves to different areas
    const quadrant = Math.floor(Math.random() * 4);
    let x, y;
    
    switch(quadrant) {
      case 0: // Top-left area
        x = -(Math.random() * maxX * 0.8 + maxX * 0.2);
        y = -(Math.random() * maxY * 0.8 + maxY * 0.2);
        break;
      case 1: // Top-right area
        x = Math.random() * maxX * 0.8 + maxX * 0.2;
        y = -(Math.random() * maxY * 0.8 + maxY * 0.2);
        break;
      case 2: // Bottom-left area
        x = -(Math.random() * maxX * 0.8 + maxX * 0.2);
        y = Math.random() * maxY * 0.8 + maxY * 0.2;
        break;
      case 3: // Bottom-right area
        x = Math.random() * maxX * 0.8 + maxX * 0.2;
        y = Math.random() * maxY * 0.8 + maxY * 0.2;
        break;
      default:
        x = (Math.random() - 0.5) * maxX * 2;
        y = (Math.random() - 0.5) * maxY * 2;
    }
    
    // Sometimes move closer to Yes button, sometimes further away
    const distanceFromYes = Math.random();
    if (distanceFromYes > 0.7) {
      // Move closer to Yes button (20-40% of max distance)
      x = x * 0.4;
      y = y * 0.4;
    } else if (distanceFromYes < 0.3) {
      // Move far away (80-100% of max distance)
      x = x * 1.0;
      y = y * 1.0;
    }
    
    setNoPos({ x, y });
    setQuote(FLIRTY_QUOTES[quoteIdx % FLIRTY_QUOTES.length]);
    setQuoteIdx((i) => i + 1);
    setEscaped(true);
  }, [quoteIdx]);

  return (
    <div className="relative flex flex-col items-center gap-8 min-h-[400px] w-full">
      <h2 className="font-cursive text-4xl md:text-6xl text-shimmer text-center px-4">
        Will you be my Valentine, {receiverName}?
      </h2>

      <AnimatePresence>
        {quote && (
          <motion.p
            key={quote}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-lg md:text-xl font-body italic text-center px-4 max-w-xl"
            style={{ color: 'hsl(var(--valentine-rose))' }}
          >
            {quote}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-8 items-center justify-center relative w-full min-h-[200px] p-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onYesClick}
          className="px-10 py-4 rounded-full text-xl md:text-2xl font-display font-bold relative z-10"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
            color: 'hsl(var(--primary-foreground))',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        >
          Yes! 💖
        </motion.button>

        <motion.button
          animate={{ x: noPos.x, y: noPos.y }}
          transition={{ type: 'spring', stiffness: 250, damping: 15 }}
          onMouseEnter={runAway}
          onTouchStart={runAway}
          onClick={runAway}
          className="px-8 py-4 rounded-full text-lg font-display border-2 z-10 relative"
          style={{
            borderColor: 'hsl(var(--muted-foreground))',
            color: 'hsl(var(--muted-foreground))',
            backgroundColor: 'hsl(var(--background))',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          No 😢
        </motion.button>
      </div>
    </div>
  );
};