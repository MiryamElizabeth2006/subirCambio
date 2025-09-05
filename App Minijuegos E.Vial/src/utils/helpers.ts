import { Player, GameResult } from '../types';

// Generar ID único
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Generar código de sala
export const generateRoomCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Validar nombre de jugador
export const validatePlayerName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 20;
};

// Validar código de sala
export const validateRoomCode = (code: string): boolean => {
  return code.trim().length >= 4 && code.trim().length <= 6;
};

// Calcular puntuación
export const calculateScore = (
  isCorrect: boolean,
  timeLeft: number,
  basePoints: number = 100,
  timeBonusMultiplier: number = 2
): number => {
  if (!isCorrect) return 0;
  
  const timeBonus = Math.max(0, timeLeft - 10) * timeBonusMultiplier;
  return basePoints + timeBonus;
};

// Ordenar jugadores por puntuación
export const sortPlayersByScore = (players: Player[]): Player[] => {
  return [...players].sort((a, b) => b.score - a.score);
};

// Obtener posición en ranking
export const getRankPosition = (playerId: string, players: Player[]): number => {
  const sortedPlayers = sortPlayersByScore(players);
  return sortedPlayers.findIndex(p => p.id === playerId) + 1;
};

// Formatear tiempo
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Obtener emoji de posición
export const getPositionEmoji = (position: number): string => {
  switch (position) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return `#${position}`;
  }
};

// Obtener color de posición
export const getPositionColor = (position: number): string => {
  switch (position) {
    case 1: return 'bg-yellow-100 border-yellow-400';
    case 2: return 'bg-gray-100 border-gray-400';
    case 3: return 'bg-orange-100 border-orange-400';
    default: return 'bg-white border-gray-300';
  }
};

// Verificar si es el host
export const isHost = (playerId: string, hostId: string): boolean => {
  return playerId === hostId;
};

// Verificar si se puede iniciar el juego
export const canStartGame = (players: Player[], minPlayers: number = 2): boolean => {
  return players.length >= minPlayers && players.every(p => p.isReady);
};

// Obtener estadísticas del juego
export const getGameStats = (results: GameResult[]) => {
  const totalPlayers = results.length;
  const totalScore = results.reduce((sum, result) => sum + result.score, 0);
  const averageScore = totalScore / totalPlayers;
  const highestScore = Math.max(...results.map(r => r.score));
  const lowestScore = Math.min(...results.map(r => r.score));

  return {
    totalPlayers,
    totalScore,
    averageScore: Math.round(averageScore),
    highestScore,
    lowestScore,
  };
};

// Capitalizar primera letra
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Truncar texto
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

