import React from 'react';

const CafeBackground: React.FC = () => {
  return (
    <div
      data-testid="cafe-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#f0e6d2',
        zIndex: -1,
      }}
    />
  );
};

export default CafeBackground;
