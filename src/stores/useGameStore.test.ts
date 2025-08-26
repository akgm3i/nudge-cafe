import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './useGameStore';
import { GamePhase, ConsequenceType } from '../types/game';
import { CharacterAnimation, CharacterId } from '../types/character';

describe('useGameStore', () => {
  // Reset the store's state before each test
  beforeEach(() => {
    // We need to reset the entire store to its initial state
    // This is because Zustand's `create` is only called once.
    const initialState = useGameStore.getState();
    useGameStore.setState({
      ...initialState,
      phase: GamePhase.EXPERIENCE,
      money: 100,
      activeDialogue: null,
      // Also reset any new state properties here
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
    });
  });

  it('handleChoice should process UPDATE_MONEY consequence', () => {
    // Arrange: start a dialogue with a choice that has consequences
    const testDialogue = {
      characterId: CharacterId.PROFESSOR_HAWTHORNE,
      text: 'Do you want to buy this item for 20 gold?',
      choices: [
        {
          id: 'buy-item',
          text: 'Yes, buy it.',
          consequences: [{ type: ConsequenceType.UPDATE_MONEY, payload: -20 }],
        },
        { id: 'dont-buy', text: 'No, thanks.' },
      ],
    };
    useGameStore.getState().startDialogue(testDialogue);
    expect(useGameStore.getState().money).toBe(100);

    // Act
    useGameStore.getState().handleChoice('buy-item');

    // Assert
    const state = useGameStore.getState();
    expect(state.money).toBe(80); // 100 - 20 = 80
    expect(state.activeDialogue).toBeNull(); // Dialogue should still end
  });

  it('should initialize with the EXPERIENCE phase', () => {
    const { phase } = useGameStore.getState();
    expect(phase).toBe(GamePhase.EXPERIENCE);
  });

  it('should allow updating the phase using the setPhase action', () => {
    // Get the action from the store
    const { setPhase } = useGameStore.getState();

    // Call the action
    setPhase(GamePhase.AWAITING_HYPOTHESIS);

    // Verify the state has changed
    const { phase } = useGameStore.getState();
    expect(phase).toBe(GamePhase.AWAITING_HYPOTHESIS);
  });

  describe('character state management', () => {
    it('should initialize with default character states', () => {
      const { characters } = useGameStore.getState();
      expect(characters).toBeDefined();
      expect(characters.nyajji).toEqual({
        isVisible: true,
        animation: CharacterAnimation.IDLE,
      });
      expect(characters.professorHawthorne).toEqual({
        isVisible: true,
        animation: CharacterAnimation.IDLE,
      });
    });

    it('toggleCharacterVisibility should flip the isVisible state', () => {
      const { toggleCharacterVisibility } = useGameStore.getState();

      // Toggle Nyajji's visibility
      toggleCharacterVisibility(CharacterId.NYAJJI);
      let characters = useGameStore.getState().characters;
      expect(characters.nyajji.isVisible).toBe(false);

      // Toggle it back
      toggleCharacterVisibility(CharacterId.NYAJJI);
      characters = useGameStore.getState().characters;
      expect(characters.nyajji.isVisible).toBe(true);
    });

    it('setCharacterAnimation should update the animation state', () => {
      const { setCharacterAnimation } = useGameStore.getState();

      // Change Nyajji's animation to TALKING
      setCharacterAnimation(CharacterId.NYAJJI, CharacterAnimation.TALKING);
      let characters = useGameStore.getState().characters;
      expect(characters.nyajji.animation).toBe(CharacterAnimation.TALKING);

      // Change it back to IDLE
      setCharacterAnimation(CharacterId.NYAJJI, CharacterAnimation.IDLE);
      characters = useGameStore.getState().characters;
      expect(characters.nyajji.animation).toBe(CharacterAnimation.IDLE);
    });

    it('startDialogue should set the speaking character animation to TALKING', () => {
      const { startDialogue } = useGameStore.getState();
      const testDialogue = {
        characterId: CharacterId.PROFESSOR_HAWTHORNE,
        text: 'Hello there!',
        choices: [{ id: '1', text: 'Hi' }],
      };

      startDialogue(testDialogue);

      const { characters } = useGameStore.getState();
      expect(characters[CharacterId.PROFESSOR_HAWTHORNE].animation).toBe(
        CharacterAnimation.TALKING
      );
      // Other characters should remain idle
      expect(characters[CharacterId.NYAJJI].animation).toBe(
        CharacterAnimation.IDLE
      );
    });

    it('endDialogue should reset the speaking character animation to IDLE', () => {
      const { startDialogue, endDialogue } = useGameStore.getState();
      const testDialogue = {
        characterId: CharacterId.PROFESSOR_HAWTHORNE,
        text: 'Hello there!',
        choices: [{ id: '1', text: 'Hi' }],
      };

      // Start dialogue to set to TALKING
      startDialogue(testDialogue);
      expect(
        useGameStore.getState().characters[CharacterId.PROFESSOR_HAWTHORNE]
          .animation
      ).toBe(CharacterAnimation.TALKING);

      // End dialogue
      endDialogue();

      const { characters } = useGameStore.getState();
      expect(characters[CharacterId.PROFESSOR_HAWTHORNE].animation).toBe(
        CharacterAnimation.IDLE
      );
    });
  });
});
