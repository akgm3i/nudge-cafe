import React, { useRef, useLayoutEffect } from 'react';
import { Group, Rect, Text } from 'react-konva';
import Konva from 'konva';

interface CharacterProps {
  x: number;
  y: number;
  color: string;
  name: string;
  text: string;
}

const Character: React.FC<CharacterProps> = ({ x, y, color, name, text }) => {
  const groupRef = useRef<Konva.Group>(null);

  useLayoutEffect(() => {
    const node = groupRef.current;
    if (!node) {
      return;
    }

    const amplitude = 30;
    const period = 2000 + Math.random() * 1000;
    const initialX = x;

    const anim = new Konva.Animation(frame => {
      if (!frame) return;
      const newX = amplitude * Math.sin((frame.time * 2 * Math.PI) / period) + initialX;
      node.x(newX);
    }, node.getLayer());

    anim.start();

    return () => {
      anim.stop();
    };
  }, [x]);

  return (
    <Group ref={groupRef} x={x} y={y} name={name}>
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
