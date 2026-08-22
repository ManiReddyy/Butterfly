import React, { useEffect, useRef } from 'react';
import { useAppState } from '../context/AppStateContext';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { birthdayConfig } from '../data/birthdayConfig';
import './BirthdayReveal.css';

const BirthdayReveal: React.FC = () => {
  const { setCurrentState } = useAppState();
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFDAB9', '#F8C8DC', '#E8B4B8']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFDAB9', '#F8C8DC', '#E8B4B8']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    const tl = gsap.timeline();

    // Background blooms into pastel light
    tl.to(containerRef.current, { opacity: 1, duration: 1 })
      .fromTo(text1Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
      )
      .fromTo(text2Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        "-=0.4"
      )
      .fromTo(text3Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(photoRef.current,
        { opacity: 0, y: 50, rotation: -5 },
        { opacity: 1, y: 0, rotation: -3, duration: 1, ease: 'power2.out' },
        "-=0.4"
      )
      .to(containerRef.current, {
        opacity: 0,
        duration: 1,
        delay: 8,
        onComplete: () => setCurrentState('BALLOON_CAKE')
      });

  }, [setCurrentState]);

  return (
    <div className="reveal-container" ref={containerRef}>
      <div className="reveal-content">
        <div className="reveal-text-1 handwriting" ref={text1Ref}>Happy Birthday</div>
        <h1 className="reveal-text-2" ref={text2Ref}>MAHANVITHA <span className="heart">♡</span></h1>
        <div className="reveal-text-3" ref={text3Ref}>Epd 20 Nko 1 year lo 21 osthai..Mahaa Not a teen anymore...Mahaa Auntyyyyy</div>
      </div>

      <div className="hero-photo-wrapper" ref={photoRef}>
        <div className="hero-photo" style={{ padding: '10px', paddingBottom: '40px', background: 'white' }}>
          <img
            src={birthdayConfig.photos.find(p => p.featured)?.src || "/placeholder-1.jpg"}
            alt="Maha"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div className="photo-note handwriting">My Butter-flyaway 👀</div>
        <div className="tape"></div>
      </div>
    </div>
  );
};

export default BirthdayReveal;
