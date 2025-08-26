import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';
import NyajjiSprite from '../../assets/images/characters/nyajji-placeholder.svg';

const Nyajji: React.FC = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = NyajjiSprite;
    img.onload = () => {
      setImage(img);
    };
  }, []);

  useEffect(() => {
    const node = imageRef.current;
    if (!image || !node) {
      return;
    }

    const FRAME_WIDTH = 100;
    const FRAME_COUNT = 2;
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
    }, node.getLayer());

    anim.start();

    return () => {
      anim.stop();
    };
  }, [image]);

  return (
    <Image
      ref={imageRef}
      image={image}
      x={50}
      y={100}
      width={100}
      height={100}
      crop={{ x: 0, y: 0, width: 100, height: 100 }}
      name="nyajji-character"
    />
  );
};

export default Nyajji;
