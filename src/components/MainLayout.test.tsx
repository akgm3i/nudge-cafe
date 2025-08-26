import { test, expect, describe, beforeEach, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import MainLayout from './MainLayout';
import { useGameStore } from '../stores/useGameStore';
import { GamePhase } from '../types/game';
import { CharacterId, CharacterAnimation } from '../types/character';

// Mock the CafeScene component to avoid rendering the canvas and actual characters
vi.mock('./Cafe/CafeScene', () => {
  return {
    default: () => <div data-testid="cafe-scene-mock" />,
  };
});

describe('MainLayout', () => {
  beforeEach(() => {
    // Reset store to a known state before each test
    useGameStore.setState({
      phase: GamePhase.EXPERIENCE,
      money: 100,
      activeDialogue: null,
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

  test('displays a dialogue modal when activeDialogue is set in the store', async () => {
    const screen = render(<MainLayout>Test</MainLayout>);

    // We will use querySelector to check for the absence of the element,
    // as getByRole throws an error and expect().toThrow() is not behaving as expected.
    const heading = screen.container.querySelector('h2');
    expect(heading).toBeNull();

    const testDialogue = {
      characterId: CharacterId.PROFESSOR_HAWTHORNE,
      text: 'テスト用の会話です。',
      choices: [{ id: 'ok', text: 'OK' }],
    };

    // Set active dialogue
    useGameStore.getState().startDialogue(testDialogue);

    // Now, modal should be visible
    await expect
      .element(screen.getByRole('heading', { name: 'ホーソーン教授' }))
      .toBeVisible();
    await expect
      .element(screen.getByText('テスト用の会話です。'))
      .toBeVisible();
  });

  test('renders the main layout structure', async () => {
    const screen = render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>
    );

    // Check for landmark regions
    const header = screen.getByRole('banner');
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    await expect.element(header).toBeInTheDocument();
    await expect.element(main).toBeInTheDocument();
    await expect.element(footer).toBeInTheDocument();
  });

  test('renders header content correctly', async () => {
    const screen = render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>
    );

    // Check for resource placeholders by looking for the icons and numbers
    const initialMoney = useGameStore.getState().money;
    const moneyDisplay = screen.getByText(`🪙 ${String(initialMoney)}`);
    const reputationDisplay = screen.getByText(/⭐\s*5/); // Assuming reputation is static for now
    await expect.element(moneyDisplay).toBeInTheDocument();
    await expect.element(reputationDisplay).toBeInTheDocument();

    // Check for settings button
    const settingsButton = screen.getByRole('button', { name: '設定' });
    await expect.element(settingsButton).toBeInTheDocument();
  });

  test('header content updates when money changes in the store', async () => {
    const screen = render(<MainLayout>Test</MainLayout>);

    // Check initial state
    await expect.element(screen.getByText('🪙 100')).toBeVisible();

    // Trigger a state change that affects money
    const testDialogue = {
      characterId: CharacterId.PROFESSOR_HAWTHORNE,
      text: 'Test',
      choices: [{ id: 'buy', text: 'Buy' }],
    };
    useGameStore.getState().startDialogue(testDialogue);
    useGameStore.getState().handleChoice('buy');

    // Check for updated state
    await expect.element(screen.getByText('🪙 90')).toBeVisible();
  });

  test('renders footer content correctly', async () => {
    const screen = render(
      <MainLayout>
        <div>Test</div>
      </MainLayout>
    );

    // Check for footer buttons
    const noteButton = screen.getByRole('button', { name: 'ノート' });
    const devButton = screen.getByRole('button', { name: 'メニュー開発' });
    const interiorButton = screen.getByRole('button', { name: '内装変更' });

    await expect.element(noteButton).toBeInTheDocument();
    await expect.element(devButton).toBeInTheDocument();
    await expect.element(interiorButton).toBeInTheDocument();
  });

  test('renders children inside the main area', async () => {
    const screen = render(
      <MainLayout>
        <h1>Child Content</h1>
      </MainLayout>
    );
    const child = screen.getByRole('heading', { level: 1 });
    await expect.element(child).toHaveTextContent('Child Content');
  });

  describe('Cafe Scene', () => {
    test('renders the mocked cafe scene', () => {
      const { container } = render(
        <MainLayout>
          <div>Test</div>
        </MainLayout>
      );
      const mockScene = container.querySelector(
        '[data-testid="cafe-scene-mock"]'
      );
      expect(mockScene).not.toBeNull();
    });
  });
});
