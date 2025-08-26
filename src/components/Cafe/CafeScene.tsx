import React, { useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { useElementSize } from '../../hooks/useElementSize';
import CafeBackground from './CafeBackground';
import Nyajji from './Nyajji';
import ProfessorHawthorne from './ProfessorHawthorne';

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
        zIndex: -1,
      }}
    >
      <Stage width={width} height={height}>
        <Layer>
          <CafeBackground width={width} height={height} />
          <Nyajji />
          <ProfessorHawthorne />
        </Layer>
      </Stage>
    </div>
  );
};

export default CafeScene;
