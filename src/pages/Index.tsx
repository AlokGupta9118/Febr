import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { FloatingHearts } from '@/components/FloatingHearts';
import { encodeValentineData, ValentineDay, DAYS } from '@/lib/valentine-data';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Index = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const generateLink = () => {
  if (!sender.trim() || !receiver.trim() || !selectedDay) {
    toast.error('Please fill in your name, their name, and select a day!');
    return;
  }
  
  const encoded = encodeValentineData({
    sender: sender.trim(),
    receiver: receiver.trim(),
    day: selectedDay as ValentineDay,
    message: message.trim() || undefined,
  });
  
  // Use hash-based URL for HashRouter
  const url = `${window.location.origin}/#/v/${encoded}`;
  
  console.log('🔗 URL being copied:', url);
  console.log('📋 Clipboard content length:', url.length);
  
  navigator.clipboard.writeText(url).then(() => {
    console.log('✅ Copied to clipboard successfully');
    toast.success('Link copied to clipboard! 💕 Share it with your special someone!');
  }).catch((err) => {
    console.error('❌ Clipboard error:', err);
    toast.info('Your link is ready! Navigate to preview it.');
  });
  
  // Navigate with hash
  navigate(`/v/${encoded}`);
};

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, hsl(var(--background)), hsl(0 15% 8%))' }}>
      <FloatingHearts count={12} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="font-cursive text-5xl md:text-7xl lg:text-8xl text-shimmer mb-4">
            Valentine's Week
          </h1>
          <p className="font-display text-lg md:text-xl italic" style={{ color: 'hsl(var(--valentine-rose))' }}>
            Create a magical experience for your special someone ✨
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-lg p-6 md:p-8 rounded-2xl"
          style={{
            background: 'hsl(var(--card) / 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid hsl(var(--border))',
            boxShadow: '0 20px 60px hsl(0 0% 0% / 0.4)',
          }}
        >
          {/* Day Selector */}
          <div className="mb-6">
            <label className="font-display text-sm uppercase tracking-wider mb-3 block" style={{ color: 'hsl(var(--valentine-gold))' }}>
              Choose the Day
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DAYS.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className="p-3 rounded-xl text-left transition-all duration-200 font-body"
                  style={{
                    background: selectedDay === day.id
                      ? 'linear-gradient(135deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.2))'
                      : 'hsl(var(--muted) / 0.5)',
                    border: selectedDay === day.id
                      ? '1px solid hsl(var(--primary) / 0.5)'
                      : '1px solid transparent',
                  }}
                >
                  <span className="text-lg mr-1">{day.emoji}</span>
                  <span className="text-sm font-medium">{day.name}</span>
                  <span className="block text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{day.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name inputs */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="font-display text-sm uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--valentine-gold))' }}>
                Your Name
              </label>
              <Input
                placeholder="Enter your name..."
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="bg-muted/50 border-border font-body"
              />
            </div>
            <div>
              <label className="font-display text-sm uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--valentine-gold))' }}>
                Their Name
              </label>
              <Input
                placeholder="Enter their name..."
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                className="bg-muted/50 border-border font-body"
              />
            </div>
            <div>
              <label className="font-display text-sm uppercase tracking-wider mb-1.5 block" style={{ color: 'hsl(var(--valentine-gold))' }}>
                Personal Message <span className="normal-case text-muted-foreground">(optional)</span>
              </label>
              <Textarea
                placeholder="Write something from your heart..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="bg-muted/50 border-border font-body resize-none"
              />
            </div>
          </div>

          <Button
            onClick={generateLink}
            className="w-full h-12 text-lg font-display rounded-xl"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
            }}
          >
            Generate & Copy Link 💌
          </Button>
          
          {/* Debug button - add this temporarily */}
          <Button
            onClick={() => {
              const testEncoded = encodeValentineData({
                sender: "Test",
                receiver: "Friend",
                day: "propose",
                message: "Test message"
              });
              const testUrl = `${window.location.origin}/#/v/${testEncoded}`;
              console.log("Test URL:", testUrl);
              window.open(testUrl, '_blank');
            }}
            className="w-full h-12 text-lg font-display rounded-xl mt-4 bg-gray-500"
          >
            Test Link (Debug)
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;