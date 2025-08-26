import React from 'react';
import Character from './Character';

const Nyajji: React.FC = () => {
  return (
    <Character
      x={50}
      y={100}
      color="#FFFDD0" // Cream color
      name="nyajji-character"
      text="Nyajji"
    />
  );
};

export default Nyajji;
