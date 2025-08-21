import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import App from './App';

test('renders headline', async () => {
  const screen = render(<App />);
  const headline = screen.getByRole('heading', { level: 1 });
  await expect.element(headline).toHaveTextContent('ココロジック・カフェ');
});
