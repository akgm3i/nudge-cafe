import React, { type ReactNode } from 'react';
import styles from './MainLayout.module.css';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header role="banner" className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <span className={styles.resource}>🪙 100</span>
            <span>⭐ 5</span>
          </div>
          <button aria-label="設定">⚙️</button>
        </div>
      </header>

      <main role="main" className={styles.main}>
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
