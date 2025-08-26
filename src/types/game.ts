export enum GamePhase {
  EXPERIENCE = 'EXPERIENCE',
  AWAITING_HYPOTHESIS = 'AWAITING_HYPOTHESIS',
  AWAITING_APPLICATION = 'AWAITING_APPLICATION',
  AWAITING_COMPLETION = 'AWAITING_COMPLETION',
}

export interface Choice {
  id: string;
  text: string;
}

import { CharacterId } from './character';

export interface Dialogue {
  characterId: CharacterId;
  text: string;
  choices: Choice[];
}
