import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './useGameStore';
import { GamePhase } from '../types/game';

describe('useGameStore', () => {
  // Reset the store's state before each test
  beforeEach(() => {
    useGameStore.setState({
      phase: GamePhase.EXPERIENCE,
      money: 100,
      activeDialogue: null,
    });
  });

  it('handleChoice should update money and end dialogue for "buy" choice', () => {
    // Arrange: start a dialogue
    const testDialogue = {
      npcName: 'Test',
      text: 'Test',
      choices: [{ id: 'buy', text: 'Buy' }],
    };
    useGameStore.getState().startDialogue(testDialogue);
    expect(useGameStore.getState().money).toBe(100);
    expect(useGameStore.getState().activeDialogue).not.toBeNull();

    // Act
    useGameStore.getState().handleChoice('buy');

    // Assert
    const state = useGameStore.getState();
    expect(state.money).toBe(90);
    expect(state.activeDialogue).toBeNull();
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
});
