import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import App from './App'

test('renders headline', () => {
  render(<App />)
  const headline = document.querySelector('h1')
  expect(headline?.textContent).toBe('ココロジック・カフェ')
})
