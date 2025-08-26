import React from 'react';
import styles from './DialogueModal.module.css';
import type { Dialogue } from '../types/game';
import { characterRegistry, type CharacterId } from '../data/characters';

const CHARACTER_DISPLAY_NAMES: Record<CharacterId, string> = {
  nyajji: 'ニャッジ',
  professorHawthorne: 'ホーソーン教授',
};

interface DialogueModalProps extends Dialogue {
  onSelectChoice: (choiceId: string) => void;
}

const DialogueModal: React.FC<DialogueModalProps> = ({
  characterId,
  text,
  choices,
  onSelectChoice,
}) => {
  const npcName = CHARACTER_DISPLAY_NAMES[characterId] || '???';
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.npcName}>{npcName}</h2>
        </div>
        <div className={styles.content}>
          <p>{text}</p>
        </div>
        <div className={styles.choices}>
          {choices.map((choice) => (
            <button
              key={choice.id}
              className={styles.choiceButton}
              onClick={() => {
                onSelectChoice(choice.id);
              }}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DialogueModal;
