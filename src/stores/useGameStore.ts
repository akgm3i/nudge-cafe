import { create } from 'zustand';
import { GamePhase } from '../types/game';

interface GameState {
  phase: GamePhase;
  setPhase: (phase: GamePhase) => void;
}

export const useGameStore = create<GameState>((set) => ({
  phase: GamePhase.EXPERIENCE,
  setPhase: (newPhase) => set({ phase: newPhase }),
}));
