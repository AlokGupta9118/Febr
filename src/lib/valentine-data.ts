export type ValentineDay = 
  | 'rose' | 'propose' | 'chocolate' | 'teddy' 
  | 'promise' | 'hug' | 'kiss' | 'valentine';

export interface DayConfig {
  id: ValentineDay;
  name: string;
  emoji: string;
  date: string;
  tagline: string;
  color: string;
  question: string;
}

export const DAYS: DayConfig[] = [
  { id: 'rose', name: 'Rose Day', emoji: '🌹', date: 'Feb 7', tagline: 'A rose speaks of love silently', color: 'hsl(350 80% 60%)', question: 'Will you accept my rose?' },
  { id: 'propose', name: 'Propose Day', emoji: '💍', date: 'Feb 8', tagline: 'Every love story is beautiful', color: 'hsl(340 90% 50%)', question: 'Will you be my Valentine?' },
  { id: 'chocolate', name: 'Chocolate Day', emoji: '🍫', date: 'Feb 9', tagline: 'Sweet as chocolate, twice as nice', color: 'hsl(25 60% 35%)', question: 'Will you be my sweetness?' },
  { id: 'teddy', name: 'Teddy Day', emoji: '🧸', date: 'Feb 10', tagline: 'A warm hug in every cuddle', color: 'hsl(30 50% 55%)', question: 'Will you be my teddy bear?' },
  { id: 'promise', name: 'Promise Day', emoji: '🤞', date: 'Feb 11', tagline: 'Promises made from the heart', color: 'hsl(280 60% 55%)', question: 'Will you promise to be mine?' },
  { id: 'hug', name: 'Hug Day', emoji: '🤗', date: 'Feb 12', tagline: 'Where words fail, hugs speak', color: 'hsl(20 70% 55%)', question: 'Can I hold you close?' },
  { id: 'kiss', name: 'Kiss Day', emoji: '💋', date: 'Feb 13', tagline: 'A kiss is a secret told to the mouth', color: 'hsl(340 80% 55%)', question: 'May I steal a kiss?' },
  { id: 'valentine', name: "Valentine's Day", emoji: '❤️', date: 'Feb 14', tagline: 'Love is all you need', color: 'hsl(0 80% 50%)', question: 'Will you be my Valentine forever?' },
];

export const FLIRTY_QUOTES = [
  "Haha, nice try! 😏",
  "You can't say no that easily! 💕",
  "Your heart says yes! ❤️",
  "Running from love? Not today! 🏃‍♀️",
  "Oops! The No button is shy too! 😳",
  "Love always wins, darling! 💖",
  "That button has commitment issues! 😂",
  "Even the button knows you should say yes! 🥰",
  "Resistance is futile, sweetheart! 💘",
  "Almost caught it? Try the Yes button instead! ✨",
  "The universe wants you to say yes! 🌟",
  "Your smile already said yes! 😊",
  "No is not in the vocabulary of love! 📖",
  "That button runs faster than my heartbeat for you! 💓",
  "Cupid says: click Yes already! 🏹",
];

export function encodeValentineData(data: {
  sender: string;
  receiver: string;
  day: ValentineDay;
  message?: string;
}): string {
  const json = JSON.stringify(data);
  const utf8 = encodeURIComponent(json);
  return btoa(utf8)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}


export function decodeValentineData(encoded: string): {
  sender: string;
  receiver: string;
  day: ValentineDay;
  message?: string;
} | null {
  try {
    const base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);

    const utf8 = atob(padded);
    const json = decodeURIComponent(utf8);
    return JSON.parse(json);
  } catch {
    return null;
  }
}


