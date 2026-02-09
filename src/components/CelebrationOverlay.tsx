import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CelebrationOverlayProps {
  sender: string;
  receiver: string;
}

export const CelebrationOverlay = ({ sender, receiver }: CelebrationOverlayProps) => {
  useEffect(() => {
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6b81', '#ffd700', '#ff4757', '#ff6348', '#e84393'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6b81', '#ffd700', '#ff4757', '#ff6348', '#e84393'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div className="text-center p-8">
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl mb-4"
        >
          🎉💖🎉
        </motion.p>
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-cursive text-4xl md:text-6xl text-shimmer mb-4"
        >
          {receiver} said Yes!
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="font-display text-xl md:text-2xl"
          style={{ color: 'hsl(var(--valentine-rose))' }}
        >
          {sender} & {receiver} — Forever ❤️
        </motion.p>
      </div>
    </motion.div>
  );
};
