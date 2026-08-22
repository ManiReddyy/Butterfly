import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '../context/AppStateContext';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import './HeartGame.css';

const HeartGame: React.FC = () => {
  const { setCurrentState } = useAppState();
  const [heartsFound, setHeartsFound] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const TOTAL_HEARTS = 20;
  
  const [hearts, setHearts] = useState(
    Array.from({ length: TOTAL_HEARTS }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 1.5 + 0.5,
      type: i % 4, // 0: static, 1: floating, 2: pulsing, 3: fast moving
    }))
  );

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
  }, []);

  const collectHeart = (id: number, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
      particleCount: 15,
      spread: 30,
      origin: { x: originX, y: originY },
      colors: ['#FF69B4', '#F8C8DC'],
      disableForReducedMotion: true,
      zIndex: 100,
      ticks: 50
    });

    setHearts(prev => prev.filter(h => h.id !== id));
    
    const newCount = heartsFound + 1;
    setHeartsFound(newCount);

    if (newCount === TOTAL_HEARTS) {
      // Big confetti celebration!
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FF69B4', '#F8C8DC', '#ffffff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FF69B4', '#F8C8DC', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();

      setTimeout(() => {
        gsap.to(containerRef.current, { opacity: 0, duration: 2, onComplete: () => {
          setCurrentState('MEMORY_WORLD');
        }});
      }, 4000);
    }
  };

  return (
    <div className="heart-game-container" ref={containerRef}>
      <div className="game-hud handwriting">
        ♡ {String(heartsFound).padStart(2, '0')} / {TOTAL_HEARTS}
      </div>

      {heartsFound === TOTAL_HEARTS && (
        <div className="game-complete fade-in">
          <h2 className="handwriting">You found all 20.</h2>
          <p className="handwriting">So now you get to see what they were hiding.</p>
        </div>
      )}

      {heartsFound < TOTAL_HEARTS && (
        <div className="game-intro">
          <h3 className="handwriting">One last thing.</h3>
          <p className="handwriting">You've found the wish. Now find the 20 hearts.</p>
        </div>
      )}

      {hearts.map(h => (
        <div
          key={h.id}
          className={`game-heart type-${h.type}`}
          style={{
            left: `${h.x}vw`,
            top: `${h.y}vh`,
            transform: `scale(${h.size})`,
          }}
          onClick={(e) => collectHeart(h.id, e)}
        >
          ♡
        </div>
      ))}
    </div>
  );
};

export default HeartGame;
