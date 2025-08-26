import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './useGameStore';
import { GamePhase } from '../types/game';

describe('useGameStore', () => {
  // Reset the store's state before each test
  beforeEach(() => {
    useGameStore.setState({ phase: GamePhase.EXPERIENCE });
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
