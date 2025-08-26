import React from 'react';
import AnimatedCharacter from './AnimatedCharacter';
import { CharacterId } from '../../types/character';
import NyajjiSprite from '../../assets/images/characters/nyajji-placeholder.svg';

const Nyajji: React.FC = () => {
  return (
    <AnimatedCharacter
      characterId={CharacterId.NYAJJI}
      spriteSrc={NyajjiSprite}
      x={50}
      y={100}
    />
  );
};

export default Nyajji;
