import NyajjiSprite from '../assets/images/characters/nyajji-placeholder.svg';
import ProfessorSprite from '../assets/images/characters/professor-placeholder.svg';

export const characterRegistry = {
  nyajji: {
    id: 'nyajji',
    displayName: 'ニャッジ',
    spriteSrc: NyajjiSprite,
    initialX: 50,
    initialY: 100,
  },
  professorHawthorne: {
    id: 'professorHawthorne',
    displayName: 'ホーソーン教授',
    spriteSrc: ProfessorSprite,
    initialX: 200,
    initialY: 100,
  },
} as const; // 'as const' is important for type inference

export type CharacterId = keyof typeof characterRegistry;
