import React, { type ReactNode } from 'react';
import styles from './MainLayout.module.css';
import { useGameStore } from '../stores/useGameStore';
import DialogueModal from './DialogueModal';
import CafeScene from './Cafe/CafeScene';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { activeDialogue, handleChoice, money } = useGameStore();

  return (
    <div className={styles.container}>
      {activeDialogue && (
        <DialogueModal
          characterId={activeDialogue.characterId}
          text={activeDialogue.text}
          choices={activeDialogue.choices}
          onSelectChoice={handleChoice}
        />
      )}
      <header role="banner" className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <span className={styles.resource}>🪙 {money}</span>
            <span>⭐ 5</span>
          </div>
          <button aria-label="設定">⚙️</button>
        </div>
      </header>

      <main role="main" className={styles.main}>
        <CafeScene />
        {children}
      </main>

      <footer role="contentinfo" className={styles.footer}>
        <button>ノート</button>
        <button>メニュー開発</button>
        <button>内装変更</button>
      </footer>
    </div>
  );
};

export default MainLayout;
