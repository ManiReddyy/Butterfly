import React, { useEffect, useRef, useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { birthdayConfig } from '../data/birthdayConfig';
import gsap from 'gsap';
import './FinalScene.css';

const FinalScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const butterflyRef = useRef<HTMLDivElement>(null);

  const { setCurrentState } = useAppState();

  const [doodles] = useState(() => {
    const emojis = ['🦋', '🌻', '🌸', '💖', '🎂', '✨', '🫂', '😘', '❤️', '🦋', '💐', '🍰', '💕', '🥰', '🎈', '💝', '✨'];
    return emojis.map((emoji, i) => ({
      id: i,
      char: emoji,
      top: 5 + Math.random() * 85 + '%',
      left: 5 + Math.random() * 90 + '%',
      rotation: (Math.random() - 0.5) * 60,
      scale: 0.8 + Math.random() * 1.5,
      delay: Math.random() * -10 // Random negative delay for animation sync
    }));
  });

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(containerRef.current, { opacity: 1, duration: 1 });

    // Fade in background doodles
    tl.fromTo('.final-doodle',
      { opacity: 0, scale: 0 },
      { opacity: 0.4, scale: 1, duration: 2, stagger: 0.05, ease: 'back.out(1.5)' },
      "-=0.5"
    );

    linesRef.current.forEach((line, i) => {
      if (line) {
        tl.fromTo(line,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
          i === 0 ? "+=0.5" : "+=0.8"
        );
      }
    });

    // Final signature
    tl.fromTo('.final-signature', { opacity: 0 }, { opacity: 1, duration: 1 }, "+=1");

    // Butterfly flies away
    tl.to(butterflyRef.current, {
      opacity: 1,
      x: window.innerWidth,
      y: -window.innerHeight,
      rotation: 45,
      duration: 6,
      ease: 'power1.inOut'
    }, "-=1");

    // Fade to final chapter message and hide it so button is clickable
    tl.to('.final-content', { opacity: 0, duration: 1.5, display: 'none' }, "+=1");
    tl.to('.final-doodle', { opacity: 0, duration: 1.5 }, "<"); // Fade out doodles too

    tl.fromTo('.next-chapter', { opacity: 0, display: 'block' }, { opacity: 1, duration: 2 }, "+=0.5");
    tl.fromTo('.restart-btn', { opacity: 0 }, { opacity: 1, duration: 1 }, "+=0.5");

  }, []);

  const handleRestart = () => {
    localStorage.removeItem('maha_bday_state');
    setCurrentState('INTRO');
  };

  return (
    <div className="final-scene-container" ref={containerRef} style={{ opacity: 0 }}>

      <div className="final-doodles">
        {doodles.map(d => (
          <div
            key={d.id}
            className="final-doodle"
            style={{
              top: d.top,
              left: d.left,
              '--rot': `${d.rotation}deg`,
              '--scale': d.scale,
              animationDelay: `${d.delay}s`
            } as React.CSSProperties}
          >
            {d.char}
          </div>
        ))}
      </div>

      <div className="butterfly-element" ref={butterflyRef}>
        🦋
      </div>

      <div className="final-content">
        <div className="final-photo" style={{ background: 'white', padding: '10px', paddingBottom: '40px', display: 'inline-block', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', transform: 'rotate(-2deg)' }}>
          <img 
            src={birthdayConfig.photos[birthdayConfig.photos.length - 1]?.src || "/placeholder-4.jpg"} 
            alt="Maha" 
            style={{ width: '250px', height: '250px', objectFit: 'cover', display: 'block' }} 
          />
        </div>

        <div className="final-messages">
          {birthdayConfig.finalMessage.map((msg, i) => (
            <div
              key={i}
              className={`final-line ${i === 0 ? 'display-text' : 'handwriting'}`}
              ref={el => { linesRef.current[i] = el; }}
            >
              {msg}
            </div>
          ))}

          <div className="final-signature handwriting">
            {birthdayConfig.signature}
          </div>
        </div>
      </div>

      <div className="next-chapter handwriting" style={{ display: 'none' }}>
        See you in the next chapter. ♡
        <br />
        <button className="restart-btn btn-primary" onClick={handleRestart} style={{ marginTop: '2rem', fontSize: '1rem', padding: '10px 20px', pointerEvents: 'auto' }}>
          Restart Experience
        </button>
      </div>

    </div>
  );
};

export default FinalScene;
