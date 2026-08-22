import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '../context/AppStateContext';
import { birthdayConfig } from '../data/birthdayConfig';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import './BalloonCakeScene.css';

const BalloonCakeScene: React.FC = () => {
  const { currentState, setCurrentState } = useAppState();
  const [poppedCount, setPoppedCount] = useState(0);
  const totalBalloons = 15;
  const containerRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);

  const [balloons, setBalloons] = useState(() => {
    const notes = [...birthdayConfig.balloonNotes];
    const noteIndices = new Set<number>();
    while (noteIndices.size < notes.length) {
      noteIndices.add(Math.floor(Math.random() * totalBalloons));
    }
    const indicesArray = Array.from(noteIndices);

    return Array.from({ length: totalBalloons }).map((_, i) => {
      const isSpecial = noteIndices.has(i);
      const note = isSpecial ? notes[indicesArray.indexOf(i)] : null;

      return {
        id: i,
        x: Math.random() * 80 + 10,
        delay: Math.random() * 5, // Spread them out
        color: ['#F8C8DC', '#E8B4B8', '#D3E0DC', '#FFF2CC', '#E6E6FA'][Math.floor(Math.random() * 5)],
        label: i === 3 ? 'pop me' : (isSpecial && Math.random() > 0.5 ? '?' : ''),
        note: note
      }
    });
  });

  const [droppedNotes, setDroppedNotes] = useState<any[]>([]);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [micDenied, setMicDenied] = useState(false);

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });

    // If the user refreshes the page and is already in the CANDLES state,
    // the cake won't fade in via the balloon pop logic, so we must show it manually.
    if (currentState === 'CANDLES') {
      gsap.set('.cake-scene', { opacity: 1, y: 0 });
    }
  }, []); // Run once on mount

  const popBalloon = (b: any, e: React.MouseEvent) => {
    // Particle burst
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { x: originX, y: originY },
      colors: ['#ffffff', b.color],
      disableForReducedMotion: true,
      zIndex: 100,
      ticks: 50
    });

    if (b.note) {
      // Give each of the 4 notes a specific quadrant so they never perfectly overlap
      const noteIndex = birthdayConfig.balloonNotes.findIndex(n => n.id === b.note.id);

      const positions = [
        { x: '30vw', y: '25vh' }, // Top left-ish
        { x: '70vw', y: '40vh' }, // Middle right-ish
        { x: '30vw', y: '55vh' }, // Middle left-ish
        { x: '70vw', y: '70vh' }, // Bottom right-ish
      ];

      const pos = positions[noteIndex] || { x: '50vw', y: '50vh' };

      setDroppedNotes(prev => [...prev, {
        ...b.note,
        dropX: pos.x,
        dropY: pos.y,
        rot: (Math.random() - 0.5) * 30
      }]);
    }

    setBalloons(prev => prev.filter(balloon => balloon.id !== b.id));
    setPoppedCount(prev => prev + 1);
  };

  useEffect(() => {
    if (poppedCount >= totalBalloons && currentState === 'BALLOON_CAKE') {
      // Delay before moving to candles so they can read the notes
      setTimeout(() => {
        gsap.to('.dropped-note', {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentState('CANDLES');
            gsap.fromTo(cakeRef.current,
              { opacity: 0, y: 100 },
              { opacity: 1, y: 0, duration: 1.5, ease: 'back.out(1.5)' }
            );
          }
        });
      }, 4000);
    }
  }, [poppedCount, currentState, setCurrentState]);

  const isBlownRef = useRef(false);

  const blowCandles = () => {
    if (isBlownRef.current) return;
    isBlownRef.current = true;
    setCandlesBlown(true);

    // Smoke effect
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#cccccc', '#aaaaaa'],
      ticks: 100
    });

    gsap.to(containerRef.current, { backgroundColor: '#1A1818', duration: 2 });

    setTimeout(() => {
      setCurrentState('ENVELOPE');
    }, 4000);
  };

  const handleMicRequest = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

      javascriptNode.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let values = 0;
        const length = array.length;
        for (let i = 0; i < length; i++) {
          values += (array[i]);
        }
        const average = values / length;

        if (average > 50) { // Threshold for blowing
          blowCandles();
          stream.getTracks().forEach(track => track.stop());
          javascriptNode.disconnect();
        }
      };
    } catch (err) {
      console.log('Mic denied or error', err);
      setMicDenied(true);
    }
  };

  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (currentState === 'CANDLES') {
      // Prompt mic logic after a delay
      setTimeout(() => {
        handleMicRequest();
      }, 2000);

      // Safety fallback: if they haven't blown the candles after 10s (or if mic fails silently)
      const timer = setTimeout(() => {
        setShowFallback(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [currentState]);

  return (
    <div className="balloon-cake-container" ref={containerRef}>

      {currentState === 'BALLOON_CAKE' && (
        <div className="balloon-instruction fade-in">
          <div className="balloon-instruction-pill">
            <h2 className="handwriting prompt-text">🎈 Pop the balloons to see what they're hiding... ✨</h2>
          </div>
        </div>
      )}

      {currentState === 'BALLOON_CAKE' && balloons.map(b => (
        <div
          key={b.id}
          className="balloon"
          style={{
            left: `${b.x}vw`,
            backgroundColor: b.color,
            animationDelay: `${b.delay}s`
          }}
          onClick={(e) => popBalloon(b, e)}
        >
          {b.label && <span className="handwriting">{b.label}</span>}
        </div>
      ))}

      {currentState === 'BALLOON_CAKE' && droppedNotes.map(note => (
        <div
          key={note.id}
          className="dropped-note"
          style={{
            left: note.dropX,
            top: note.dropY,
            '--rot': `${note.rot}deg`
          } as React.CSSProperties}
        >
          <div className="note-photo" style={{ backgroundImage: `url(${note.img})`, backgroundSize: 'cover', backgroundPosition: note.pos || 'center' }}></div>
          <p className="handwriting">{note.text}</p>
        </div>
      ))}

      {(currentState === 'CANDLES' || currentState === 'BALLOON_CAKE') && (
        <div className="cake-scene" ref={cakeRef} style={{ opacity: 0, pointerEvents: currentState === 'CANDLES' ? 'auto' : 'none' }}>
          <h2 className="handwriting prompt-text">Okay birthday girl...<br />Make a wish.</h2>

          <div className="cake">
            <div className="cake-layer bottom"></div>
            <div className="cake-layer top"></div>
            <div className="candles">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={`candle ${candlesBlown ? 'blown' : ''}`} style={{ left: `${(i / 19) * 100}%` }}>
                  <div className="flame"></div>
                </div>
              ))}
            </div>
          </div>

          {(micDenied || showFallback) && !candlesBlown && currentState === 'CANDLES' && (
            <div className="mic-fallback fade-in">
              <p className="handwriting">Okay okay... we'll do it the easy way 😭</p>
              <button className="btn-primary" onClick={blowCandles}>BLOW THEM OUT ✨</button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default BalloonCakeScene;
