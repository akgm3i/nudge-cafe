import { test, expect, describe, beforeEach, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import DevControls from './DevControls';
import { useGameStore } from '../stores/useGameStore';
import { CharacterId, CharacterAnimation } from '../types/character';

// Mock the store actions we want to spy on
const toggleCharacterVisibility = vi.fn();
const setCharacterAnimation = vi.fn();

describe('DevControls', () => {
  beforeEach(() => {
    // Reset mocks
    toggleCharacterVisibility.mockClear();
    setCharacterAnimation.mockClear();

    // Mock the implementation of useGameStore
    useGameStore.setState({
      ...useGameStore.getState(),
      toggleCharacterVisibility,
      setCharacterAnimation,
    });
  });

  test('renders character control buttons', () => {
    const screen = render(<DevControls />);
    expect(
      screen.getByRole('button', { name: 'Toggle Nyajji' })
    ).not.toBeNull();
    expect(
      screen.getByRole('button', { name: 'Toggle Professor' })
    ).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Nyajji: Idle' })).not.toBeNull();
    expect(
      screen.getByRole('button', { name: 'Nyajji: Talking' })
    ).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Prof: Idle' })).not.toBeNull();
    expect(
      screen.getByRole('button', { name: 'Prof: Talking' })
    ).not.toBeNull();
  });

  test('calls toggleCharacterVisibility when visibility buttons are clicked', async () => {
    const screen = render(<DevControls />);

    await screen.getByRole('button', { name: 'Toggle Nyajji' }).click();
    expect(toggleCharacterVisibility).toHaveBeenCalledWith(CharacterId.NYAJJI);

    await screen.getByRole('button', { name: 'Toggle Professor' }).click();
    expect(toggleCharacterVisibility).toHaveBeenCalledWith(
      CharacterId.PROFESSOR_HAWTHORNE
    );
  });

  test('calls setCharacterAnimation when animation buttons are clicked', async () => {
    const screen = render(<DevControls />);

    // Test Nyajji's buttons
    await screen.getByRole('button', { name: 'Nyajji: Talking' }).click();
    expect(setCharacterAnimation).toHaveBeenCalledWith(
      CharacterId.NYAJJI,
      CharacterAnimation.TALKING
    );

    await screen.getByRole('button', { name: 'Nyajji: Idle' }).click();
    expect(setCharacterAnimation).toHaveBeenCalledWith(
      CharacterId.NYAJJI,
      CharacterAnimation.IDLE
    );

    // Test Professor's buttons
    await screen.getByRole('button', { name: 'Prof: Talking' }).click();
    expect(setCharacterAnimation).toHaveBeenCalledWith(
      CharacterId.PROFESSOR_HAWTHORNE,
      CharacterAnimation.TALKING
    );

    await screen.getByRole('button', { name: 'Prof: Idle' }).click();
    expect(setCharacterAnimation).toHaveBeenCalledWith(
      CharacterId.PROFESSOR_HAWTHORNE,
      CharacterAnimation.IDLE
    );
  });
});
