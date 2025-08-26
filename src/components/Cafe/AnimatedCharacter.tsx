import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';
import { useGameStore } from '../../stores/useGameStore';
import { CharacterId, CharacterAnimation } from '../../types/character';

// Define a mapping for animation states to sprite sheet rows (Y position)
const ANIMATION_MAP: Record<CharacterAnimation, number> = {
  [CharacterAnimation.IDLE]: 0,
  [CharacterAnimation.TALKING]: 100, // Assuming the 'talking' animation is on the second row
};

interface AnimatedCharacterProps {
  characterId: CharacterId;
  spriteSrc: string;
  x: number;
  y: number;
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  characterId,
  spriteSrc,
  x,
  y,
}) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const imageRef = useRef<Konva.Image>(null);
  const characterState = useGameStore((state) => state.characters[characterId]);

  // Load the character sprite
  useEffect(() => {
    const img = new window.Image();
    img.src = spriteSrc;
    img.onload = () => {
      setImage(img);
    };
  }, [spriteSrc]);

  // Handle the animation based on the character's state from the store
  useEffect(() => {
    const node = imageRef.current;
    if (!image || !node) {
      return;
    }

    const FRAME_WIDTH = 100;
    const FRAME_COUNT = 2; // Assuming 2 frames per animation
    const ANIMATION_SPEED_MS = 500;
    let currentFrame = 0;

    const anim = new Konva.Animation((frame) => {
      if (!frame) return;
      const frameIndex =
        Math.floor(frame.time / ANIMATION_SPEED_MS) % FRAME_COUNT;

      if (frameIndex !== currentFrame) {
        currentFrame = frameIndex;
        node.cropX(currentFrame * FRAME_WIDTH);
      }

      // Set the animation row based on the character's state
      const animationY = ANIMATION_MAP[characterState.animation];
      node.cropY(animationY);
    }, node.getLayer());

    anim.start();

    return () => {
      anim.stop();
    };
  }, [image, characterState]);

  if (!characterState.isVisible) {
    return null;
  }

  return (
    <Image
      ref={imageRef}
      image={image}
      x={x}
      y={y}
      width={100}
      height={100}
      crop={{ x: 0, y: 0, width: 100, height: 100 }}
      name={`${characterId}-character`}
    />
  );
};

export default AnimatedCharacter;
