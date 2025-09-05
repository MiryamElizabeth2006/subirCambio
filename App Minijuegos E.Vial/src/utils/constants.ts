// Configuración de la aplicación
export const APP_CONFIG = {
  SERVER_URL: 'http://localhost:3001',
  QUESTION_TIME_LIMIT: 30,
  MAX_PLAYERS_PER_ROOM: 8,
  MIN_PLAYERS_TO_START: 2,
  TOTAL_QUESTIONS: 10,
  POINTS_PER_CORRECT_ANSWER: 100,
  TIME_BONUS_MULTIPLIER: 2,
};

// Colores del tema
export const COLORS = {
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  secondary: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  }
};

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  SPRING: {
    damping: 15,
    stiffness: 150,
  },
  TIMING: {
    duration: 500,
  },
  DELAYS: {
    STAGGER: 100,
    QUESTION_TRANSITION: 3000,
    GAME_START: 3000,
  }
};

// Mensajes de la aplicación
export const MESSAGES = {
  ERRORS: {
    NETWORK: 'Error de conexión. Verifica tu internet.',
    ROOM_NOT_FOUND: 'Sala no encontrada. Verifica el código.',
    ROOM_FULL: 'La sala está llena.',
    INVALID_NAME: 'El nombre debe tener al menos 2 caracteres.',
    INVALID_ROOM_CODE: 'El código debe tener al menos 4 caracteres.',
    MIN_PLAYERS: 'Necesitas al menos 2 jugadores para empezar.',
    HOST_ONLY: 'Solo el host puede iniciar el juego.',
  },
  SUCCESS: {
    ROOM_JOINED: '¡Te uniste a la sala exitosamente!',
    GAME_STARTED: '¡El juego ha comenzado!',
    CORRECT_ANSWER: '¡Correcto! +{points} puntos',
    GAME_ENDED: '¡Juego terminado!',
  },
  INFO: {
    WAITING_PLAYERS: 'Esperando más jugadores...',
    ALL_READY: '¡Todos listos! El host puede iniciar.',
    QUESTION_STARTING: 'Preparando pregunta...',
    NEXT_QUESTION: 'Siguiente pregunta en {seconds}s',
  }
};

// Configuración de dificultad por edad
export const DIFFICULTY_BY_AGE = {
  '5-7': 'easy',
  '8-10': 'medium',
  '11-12': 'hard',
} as const;

// Categorías de preguntas
export const QUESTION_CATEGORIES = [
  'Semáforos',
  'Peatones',
  'Bicicletas',
  'Señales',
  'Velocidad',
  'Autobuses',
  'Seguridad',
] as const;

