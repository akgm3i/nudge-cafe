export enum GamePhase {
  EXPERIENCE = 'EXPERIENCE',
  AWAITING_HYPOTHESIS = 'AWAITING_HYPOTHESIS',
  AWAITING_APPLICATION = 'AWAITING_APPLICATION',
  AWAITING_COMPLETION = 'AWAITING_COMPLETION',
}

export enum ConsequenceType {
  UPDATE_MONEY = 'UPDATE_MONEY',
  START_DIALOGUE = 'START_DIALOGUE',
}

export interface Consequence {
  type: ConsequenceType;
  payload: unknown;
}

export interface Choice {
  id: string;
  text: string;
  consequences?: Consequence[];
}

import type { CharacterId } from '../data/characters';

export interface Dialogue {
  characterId: CharacterId;
  text: string;
  choices: Choice[];
}
