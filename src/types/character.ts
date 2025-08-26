export enum CharacterId {
  NYAJJI = 'nyajji',
  PROFESSOR_HAWTHORNE = 'professorHawthorne',
}

export enum CharacterAnimation {
  IDLE = 'idle',
  TALKING = 'talking',
}

export interface CharacterState {
  isVisible: boolean;
  animation: CharacterAnimation;
}
