import React from 'react';
import AnimatedCharacter from './AnimatedCharacter';
import { CharacterId } from '../../types/character';
// TODO: Replace with Professor Hawthorne's actual sprite sheet
import NyajjiSprite from '../../assets/images/characters/nyajji-placeholder.svg';

const ProfessorHawthorne: React.FC = () => {
  return (
    <AnimatedCharacter
      characterId={CharacterId.PROFESSOR_HAWTHORNE}
      spriteSrc={NyajjiSprite} // Placeholder sprite
      x={200}
      y={100}
    />
  );
};

export default ProfessorHawthorne;
