import React, { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header role="banner" style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ marginRight: '1.5rem' }}>🪙 100</span>
            <span>⭐ 5</span>
          </div>
          <button aria-label="設定">⚙️</button>
        </div>
      </header>

      <main role="main" style={{ flex: 1, padding: '1rem' }}>
        {children}
      </main>

      <footer role="contentinfo" style={{ padding: '1rem', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around' }}>
        <button>ノート</button>
        <button>メニュー開発</button>
        <button>内装変更</button>
      </footer>
    </div>
  );
};

export default MainLayout;
