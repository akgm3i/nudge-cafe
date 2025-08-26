import React from 'react';
import Character from './Character';

const ProfessorHawthorne: React.FC = () => {
  return (
    <Character
      x={200}
      y={100}
      color="saddlebrown"
      name="hawthorne-character"
      text="Professor"
    />
  );
};

export default ProfessorHawthorne;
