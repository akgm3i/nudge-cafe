/// <reference types="@vitest/browser/context" />
import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import DialogueModal from './DialogueModal';
import React from 'react';

import { type CharacterId } from '../types/character';

test('DialogueModal should render dialogue, choices, and call onSelectChoice when a choice is made', async () => {
  // Arrange
  const handleSelectChoice = vi.fn();
  const dialogueProps = {
    characterId: 'professorHawthorne' as CharacterId,
    text: '良い品があるんだ、見ていかないかい？',
    choices: [
      { id: 'buy', text: '買う' },
      { id: 'not-buy', text: '買わない' },
    ],
    onSelectChoice: handleSelectChoice,
  };

  // Act
  const screen = render(<DialogueModal {...dialogueProps} />);

  // Assert
  // Check if NPC name and dialogue text are visible
  const npcNameElement = screen.getByText('ホーソーン教授');
  await expect.element(npcNameElement).toBeVisible();

  const textElement = screen.getByText('良い品があるんだ、見ていかないかい？');
  await expect.element(textElement).toBeVisible();

  // Check if choice buttons are rendered
  const buyButton = screen.getByRole('button', { name: '買う' });
  await expect.element(buyButton).toBeVisible();

  const notBuyButton = screen.getByRole('button', { name: '買わない' });
  await expect.element(notBuyButton).toBeVisible();

  // Act on a choice
  await buyButton.click();

  // Assert that the callback was called with the correct choice id
  expect(handleSelectChoice).toHaveBeenCalledOnce();
  expect(handleSelectChoice).toHaveBeenCalledWith('buy');
});
