import MainLayout from './components/MainLayout';
import { GameViewManager } from './components/GameViewManager';
import DevControls from './components/DevControls';

function App() {
  return (
    <MainLayout>
      <GameViewManager />

      {/* Temporary buttons for testing phase switching */}
      {import.meta.env.DEV && <DevControls />}
    </MainLayout>
  );
}

export default App;
