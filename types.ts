
export enum View {
  HOME = 'home',
  THEORY = 'theory',
  GAMES = 'games',
  QUIZ = 'quiz',
  TUTOR = 'tutor',
  SETTINGS = 'settings'
}

export interface Identity {
  id: number;
  title: string;
  formula: string;
  simpleExplanation: string;
  example: {
    steps: string[];
    result: string;
  };
  mnemonic: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface GameScore {
  gameId: string;
  score: number;
  stars: number;
}
