import React from 'react';
import { useGameStore } from '../stores/useGameStore';
import { GamePhase } from '../types/game';
import { CharacterAnimation, CharacterId } from '../types/character';

const DevControls: React.FC = () => {
  const { setPhase, toggleCharacterVisibility, setCharacterAnimation } =
    useGameStore();

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
      <h3>Dev Controls</h3>
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
        <div>
          <span>Nyajji:</span>
          <button
            onClick={() => {
              toggleCharacterVisibility(CharacterId.NYAJJI);
            }}
          >
            Toggle Nyajji
          </button>
          <button
            onClick={() => {
              setCharacterAnimation(
                CharacterId.NYAJJI,
                CharacterAnimation.IDLE
              );
            }}
          >
            Nyajji: Idle
          </button>
          <button
            onClick={() => {
              setCharacterAnimation(
                CharacterId.NYAJJI,
                CharacterAnimation.TALKING
              );
            }}
          >
            Nyajji: Talking
          </button>
        </div>
        <div>
          <span>Professor:</span>
          <button
            onClick={() => {
              toggleCharacterVisibility(CharacterId.PROFESSOR_HAWTHORNE);
            }}
          >
            Toggle Professor
          </button>
          <button
            onClick={() => {
              setCharacterAnimation(
                CharacterId.PROFESSOR_HAWTHORNE,
                CharacterAnimation.IDLE
              );
            }}
          >
            Prof: Idle
          </button>
          <button
            onClick={() => {
              setCharacterAnimation(
                CharacterId.PROFESSOR_HAWTHORNE,
                CharacterAnimation.TALKING
              );
            }}
          >
            Prof: Talking
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevControls;
