import React, { useEffect, useRef } from 'react';
import { useAppState } from '../context/AppStateContext';
import { Volume2, VolumeX } from 'lucide-react';
import './MusicController.css';

const MusicController: React.FC = () => {
  const { isAudioEnabled, setAudioEnabled } = useAppState();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isAudioEnabled) {
        audioRef.current.volume = 0.2;
        audioRef.current.play().catch(e => console.log('Audio play failed', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioEnabled]);

  return (
    <>
      <button 
        className="music-controller-btn" 
        onClick={() => setAudioEnabled(!isAudioEnabled)}
        aria-label={isAudioEnabled ? "Mute music" : "Play music"}
      >
        {isAudioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      
      {/* 
        Add your music file to the public folder and update the src below.
        e.g., src="/background-music.mp3" 
      */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default MusicController;
