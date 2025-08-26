import React from 'react';
import { Group, Rect, Text } from 'react-konva';

interface CharacterProps {
  x: number;
  y: number;
  color: string;
  name: string;
  text: string;
}

const Character: React.FC<CharacterProps> = ({ x, y, color, name, text }) => {
  return (
    <Group x={x} y={y} name={name}>
      <Rect width={80} height={50} fill={color} cornerRadius={10} />
      <Text
        text={text}
        fontSize={14}
        fill="white"
        width={80}
        height={50}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};

export default Character;
