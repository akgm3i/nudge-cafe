import React, { useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { GamePhase } from '../types/game';
import { CharacterAnimation } from '../types/character';
import { characterRegistry, type CharacterId } from '../data/characters';

const DevControls: React.FC = () => {
  const { setPhase, toggleCharacterVisibility, setCharacterAnimation } =
    useGameStore();
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button
        style={{
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: 9999,
        }}
        onClick={() => setIsOpen(true)}
      >
        Open Dev Controls
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 10,
        left: 10,
        zIndex: 9999,
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '10px',
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Dev Controls</h3>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
      <div>
        <h4>Phase</h4>
        <button
          onClick={() => {
            setPhase(GamePhase.EXPERIENCE);
          }}
        >
          Phase: Experience (Cafe)
        </button>
        <button
          onClick={() => {
            setPhase(GamePhase.AWAITING_HYPOTHESIS);
          }}
        >
          Phase: Hypothesis (Notebook)
        </button>
      </div>
      <hr />
      <div>
        <h4>Characters</h4>
        {Object.values(characterRegistry).map((char) => (
          <div key={char.id} data-testid={`character-controls-${char.id}`}>
            <span>{char.displayName}:</span>
            <button
              onClick={() => {
                toggleCharacterVisibility(char.id);
              }}
            >
              Toggle
            </button>
            <button
              onClick={() => {
                setCharacterAnimation(char.id, CharacterAnimation.IDLE);
              }}
            >
              Idle
            </button>
            <button
              onClick={() => {
                setCharacterAnimation(char.id, CharacterAnimation.TALKING);
              }}
            >
              Talking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevControls;
