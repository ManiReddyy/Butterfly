import React, { useEffect, useRef } from 'react';
import { useAppState } from '../context/AppStateContext';
import gsap from 'gsap';
import './BirthdayUnlock.css';

const BirthdayUnlock: React.FC = () => {
  const { setCurrentState } = useAppState();
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setCurrentState('SURPRISE_PROMPT');
        }, 1000);
      }
    });

    // Darken and add golden light effect
    tl.to(containerRef.current, { backgroundColor: '#1A1818', duration: 3, ease: 'power2.inOut' })
      
      .fromTo(text1Ref.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' },
        "-=1"
      )
      .to(text1Ref.current, { opacity: 0, duration: 1, delay: 1 })
      
      .fromTo(text2Ref.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
      )
      .to(text2Ref.current, { opacity: 0, duration: 1, delay: 1 })
      
      .fromTo(text3Ref.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
      )
      .to(text3Ref.current, { opacity: 0, duration: 1, delay: 1.5 });

  }, [setCurrentState]);

  return (
    <div className="unlock-container" ref={containerRef}>
      <div className="unlock-text" ref={text1Ref}>Okay...</div>
      <div className="unlock-text" ref={text2Ref}>It's finally your day.</div>
      <div className="unlock-text" ref={text3Ref}>I made something for you.</div>
    </div>
  );
};

export default BirthdayUnlock;
