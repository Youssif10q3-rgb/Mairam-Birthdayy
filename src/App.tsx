import { useState, useEffect, useCallback, useRef } from 'react';
import HeartsAnimation from './components/HeartsAnimation';
import Sparkles from './components/Sparkles';
import Confetti from './components/Confetti';
import Countdown from './components/Countdown';


const birthdayQuotes = [
  "\"The world is a better place because you're in it.\"",
  "\"Here's to another year of being amazing.\"",
  "\"You make the world brighter just by being you.\"",
  "\"A birthday is nature's way of telling us to eat more cake!\"",
];

function LetterReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            animation: `letterReveal 0.5s ease-out forwards`,
            animationDelay: `${delay + i * 0.05}s`,
            opacity: 0,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}



function ScrollSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [envelopeOpening, setEnvelopeOpening] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % birthdayQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleBirthday = useCallback(() => {
    setShowConfetti(true);
  }, []);

  const handleOpenEnvelope = () => {
    setEnvelopeOpening(true);
    setTimeout(() => {
      setShowEnvelope(false);
      setShowContent(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 7000);
    }, 800);
  };

  // Envelope / Invitation Screen
  if (showEnvelope) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a] flex items-center justify-center relative overflow-hidden">
        <Sparkles />
        <HeartsAnimation />

        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">🌸</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🌺</div>
        <div className="absolute top-40 right-20 text-4xl opacity-10 animate-float" style={{ animationDelay: '4s' }}>💫</div>
        <div className="absolute bottom-40 left-20 text-4xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>🦋</div>

        <div
          className={`text-center z-20 px-6 transition-all duration-800 ${
            envelopeOpening ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {/* Envelope */}
          <div
            onClick={handleOpenEnvelope}
            className="cursor-pointer group mx-auto mb-10"
          >
            <div className="relative mx-auto w-64 md:w-80 h-48 md:h-56">
              {/* Envelope body */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-600/20 rounded-2xl border border-pink-400/30 backdrop-blur-lg transform group-hover:scale-105 transition-all duration-500 shadow-2xl shadow-pink-500/20 group-hover:shadow-pink-500/40">
                {/* Envelope flap */}
                <div className="absolute -top-0.5 left-0 right-0 h-24 md:h-28 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-pink-400/30 to-rose-500/30 border border-pink-400/30 backdrop-blur-lg transform origin-top group-hover:rotateX-12 transition-transform duration-500"
                    style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
                  />
                </div>
                {/* Heart seal */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-4xl transform group-hover:scale-125 transition-transform duration-300 drop-shadow-lg">
                  💌
                </div>
                {/* Card peeking out */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-t from-white/10 to-white/5 rounded-t-xl border-t border-x border-white/20 flex items-center justify-center">
                  <span className="text-pink-200/60 font-cursive text-lg">For Mariam</span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="font-cursive text-4xl md:text-6xl text-gradient-pink mb-4">
            <LetterReveal text="You're Invited!" delay={0.5} />
          </h1>
          <p className="text-pink-300/60 text-lg md:text-xl font-light mb-8 animate-fade-in-up" style={{ animationDelay: '2s', animationFillMode: 'backwards' }}>
            A Special Birthday Celebration
          </p>
          <button
            onClick={handleOpenEnvelope}
            className="animate-fade-in-up px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 active:scale-95"
            style={{ animationDelay: '2.5s', animationFillMode: 'backwards' }}
          >
            Open the Card ✨
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">
      <HeartsAnimation />
      <Confetti active={showConfetti} />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#2d1045] to-[#0a0a1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,168,83,0.1),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/60 via-transparent to-[#0a0a1a]" />
        </div>

        <Sparkles />

        {/* Content */}
        <div className={`relative z-20 text-center px-6 max-w-4xl mx-auto ${showContent ? 'animate-fade-in-up' : ''}`}>
          {/* Crown / Stars decoration */}
          <div className="flex justify-center gap-3 mb-6 text-3xl">
            {['✨', '👑', '✨'].map((emoji, i) => (
              <span
                key={i}
                className="animate-bounce-in"
                style={{ animationDelay: `${0.3 + i * 0.2}s`, animationFillMode: 'backwards' }}
              >
                {emoji}
              </span>
            ))}
          </div>

          {/* Subtitle */}
          <p
            className="text-pink-300/80 text-sm md:text-base uppercase tracking-[0.3em] mb-4 font-light animate-fade-in-up"
            style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
          >
            Happy Birthday
          </p>

          {/* Main Name */}
          <h1 className="mb-6">
            <span className="block font-cursive text-7xl md:text-9xl lg:text-[10rem] text-gradient-pink leading-none">
              <LetterReveal text="Mariam" delay={0.8} />
            </span>
          </h1>

          {/* Date */}
          <div
            className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up"
            style={{ animationDelay: '1.8s', animationFillMode: 'backwards' }}
          >
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-pink-400/50" />
            <p className="font-serif text-lg md:text-2xl text-gold-light tracking-widest">
              August 13th
            </p>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-pink-400/50" />
          </div>

          {/* Tagline */}
          <p
            className="text-pink-200/60 text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '2.2s', animationFillMode: 'backwards' }}
          >
            Celebrating the most wonderful soul. Today, the world celebrates you! 💖
          </p>

          {/* Scroll indicator */}
          <div
            className="mt-16 animate-bounce"
            style={{ animationDelay: '3s' }}
          >
            <div className="text-pink-400/40 text-sm tracking-widest uppercase mb-2">Scroll Down</div>
            <svg className="w-6 h-6 mx-auto text-pink-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ===== COUNTDOWN SECTION ===== */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a0a2e]/50 to-[#0a0a1a]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <ScrollSection>
            <Countdown onBirthday={handleBirthday} />
          </ScrollSection>
        </div>
      </section>

      {/* ===== BIRTHDAY MESSAGE SECTION ===== */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollSection>
            <div className="text-center mb-16">
              <span className="text-5xl mb-4 block">💝</span>
              <h2 className="font-cursive text-4xl md:text-6xl text-gradient-pink mb-6">
                Dear Mariam
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mb-8" />
            </div>
          </ScrollSection>

          <ScrollSection>
            <div className="glass-card-pink rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 text-2xl opacity-30">🌸</div>
              <div className="absolute top-4 right-4 text-2xl opacity-30">🌸</div>
              <div className="absolute bottom-4 left-4 text-2xl opacity-30">🌸</div>
              <div className="absolute bottom-4 right-4 text-2xl opacity-30">🌸</div>

              <p className="font-serif text-lg md:text-xl text-pink-100/80 leading-relaxed mb-6 italic">
                "On this beautiful day, a star was born — and that star is you, Mariam.
                Your presence brings warmth to every heart you touch. Your smile is the kind
                of magic that makes everything around you brighter."
              </p>
              <p className="font-serif text-lg md:text-xl text-pink-100/80 leading-relaxed mb-8 italic">
                "May your birthday be filled with all the love, joy, and laughter you bring
                to others every single day. You are truly one in a million, and this day is
                a celebration of the incredible person you are."
              </p>
              <div className="text-3xl mb-4">🎂</div>
              <p className="font-cursive text-3xl md:text-4xl text-gradient-gold">
                Happy Birthday, Mariam!
              </p>
            </div>
          </ScrollSection>
        </div>
      </section>

      {/* ===== ROTATING QUOTES ===== */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/10 to-transparent" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <ScrollSection>
            <div className="text-center min-h-[100px] flex items-center justify-center">
              <p className="font-serif text-xl md:text-2xl text-pink-200/60 italic transition-all duration-500" key={currentQuote}>
                {birthdayQuotes[currentQuote]}
              </p>
            </div>
          </ScrollSection>
        </div>
      </section>





      {/* ===== CELEBRATION BANNER ===== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-rose-500/10 to-pink-600/10" />
        <Sparkles />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <ScrollSection className="text-center">
            <div className="glass-card rounded-3xl p-10 md:p-16" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <div className="flex justify-center gap-2 text-4xl mb-6">
                🎈🎉🎊🎂🎁🎀
              </div>
              <h2 className="font-cursive text-5xl md:text-7xl text-gradient-gold mb-6">
                Happy Birthday!
              </h2>
              <p className="font-serif text-xl md:text-2xl text-pink-200/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                Mariam, may your year ahead be filled with love, success, and endless happiness.
                You deserve all the wonderful things life has to offer.
              </p>
              <div className="flex justify-center gap-3 text-3xl">
                {['💖', '🌟', '💖', '🌟', '💖'].map((e, i) => (
                  <span
                    key={i}
                    className="animate-float"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </ScrollSection>
        </div>
      </section>

      {/* ===== AGE MILESTONES ===== */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollSection className="text-center mb-16">
            <span className="text-4xl mb-4 block">🎯</span>
            <h2 className="font-cursive text-4xl md:text-6xl text-gradient-pink mb-4">
              Why You're Amazing
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
          </ScrollSection>

          <div className="space-y-6">
            {[
              { icon: '💬', text: 'You talk to Youssef' },
              { icon: '💛', text: 'You know Youssef' },
              { icon: '💫', text: 'Your smile lights up the darkest rooms' },
              { icon: '🌸', text: 'Your kindness touches every heart' },
              { icon: '🦋', text: 'Your strength inspires everyone around you' },
              { icon: '🌟', text: 'Your laughter is the sweetest melody' },
              { icon: '💖', text: 'Your love makes the world a better place' },
              { icon: '👑', text: 'You are a queen in every way' },
            ].map((item, i) => (
              <ScrollSection key={i}>
                <div
                  className="glass-card-pink rounded-2xl p-6 flex items-center gap-5 hover:scale-[1.02] transition-all duration-300 hover:border-pink-400/30"
                >
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <p className="font-serif text-lg md:text-xl text-pink-200/80">{item.text}</p>
                </div>
              </ScrollSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative py-16 border-t border-pink-500/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-4xl mb-4">💝</div>
          <p className="font-cursive text-3xl md:text-4xl text-gradient-pink mb-4">
            Made with Love for Mariam
          </p>
          <p className="text-pink-400/40 text-sm tracking-wider">
            August 13th • A Day to Celebrate You
          </p>
          <div className="flex justify-center gap-2 mt-6 text-lg">
            {['💖', '🌹', '💖', '🌹', '💖'].map((e, i) => (
              <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                {e}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
