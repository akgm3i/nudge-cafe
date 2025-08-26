import { create } from 'zustand';
import { GamePhase, type Dialogue } from '../types/game';

interface GameState {
  phase: GamePhase;
  activeDialogue: Dialogue | null;
  money: number;
  setPhase: (phase: GamePhase) => void;
  startDialogue: (dialogue: Dialogue) => void;
  endDialogue: () => void;
  handleChoice: (choiceId: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: GamePhase.EXPERIENCE,
  activeDialogue: null,
  money: 100,
  setPhase: (newPhase) => {
    set({ phase: newPhase });
  },
  startDialogue: (dialogue) => {
    set({ activeDialogue: dialogue });
  },
  endDialogue: () => {
    set({ activeDialogue: null });
  },
  handleChoice: (choiceId) => {
    // This is a simplified logic. A real implementation would
    // have the consequences defined in the dialogue data itself.
    if (choiceId === 'buy') {
      const currentMoney = get().money;
      set({ money: currentMoney - 10 });
    }
    // Any choice ends the dialogue
    get().endDialogue();
  },
}));
