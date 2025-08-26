import React from 'react';
import { Rect } from 'react-konva';

interface CafeBackgroundProps {
  width: number;
  height: number;
}

const CafeBackground: React.FC<CafeBackgroundProps> = ({ width, height }) => {
  return (
    <Rect
      x={0}
      y={0}
      width={width}
      height={height}
      fill="#f0e6d2"
      name="cafe-background"
    />
  );
};

export default CafeBackground;
