import React, { useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { useElementSize } from '../../hooks/useElementSize';
import CafeBackground from './CafeBackground';
import { characterRegistry } from '../../data/characters';
import AnimatedCharacter from './AnimatedCharacter';

const CafeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useElementSize(containerRef);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Stage width={width} height={height}>
        <Layer>
          <CafeBackground width={width} height={height} />
          {Object.values(characterRegistry).map((char) => (
            <AnimatedCharacter
              key={char.id}
              characterId={char.id}
              spriteSrc={char.spriteSrc}
              x={char.initialX}
              y={char.initialY}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default CafeScene;
