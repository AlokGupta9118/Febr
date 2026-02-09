import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { decodeValentineData, DAYS } from '@/lib/valentine-data';
import { FloatingHearts } from '@/components/FloatingHearts';
import { LoveLetter } from '@/components/LoveLetter';
import { RunawayButton } from '@/components/RunawayButton';
import { CelebrationOverlay } from '@/components/CelebrationOverlay';
import { Link } from 'react-router-dom';

const ValentineExperience = () => {
  const { data } = useParams();
  const [showCelebration, setShowCelebration] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const decoded = data ? decodeValentineData(data) : null;

  if (!decoded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-4xl mb-4">💔</p>
          <h1 className="font-display text-2xl mb-2">Invalid Link</h1>
          <p className="text-muted-foreground mb-4">This Valentine link seems broken.</p>
          <Link to="/" className="text-primary underline font-display">Create a new one →</Link>
        </div>
      </div>
    );
  }

  const dayConfig = DAYS.find((d) => d.id === decoded.day)!;

  const handleYes = () => {
    setShowCelebration(true);
    setTimeout(() => setShowLetter(true), 3000);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(180deg, hsl(var(--background)), hsl(0 15% 8%))' }}
    >
      <FloatingHearts count={20} />

      {showCelebration && !showLetter && (
        <CelebrationOverlay sender={decoded.sender} receiver={decoded.receiver} />
      )}

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8">
        {/* Day header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-5xl md:text-7xl mb-2">{dayConfig.emoji}</p>
          <h1 className="font-cursive text-4xl md:text-6xl text-shimmer mb-2">{dayConfig.name}</h1>
          <p className="font-display text-lg italic" style={{ color: 'hsl(var(--valentine-rose))' }}>
            {dayConfig.tagline}
          </p>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-display text-xl md:text-2xl text-center"
          style={{ color: 'hsl(var(--valentine-gold))' }}
        >
          From <span className="font-cursive text-2xl md:text-3xl">{decoded.sender}</span> to{' '}
          <span className="font-cursive text-2xl md:text-3xl">{decoded.receiver}</span>
        </motion.p>

        {/* Runaway button section */}
        {!showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <RunawayButton onYesClick={handleYes} receiverName={decoded.receiver} />
          </motion.div>
        )}

        {/* Love letter (shown after celebration) */}
        {showLetter && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LoveLetter
              sender={decoded.sender}
              receiver={decoded.receiver}
              message={decoded.message}
              dayEmoji={dayConfig.emoji}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ValentineExperience;
