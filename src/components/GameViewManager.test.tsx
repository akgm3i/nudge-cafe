import { render } from 'vitest-browser-react';
import { describe, it, expect, vi } from 'vitest';
import { GameViewManager } from './GameViewManager';
import { useGameStore } from '../stores/useGameStore';
import { GamePhase } from '../types/game';

// Mock the store
vi.mock('../stores/useGameStore');

// Mock child components to render semantic elements
vi.mock('./Cafe/CafeScene', () => ({
  __esModule: true,
  default: () => <main>Cafe Scene</main>,
}));

vi.mock('./Notebook', () => ({
  __esModule: true,
  default: () => (
    <article>
      <h1>Notebook</h1>
    </article>
  ),
}));

describe('GameViewManager', () => {
  it('should render CafeScene when phase is EXPERIENCE', async () => {
    // Arrange
    (useGameStore as any).mockReturnValue({ phase: GamePhase.EXPERIENCE });
    const screen = await render(<GameViewManager />);

    // Assert: Check for the main landmark role of the cafe scene
    await expect.element(screen.getByRole('main')).toBeVisible();
    // Assert: Check that the notebook heading is not in the document
    await expect.element(screen.getByRole('heading', { name: 'Notebook' })).not.toBeInTheDocument();
  });

  it('should render Notebook when phase is AWAITING_HYPOTHESIS', async () => {
    // Arrange
    (useGameStore as any).mockReturnValue({ phase: GamePhase.AWAITING_HYPOTHESIS });
    const screen = await render(<GameViewManager />);

    // Assert: Check for the notebook heading
    await expect.element(screen.getByRole('heading', { name: 'Notebook' })).toBeVisible();
    // Assert: Check that the main landmark role is not in the document
    await expect.element(screen.getByRole('main')).not.toBeInTheDocument();
  });
});
