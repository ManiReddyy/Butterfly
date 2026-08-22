import React, { useEffect, useState, useRef } from 'react';
import { useAppState } from '../context/AppStateContext';
import { birthdayConfig } from '../data/birthdayConfig';
import gsap from 'gsap';
import './CountdownScreen.css';

const CountdownScreen: React.FC = () => {
  const { currentState, setCurrentState } = useAppState();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Initialize shards synchronously so they exist in the DOM before GSAP queries them
  const [shards] = useState(() =>
    Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 1200,
      rot: (Math.random() - 0.5) * 720
    }))
  );

  const [introText, setIntroText] = useState('19');

  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const shardContainerRef = useRef<HTMLDivElement>(null);
  const targetDate = new Date(birthdayConfig.targetTimestamp).getTime();

  useEffect(() => {
    if (currentState === 'INTRO') {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setCurrentState('COUNTDOWN'), 500);
        }
      });

      // 1. Initial 19 appearance
      tl.to(numberRef.current, { opacity: 1, duration: 1, ease: "power2.inOut" })
        .to(numberRef.current, { scale: 1.05, duration: 1, ease: "power1.inOut" })

        // 2. Shatter 19!
        .add(() => {
          if (numberRef.current) numberRef.current.style.opacity = '0';
        })
        .fromTo('.shard',
          { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 },
          {
            x: (i) => shards[i].x,
            y: (i) => shards[i].y,
            rotation: (i) => shards[i].rot,
            opacity: 0.8,
            scale: () => Math.random() * 2 + 0.5,
            duration: 0.8,
            ease: "expo.out",
            stagger: { amount: 0.1 }
          }
        )

        // 3. Converge to 20
        .add(() => {
          setIntroText('20');
        }, "+=0.3") // Brief pause while scattered

        .to('.shard', {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "expo.in",
        }
        )

        // 4. Flash and show 20
        .add(() => {
          if (numberRef.current) numberRef.current.style.opacity = '1';
          gsap.set('.shard', { opacity: 0 }); // hide shards instantly

          // Flash impact effect
          gsap.fromTo(numberRef.current,
            { scale: 0.8, textShadow: '0 0 100px #fff, 0 0 200px #9B7E89' },
            { scale: 1, textShadow: '0 0 40px rgba(155, 126, 137, 0.2)', duration: 1, ease: "elastic.out(1, 0.5)" }
          );
        })
        .to(numberRef.current, { opacity: 0, duration: 1, delay: 1.5, ease: "power2.inOut" });
    }
  }, [currentState, setCurrentState, shards]);

  useEffect(() => {
    if (currentState !== 'COUNTDOWN') return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentState('UNLOCKING');
        }, 2000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentState, targetDate, setCurrentState]);

  return (
    <div className="countdown-container" ref={containerRef}>
      {currentState === 'INTRO' && (
        <>
          <div className="shards-container" ref={shardContainerRef}>
            {shards.map(shard => (
              <div key={shard.id} className="shard"></div>
            ))}
          </div>
          <div className="intro-number" ref={numberRef}>
            {introText}
          </div>
        </>
      )}

      {currentState === 'COUNTDOWN' && (
        <div className="countdown-content fade-in">
          <h1 className="name-title">{birthdayConfig.name}</h1>
          <p className="date-subtitle">{birthdayConfig.birthday}</p>

          <div className="waiting-text handwriting">
            Something is waiting for you...
            <br />
            But not yet. <span className="emoji">👀</span>
          </div>

          <div className="timer-wrapper">
            <div className="time-block">
              <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="time-label">DAYS</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-block">
              <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="time-label">HOURS</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-block">
              <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="time-label">MINUTES</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-block">
              <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="time-label">SECONDS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownScreen;
