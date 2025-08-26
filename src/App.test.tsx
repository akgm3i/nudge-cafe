/// <reference types="@vitest/browser/context" />
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from './App';

test('renders dev controls and initial view', async () => {
  const screen = await render(<App />);

  // Check that the dev controls are visible
  const devControlsHeader = screen.getByRole('heading', {
    level: 3,
    name: 'Dev Controls',
  });
  await expect.element(devControlsHeader).toBeVisible();
});
