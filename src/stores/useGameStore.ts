import { create } from 'zustand';
import { GamePhase, type Dialogue, ConsequenceType } from '../types/game';
import {
  type CharacterState,
  CharacterId,
  CharacterAnimation,
} from '../types/character';

interface GameState {
  phase: GamePhase;
  activeDialogue: Dialogue | null;
  money: number;
  characters: Record<CharacterId, CharacterState>;
  setPhase: (phase: GamePhase) => void;
  startDialogue: (dialogue: Dialogue) => void;
  endDialogue: () => void;
  handleChoice: (choiceId: string) => void;
  toggleCharacterVisibility: (characterId: CharacterId) => void;
  setCharacterAnimation: (
    characterId: CharacterId,
    animation: CharacterAnimation
  ) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  phase: GamePhase.EXPERIENCE,
  activeDialogue: null,
  money: 100,
  characters: {
    [CharacterId.NYAJJI]: {
      isVisible: true,
      animation: CharacterAnimation.IDLE,
    },
    [CharacterId.PROFESSOR_HAWTHORNE]: {
      isVisible: true,
      animation: CharacterAnimation.IDLE,
    },
  },
  setPhase: (newPhase) => {
    set({ phase: newPhase });
  },
  startDialogue: (dialogue) => {
    set((state) => {
      // When a dialogue starts, set the speaking character's animation to "talking"
      const { characterId } = dialogue;
      const newCharactersState = { ...state.characters };
      newCharactersState[characterId] = {
        ...newCharactersState[characterId],
        animation: CharacterAnimation.TALKING,
      };
      return {
        activeDialogue: dialogue,
        characters: newCharactersState,
      };
    });
  },
  endDialogue: () => {
    set((state) => {
      // When dialogue ends, reset the speaking character's animation to "idle"
      const characterId = state.activeDialogue?.characterId;
      const newCharactersState = { ...state.characters };
      if (characterId) {
        newCharactersState[characterId] = {
          ...newCharactersState[characterId],
          animation: CharacterAnimation.IDLE,
        };
      }
      return {
        activeDialogue: null,
        characters: newCharactersState,
      };
    });
  },
  handleChoice: (choiceId) => {
    const { activeDialogue } = get();
    if (!activeDialogue) return;

    const choice = activeDialogue.choices.find((c) => c.id === choiceId);
    if (!choice) return;

    // Process consequences
    if (choice.consequences) {
      let currentMoney = get().money;
      for (const consequence of choice.consequences) {
        switch (consequence.type) {
          case ConsequenceType.UPDATE_MONEY:
            currentMoney += consequence.payload as number;
            break;
          // Other consequence types can be handled here in the future
        }
      }
      set({ money: currentMoney });
    }

    // Any choice ends the dialogue
    get().endDialogue();
  },
  toggleCharacterVisibility: (characterId) => {
    set((state) => ({
      characters: {
        ...state.characters,
        [characterId]: {
          ...state.characters[characterId],
          isVisible: !state.characters[characterId].isVisible,
        },
      },
    }));
  },
  setCharacterAnimation: (characterId, animation) => {
    set((state) => ({
      characters: {
        ...state.characters,
        [characterId]: {
          ...state.characters[characterId],
          animation: animation,
        },
      },
    }));
  },
}));
