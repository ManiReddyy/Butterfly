import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '../context/AppStateContext';
import { birthdayConfig } from '../data/birthdayConfig';
import gsap from 'gsap';
import './LetterScene.css';

const LetterScene: React.FC = () => {
  const { currentState, setCurrentState } = useAppState();
  const [wishInput, setWishInput] = useState('');
  const [typedLength, setTypedLength] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  
  const fullText = birthdayConfig.letter.join('\n\n');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let typeInterval: ReturnType<typeof setInterval>;

    if (currentState === 'ENVELOPE') {
      gsap.to(envelopeRef.current, {
        y: -20,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut'
      });
    }

    if (currentState === 'LETTER') {
      const tl = gsap.timeline();
      
      // Start perfectly from where the openEnvelope animation left off
      tl.fromTo(letterRef.current, {
        width: '280px',
        height: '400px',
        scale: 1.5,
        y: -150
      }, {
        width: '90vw',
        height: '90vh',
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.inOut'
      }).add(() => {
        if (cancelled) return;
        
        let currentLength = 0;
        setTypedLength(0);
        
        typeInterval = setInterval(() => {
          if (cancelled) {
            clearInterval(typeInterval);
            return;
          }

          currentLength += 1;
          
          if (currentLength >= fullText.length) {
            currentLength = fullText.length;
            clearInterval(typeInterval);
            gsap.to('.continue-btn', { opacity: 1, duration: 0.5 });
          }
          
          setTypedLength(currentLength);
          
          const contentEl = document.querySelector('.letter-content');
          if (contentEl) {
            contentEl.scrollTop = contentEl.scrollHeight;
          }
        }, 40);
      });
    }

    if (currentState === 'WISH') {
      gsap.fromTo('.wish-box-card', 
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'back.out(1.2)' }
      );
      gsap.fromTo('.floating-star',
        { opacity: 0, scale: 0 },
        { opacity: 0.6, scale: 1, duration: 1, stagger: 0.2, ease: 'back.out(2)' }
      );
    }

    return () => {
      cancelled = true;
      if (typeInterval) clearInterval(typeInterval);
      gsap.killTweensOf(envelopeRef.current);
      gsap.killTweensOf(letterRef.current);
      gsap.killTweensOf('.continue-btn');
      gsap.killTweensOf('.wish-box-card');
      gsap.killTweensOf('.floating-star');
    };
  }, [currentState, fullText.length]);

  const openEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    gsap.killTweensOf(envelopeRef.current);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentState('LETTER');
      }
    });

    tl.to('.envelope-flap', { rotateX: 180, duration: 0.4 })
      .to(letterRef.current, { y: -150, duration: 0.5, ease: 'power2.out' })
      .to('.envelope-front, .envelope-back, .envelope-flap, .stamp, .click-instruction', { opacity: 0, duration: 0.2 })
      .to(letterRef.current, { scale: 1.5, duration: 0.4 });
  };

  const submitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.trim()) return;

    localStorage.setItem('maha_wish', wishInput);

    const tl = gsap.timeline({
      onComplete: () => setCurrentState('HEART_GAME')
    });

    tl.to('.wish-box-card, .floating-star', {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in'
    })
    .to('.glowing-wish-ball', {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(2)'
    }, "-=0.2")
    .to('.glowing-wish-ball', {
      y: -20,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    })
    .to('.glowing-wish-ball', {
      y: -window.innerHeight,
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.in'
    });
  };

  return (
    <div className="letter-container" ref={containerRef}>
      
      {currentState === 'ENVELOPE' && (
        <div className="envelope-container" onClick={openEnvelope} ref={envelopeRef}>
          <div className="envelope">
            <div className="letter" ref={letterRef}>
              <div className="letter-content handwriting">
                {birthdayConfig.letter.map((line, i) => (
                  <p key={i} className="letter-line" style={{ opacity: 0 }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="envelope-flap"></div>
            <div className="envelope-back"></div>
            <div className="envelope-front">
              <div className="wax-seal">♡</div>
            </div>
            
            <div className="stamp stamp-1">💌</div>
            <div className="stamp stamp-2">🌷</div>
            <div className="stamp stamp-3">✨</div>
          </div>
          <p className="click-instruction handwriting">Tap to open</p>
        </div>
      )}

      {currentState === 'LETTER' && (
        <div className="letter fullscreen" ref={letterRef}>
          <div className="doodle doodle-1">✨</div>
          <div className="doodle doodle-2">💖</div>
          <div className="doodle doodle-3">🦋</div>
          <div className="doodle doodle-4">🌻</div>

          <div className="letter-content handwriting">
            {fullText.slice(0, typedLength).split('\n\n').map((para, i) => (
              <p key={i} className="letter-line" style={{ opacity: 1, margin: '0 0 1rem 0' }}>
                {para}
                {i === fullText.slice(0, typedLength).split('\n\n').length - 1 && typedLength < fullText.length && (
                  <span className="cursor">|</span>
                )}
              </p>
            ))}
          </div>
          
          <button 
            className="continue-btn btn-primary" 
            style={{ opacity: 0, marginTop: '1rem', flexShrink: 0, zIndex: 10 }}
            onClick={() => setCurrentState('WISH')}
          >
            I've read it
          </button>
        </div>
      )}

      {currentState === 'WISH' && (
        <div className="wish-scene-container">
           <div className="floating-star" style={{ top: '15%', left: '20%' }}>✨</div>
           <div className="floating-star" style={{ top: '65%', left: '80%' }}>✨</div>
           <div className="floating-star" style={{ top: '80%', left: '15%' }}>🌟</div>
           <div className="floating-star" style={{ top: '25%', left: '75%' }}>💫</div>

           <div className="glowing-wish-ball"></div>

           <div className="wish-box-card">
              <div className="wish-content">
                <h2 className="handwriting wish-title">Make a wish, Maha ✨</h2>
                <form onSubmit={submitWish} className="wish-form">
                  <textarea 
                    className="handwriting wish-textarea"
                    value={wishInput}
                    onChange={(e) => setWishInput(e.target.value)}
                    placeholder="Close your eyes, and write it down..."
                    required
                  />
                  <button type="submit" className="btn-primary wish-btn">Send to the Universe 🤍</button>
                </form>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default LetterScene;
