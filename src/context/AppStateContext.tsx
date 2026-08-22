import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type AppState = 
  | 'INTRO' 
  | 'COUNTDOWN' 
  | 'UNLOCKING' 
  | 'SURPRISE_PROMPT' 
  | 'BIRTHDAY_REVEAL' 
  | 'BALLOON_CAKE' 
  | 'CANDLES' 
  | 'ENVELOPE' 
  | 'LETTER' 
  | 'WISH' 
  | 'HEART_GAME' 
  | 'MEMORY_WORLD' 
  | 'PHOTO_GALLERY' 
  | 'FINAL_MESSAGE';

interface AppStateContextProps {
  currentState: AppState;
  setCurrentState: (state: AppState) => void;
  isAudioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
}

const AppStateContext = createContext<AppStateContextProps | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to load persisted state from localStorage
  const getInitialState = (): AppState => {
    const saved = localStorage.getItem('maha_bday_state');
    if (saved) {
      // Validate the saved state is valid
      return saved as AppState;
    }
    return 'INTRO';
  };

  const [currentState, setCurrentState] = useState<AppState>(getInitialState);
  const [isAudioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    // Only persist states after unlock, so it doesn't get stuck in intro if refreshed
    const persistableStates = [
      'BIRTHDAY_REVEAL', 'BALLOON_CAKE', 'CANDLES', 'ENVELOPE', 
      'LETTER', 'WISH', 'HEART_GAME', 'MEMORY_WORLD', 
      'PHOTO_GALLERY', 'FINAL_MESSAGE'
    ];
    
    if (persistableStates.includes(currentState)) {
      localStorage.setItem('maha_bday_state', currentState);
    }
  }, [currentState]);

  return (
    <AppStateContext.Provider value={{ currentState, setCurrentState, isAudioEnabled, setAudioEnabled }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
