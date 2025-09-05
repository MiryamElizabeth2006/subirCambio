export interface Player {
  id: string;
  name: string;
  avatar: string;
  age: string;
  score: number;
  isReady: boolean;
  isConnected: boolean;
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

export interface SocketEvents {
  // Cliente -> Servidor
  'join-room': (data: { roomCode: string; player: Omit<Player, 'id' | 'score' | 'isReady' | 'isConnected'> }) => void;
  'leave-room': () => void;
  'player-ready': () => void;
  'answer-question': (data: { questionId: string; answer: number; timeLeft: number }) => void;
  'start-game': () => void;
  
  // Servidor -> Cliente
  'room-joined': (data: { room: Room; playerId: string }) => void;
  'room-left': () => void;
  'player-joined': (player: Player) => void;
  'player-left': (playerId: string) => void;
  'player-ready-updated': (data: { playerId: string; isReady: boolean }) => void;
  'game-started': (data: { room: Room }) => void;
  'question-started': (data: { question: Question; timeLeft: number }) => void;
  'question-ended': (data: { correctAnswer: number; results: { playerId: string; isCorrect: boolean; score: number }[] }) => void;
  'game-ended': (data: { results: GameResult[] }) => void;
  'room-updated': (room: Room) => void;
  'error': (message: string) => void;
}

