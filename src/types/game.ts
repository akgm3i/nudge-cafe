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

export interface Dialogue {
  npcName: string;
  text: string;
  choices: Choice[];
}
