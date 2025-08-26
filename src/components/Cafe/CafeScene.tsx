import React from 'react';
import CafeBackground from './CafeBackground';
import Nyajji from './Nyajji';
import ProfessorHawthorne from './ProfessorHawthorne';

const CafeScene: React.FC = () => {
  return (
    <>
      <CafeBackground />
      <Nyajji />
      <ProfessorHawthorne />
    </>
  );
};

export default CafeScene;
