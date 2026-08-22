import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from '../context/AppStateContext';
import gsap from 'gsap';
import './SurprisePrompt.css';

const SurprisePrompt: React.FC = () => {
  const { setCurrentState } = useAppState();
  const [noClicks, setNoClicks] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const noMessages = [
    "",
    "Nice try 😭",
    "Nope.",
    "You don't actually get a NO button.",
    "Just press YES, birthday girl ♡"
  ];

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
  }, []);

  const handleYes = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentState('BIRTHDAY_REVEAL');
      }
    });

    tl.to(containerRef.current, { opacity: 0, scale: 1.1, duration: 1.5, ease: 'power2.inOut' });
  };

  const handleNoHover = () => {
    if (noClicks >= 4) return;
    
    const nextClicks = noClicks + 1;
    setNoClicks(nextClicks);

    if (noBtnRef.current) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      
      gsap.to(noBtnRef.current, {
        x: x,
        y: y,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (messageRef.current) {
      gsap.fromTo(messageRef.current, 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  };

  return (
    <div className="prompt-container" ref={containerRef}>
      <h2 className="prompt-question">Do you want to see it?</h2>
      
      <div className="prompt-buttons">
        <button className="btn-primary btn-yes" onClick={handleYes}>YES ♡</button>
        <button 
          className="btn-primary btn-no" 
          ref={noBtnRef}
          onMouseEnter={handleNoHover}
          onClick={handleNoHover}
          style={{ opacity: noClicks >= 4 ? 0.5 : 1, pointerEvents: noClicks >= 4 ? 'none' : 'auto' }}
        >
          NO 🙃
        </button>
      </div>

      <div className="prompt-message handwriting" ref={messageRef}>
        {noMessages[Math.min(noClicks, noMessages.length - 1)]}
      </div>
    </div>
  );
};

export default SurprisePrompt;
