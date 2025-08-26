import React from 'react';
import { useGameStore } from '../stores/useGameStore';
import { GamePhase } from '../types/game';

const DevControls: React.FC = () => {
  const { setPhase } = useGameStore();

  return (
    <div
      style={{
        position: 'fixed',
        top: 10,
        left: 10,
        zIndex: 9999,
        background: 'white',
        padding: '10px',
        border: '1px solid black',
      }}
    >
      <h3>Dev Controls</h3>
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
  );
};

export default DevControls;
