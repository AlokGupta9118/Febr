import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoveLetterProps {
  sender: string;
  receiver: string;
  message?: string;
  dayEmoji: string;
}

export const LoveLetter = ({ sender, receiver, message, dayEmoji }: LoveLetterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      {!isOpen ? (
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div
            className="w-72 h-48 md:w-96 md:h-56 rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--valentine-deep)), hsl(var(--primary)))',
              boxShadow: '0 10px 40px hsl(var(--primary) / 0.3)',
            }}
          >
            {/* Envelope flap */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2"
              style={{
                background: 'linear-gradient(180deg, hsl(var(--valentine-deep) / 0.8), transparent)',
                clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
              }}
            />
            <div className="text-center z-10">
              <p className="text-5xl mb-2">{dayEmoji}</p>
              <p className="font-cursive text-2xl" style={{ color: 'hsl(var(--valentine-gold))' }}>
                Tap to open
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-80 md:w-[28rem] p-8 md:p-12 rounded-xl text-center"
            style={{
              background: 'linear-gradient(160deg, hsl(var(--valentine-cream)), hsl(40 30% 88%))',
              boxShadow: '0 20px 60px hsl(0 0% 0% / 0.4)',
              color: 'hsl(0 20% 15%)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="font-cursive text-3xl md:text-4xl mb-4" style={{ color: 'hsl(var(--primary))' }}>
                Dear {receiver},
              </p>
              <div className="w-16 h-0.5 mx-auto my-4" style={{ background: 'hsl(var(--valentine-gold))' }} />
              <p className="font-body text-lg md:text-xl leading-relaxed mb-6">
                {message || `You make my world brighter with every smile. This day is for you, and only you. ${dayEmoji}`}
              </p>
              <div className="w-16 h-0.5 mx-auto my-4" style={{ background: 'hsl(var(--valentine-gold))' }} />
              <p className="font-cursive text-2xl md:text-3xl" style={{ color: 'hsl(var(--valentine-deep))' }}>
                With all my love,
              </p>
              <p className="font-cursive text-3xl md:text-4xl mt-2 text-shimmer">
                {sender}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
