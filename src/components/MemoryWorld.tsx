import React, { useEffect, useRef } from 'react';
import { useAppState } from '../context/AppStateContext';
import { birthdayConfig } from '../data/birthdayConfig';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './MemoryWorld.css';

gsap.registerPlugin(ScrollTrigger);

const MemoryWorld: React.FC = () => {
  const { setCurrentState } = useAppState();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Setup scroll animations
    const chapters = gsap.utils.toArray('.chapter-section');

    chapters.forEach((chapter: any, _i) => {
      // Parallax images
      const images = chapter.querySelectorAll('.memory-photo');
      gsap.fromTo(images,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: chapter,
            start: 'top 70%',
            end: 'bottom bottom',
            scrub: 1
          }
        }
      );

      // Floating chat bubbles in "US" chapter
      if (chapter.classList.contains('chapter-us')) {
        const bubbles = chapter.querySelectorAll('.chat-bubble');
        gsap.to(bubbles, {
          y: (_i: number) => -50 - (Math.random() * 50),
          x: (_i: number) => (Math.random() - 0.5) * 40,
          opacity: 0,
          stagger: 0.5,
          scrollTrigger: {
            trigger: chapter,
            start: 'top 50%',
            end: 'bottom top',
            scrub: 2
          }
        });
      }
    });

    // End trigger to move to PHOTO_GALLERY
    ScrollTrigger.create({
      trigger: '.memory-world-end',
      start: 'bottom bottom',
      onEnter: () => {
        // lenis.destroy();
        // setCurrentState('PHOTO_GALLERY');
        // Let user click to enter gallery instead to make it explicit
      }
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [setCurrentState]);

  const enterGallery = () => {
    setCurrentState('PHOTO_GALLERY');
  };

  return (
    <div className="memory-world-container" ref={containerRef}>

      <div className="memory-intro">
        <h1 className="display-text memory-title">The Chapters</h1>
        <p className="handwriting">Scroll down to read.</p>
      </div>

      {birthdayConfig.chapters.map((chapter) => {
        const photos = birthdayConfig.photos.filter(p => p.chapter === chapter.id);
        const isUsChapter = chapter.title === 'US';

        return (
          <section key={chapter.id} className={`chapter-section chapter-${chapter.title.toLowerCase().replace(' ', '-')}`}>
            <div className="chapter-content">
              <h2 className="chapter-title">
                <span className="chapter-number">{chapter.id}</span>
                {chapter.title}
              </h2>
              <p className="chapter-desc handwriting">{chapter.description}</p>

              <div className="chapter-photos">
                {photos.map((photo, i) => (
                  <div
                    key={i}
                    className="memory-photo"
                    style={{ transform: `rotate(${photo.rotation}deg)` }}
                  >
                    <div 
                      className="photo-inner" 
                      style={{ 
                        backgroundImage: `url(${photo.src})`, 
                        backgroundSize: (photo as any).fit || 'cover', 
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      {/* Real image shows through backgroundImage */}
                    </div>
                    {photo.tape && <div className="tape"></div>}
                    <div className="photo-caption handwriting">{photo.caption}</div>
                  </div>
                ))}

                {photos.length === 0 && (
                  <div className="memory-photo placeholder" style={{ transform: `rotate(${(Math.random() - 0.5) * 10}deg)` }}>
                    <div className="photo-inner"><div className="photo-placeholder-color"></div></div>
                    <div className="photo-caption handwriting">Memory coming soon...</div>
                  </div>
                )}
              </div>

              {isUsChapter && (
                <div className="chat-bubbles-container">
                  {birthdayConfig.messageFragments.map((msg, i) => (
                    <div key={i} className="chat-bubble handwriting" style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${Math.random() * 100}%`
                    }}>
                      {msg}
                    </div>
                  ))}

                  <div className="us-statement">
                    <p className="handwriting">Maybe this is what makes our friendship special.</p>
                    <p className="handwriting">Nothing extraordinary had to happen every day.</p>
                    <p className="handwriting">You were just there.</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}

      <div className="memory-world-end">
        <button className="btn-primary" onClick={enterGallery}>ENTER THE INFINITE GALLERY</button>
      </div>

    </div>
  );
};

export default MemoryWorld;
