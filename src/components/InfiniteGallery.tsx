import React, { useEffect, useRef } from 'react';
import { useAppState } from '../context/AppStateContext';
import { birthdayConfig } from '../data/birthdayConfig';
import gsap from 'gsap';
import './InfiniteGallery.css';

const InfiniteGallery: React.FC = () => {
  const { setCurrentState } = useAppState();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Infinite horizontal scrolling animation
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 30, // Adjust speed here
        repeat: -1
      });
    }
  }, []);

  const endExperience = () => {
    gsap.to('.infinite-gallery-container', { 
      opacity: 0, 
      duration: 2,
      onComplete: () => setCurrentState('FINAL_MESSAGE')
    });
  };

  // Duplicate items to create infinite loop effect
  const items = [...birthdayConfig.photos, ...birthdayConfig.photos];

  return (
    <div className="infinite-gallery-container">
      <div className="gallery-header">
        <h2 className="handwriting">A lifetime of memories...</h2>
      </div>
      
      <div className="gallery-track-wrapper">
        <div className="gallery-track" ref={trackRef}>
          {items.map((photo, i) => (
            <div 
              key={i} 
              className="gallery-item"
              style={{ 
                transform: `rotate(${(Math.random() - 0.5) * 10}deg)`,
                marginTop: `${(Math.random() - 0.5) * 100}px` 
              }}
            >
              <div 
                className="gallery-photo"
                style={{ 
                  backgroundImage: `url(${photo.src})`, 
                  backgroundSize: (photo as any).fit || 'cover', 
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
              </div>
              {i % 3 === 0 && <div className="tape"></div>}
              {i % 4 === 0 && <div className="handwriting gallery-note">{photo.caption}</div>}
            </div>
          ))}
          
          {/* Add a few text cards */}
          <div className="gallery-text-card handwriting">20 years of you.</div>
          <div className="gallery-text-card handwriting">Keep that smile.</div>
        </div>
      </div>
      
      <div className="gallery-footer">
        <button className="btn-primary" onClick={endExperience}>FINISH CHAPTER</button>
      </div>
    </div>
  );
};

export default InfiniteGallery;
