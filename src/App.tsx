import React from 'react';
import { useAppState } from './context/AppStateContext';

import CountdownScreen from './components/CountdownScreen';
import BirthdayUnlock from './components/BirthdayUnlock';
import SurprisePrompt from './components/SurprisePrompt';

import BirthdayReveal from './components/BirthdayReveal';
import BalloonCakeScene from './components/BalloonCakeScene';
import LetterScene from './components/LetterScene';
import HeartGame from './components/HeartGame';
import MemoryWorld from './components/MemoryWorld';
import InfiniteGallery from './components/InfiniteGallery';
import FinalScene from './components/FinalScene';
import MusicController from './components/MusicController';

const App: React.FC = () => {
  const { currentState } = useAppState();

  return (
    <>
      <div className="paper-texture"></div>
      
      {/* Background container for floating elements */}
      <div id="background-layer" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>

      <MusicController />

      {/* Main flow routing based on state */}
      <main className="app-main">
        {(currentState === 'INTRO' || currentState === 'COUNTDOWN') && <CountdownScreen />}
        {currentState === 'UNLOCKING' && <BirthdayUnlock />}
        {currentState === 'SURPRISE_PROMPT' && <SurprisePrompt />}
        
        {currentState === 'BIRTHDAY_REVEAL' && <BirthdayReveal />}
        {(currentState === 'BALLOON_CAKE' || currentState === 'CANDLES') && <BalloonCakeScene />}
        {(currentState === 'ENVELOPE' || currentState === 'LETTER' || currentState === 'WISH') && <LetterScene />}
        
        {currentState === 'HEART_GAME' && <HeartGame />}
        {currentState === 'MEMORY_WORLD' && <MemoryWorld />}
        {currentState === 'PHOTO_GALLERY' && <InfiniteGallery />}
        
        {currentState === 'FINAL_MESSAGE' && <FinalScene />}
      </main>
    </>
  );
};

export default App;
