export enum CharacterAnimation {
  IDLE = 'idle',
  TALKING = 'talking',
}

export interface CharacterState {
  isVisible: boolean;
  animation: CharacterAnimation;
}
