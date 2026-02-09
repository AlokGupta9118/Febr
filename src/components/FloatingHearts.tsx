import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
}

const EMOJIS = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '🌹', '✨'];

export const FloatingHearts = ({ count = 15 }: { count?: number }) => {
  const [hearts] = useState<Heart[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 14 + Math.random() * 20,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            animation: `float-heart ${heart.duration}s ease-in-out ${heart.delay}s infinite`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
};
