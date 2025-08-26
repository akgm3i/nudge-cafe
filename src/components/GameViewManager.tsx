import React from 'react';
import { useGameStore } from '../stores/useGameStore';
import { GamePhase } from '../types/game';
import CafeScene from './Cafe/CafeScene';
import Notebook from './Notebook';

export const GameViewManager: React.FC = () => {
  const { phase } = useGameStore();

  switch (phase) {
    case GamePhase.EXPERIENCE:
      return <CafeScene />;
    case GamePhase.AWAITING_HYPOTHESIS:
      return <Notebook />;
    // Add other phases later
    default:
      return <CafeScene />;
  }
};
