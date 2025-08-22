import { test, expect, describe } from 'vitest';
import { render } from 'vitest-browser-react';
import MainLayout from './MainLayout';

describe('MainLayout', () => {
  test('renders the main layout structure', async () => {
    const screen = render(<MainLayout><div>Test</div></MainLayout>);

    // Check for landmark regions
    const header = screen.getByRole('banner');
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    await expect.element(header).toBeInTheDocument();
    await expect.element(main).toBeInTheDocument();
    await expect.element(footer).toBeInTheDocument();
  });

  test('renders header content correctly', async () => {
    const screen = render(<MainLayout><div>Test</div></MainLayout>);

    // Check for resource placeholders by looking for the icons and numbers
    const moneyDisplay = screen.getByText(/🪙\s*100/);
    const reputationDisplay = screen.getByText(/⭐\s*5/);
    await expect.element(moneyDisplay).toBeInTheDocument();
    await expect.element(reputationDisplay).toBeInTheDocument();

    // Check for settings button
    const settingsButton = screen.getByRole('button', { name: '設定' });
    await expect.element(settingsButton).toBeInTheDocument();
  });

  test('renders footer content correctly', async () => {
    const screen = render(<MainLayout><div>Test</div></MainLayout>);

    // Check for footer buttons
    const noteButton = screen.getByRole('button', { name: 'ノート' });
    const devButton = screen.getByRole('button', { name: 'メニュー開発' });
    const interiorButton = screen.getByRole('button', { name: '内装変更' });

    await expect.element(noteButton).toBeInTheDocument();
    await expect.element(devButton).toBeInTheDocument();
    await expect.element(interiorButton).toBeInTheDocument();
  });

  test('renders children inside the main area', async () => {
    const screen = render(<MainLayout><h1>Child Content</h1></MainLayout>);
    const child = screen.getByRole('heading', { level: 1 });
    await expect.element(child).toHaveTextContent('Child Content');
  });
});
