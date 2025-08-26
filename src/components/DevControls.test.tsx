import { test, expect, describe, beforeEach, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import DevControls from './DevControls';
import { useGameStore } from '../stores/useGameStore';
import { CharacterAnimation } from '../types/character';
import { characterRegistry } from '../data/characters';

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

  test('renders character control buttons for all registered characters', () => {
    const screen = render(<DevControls />);
    for (const char of Object.values(characterRegistry)) {
      expect(screen.getByText(char.displayName)).not.toBeNull();
    }
  });

  test('calls store actions with correct characterId when buttons are clicked', async () => {
    const screen = render(<DevControls />);

    for (const char of Object.values(characterRegistry)) {
      const charContainer = screen.getByTestId(`character-controls-${char.id}`);
      expect(charContainer).not.toBeNull();

      // Test Toggle button
      await charContainer.getByRole('button', { name: 'Toggle' }).click();
      expect(toggleCharacterVisibility).toHaveBeenCalledWith(char.id);

      // Test Idle button
      await charContainer.getByRole('button', { name: 'Idle' }).click();
      expect(setCharacterAnimation).toHaveBeenCalledWith(
        char.id,
        CharacterAnimation.IDLE
      );

      // Test Talking button
      await charContainer.getByRole('button', { name: 'Talking' }).click();
      expect(setCharacterAnimation).toHaveBeenCalledWith(
        char.id,
        CharacterAnimation.TALKING
      );
    }
  });

  test('toggles the control panel visibility', async () => {
    const screen = render(<DevControls />);

    // Find and click the close button
    await screen.getByRole('button', { name: 'Close' }).click();

    // The main panel should be gone, only the "Open" button should be visible
    const heading = screen.container.querySelector('h3');
    expect(heading).toBeNull();

    const openButton = screen.getByRole('button', {
      name: 'Open Dev Controls',
    });
    expect(openButton).not.toBeNull();

    // Click the open button
    await openButton.click();

    // The main panel should be back
    const headingAfterOpen = screen.container.querySelector('h3');
    expect(headingAfterOpen).not.toBeNull();
    expect(headingAfterOpen?.textContent).toBe('Dev Controls');
  });
});
