import MainLayout from './components/MainLayout';
import { GameViewManager } from './components/GameViewManager';
import { useGameStore } from './stores/useGameStore';
import { GamePhase } from './types/game';

function App() {
  const { setPhase } = useGameStore();

  return (
    <MainLayout>
      <GameViewManager />

      {/* Temporary buttons for testing phase switching */}
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
    </MainLayout>
  );
}

export default App;
