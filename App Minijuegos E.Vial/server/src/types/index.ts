export interface Player {
  id: string;
  name: string;
  avatar: string;
  age: string;
  score: number;
  isReady: boolean;
  isConnected: boolean;
  socketId: string;
}

export interface Room {
  id: string;
  code: string;
  hostId: string;
  players: Player[];
  gameMode: GameMode;
  status: RoomStatus;
  currentQuestion?: Question;
  questionIndex: number;
  totalQuestions: number;
  timeLeft: number;
  results: GameResult[];
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuestionOption {
  id: number;
  text: string;
  icon: string;
}

export interface GameResult {
  playerId: string;
  playerName: string;
  score: number;
  correctAnswers: number;
  totalAnswers: number;
  timeBonus: number;
}

export type GameMode = '1v1' | 'all-vs-all' | 'tournament';
export type RoomStatus = 'waiting' | 'starting' | 'playing' | 'finished';

export interface JoinRoomData {
  roomCode: string;
  player: Omit<Player, 'id' | 'score' | 'isReady' | 'isConnected' | 'socketId'>;
}

export interface AnswerData {
  questionId: string;
  answer: number;
  timeLeft: number;
}

