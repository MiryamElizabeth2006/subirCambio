import { Question } from '../types';

export const educationVialQuestions: Question[] = [
  {
    id: '1',
    text: '¿Qué significa la luz verde del semáforo?',
    options: [
      { id: 0, text: 'Parar', icon: '🛑' },
      { id: 1, text: 'Pasar', icon: '✅' },
      { id: 2, text: 'Esperar', icon: '⏳' }
    ],
    correctAnswer: 1,
    category: 'Semáforos',
    difficulty: 'easy'
  },
  {
    id: '2',
    text: '¿Qué significa la luz roja del semáforo?',
    options: [
      { id: 0, text: 'Parar', icon: '🛑' },
      { id: 1, text: 'Pasar', icon: '✅' },
      { id: 2, text: 'Cuidado', icon: '⚠️' }
    ],
    correctAnswer: 0,
    category: 'Semáforos',
    difficulty: 'easy'
  },
  {
    id: '3',
    text: '¿Qué significa la luz amarilla del semáforo?',
    options: [
      { id: 0, text: 'Parar', icon: '🛑' },
      { id: 1, text: 'Pasar', icon: '✅' },
      { id: 2, text: 'Prepararse', icon: '⚠️' }
    ],
    correctAnswer: 2,
    category: 'Semáforos',
    difficulty: 'easy'
  },
  {
    id: '4',
    text: '¿Quién tiene la preferencia en un cruce peatonal?',
    options: [
      { id: 0, text: 'Los carros', icon: '🚗' },
      { id: 1, text: 'Los peatones', icon: '🚶‍♂️' },
      { id: 2, text: 'Las bicicletas', icon: '🚲' }
    ],
    correctAnswer: 1,
    category: 'Peatones',
    difficulty: 'easy'
  },
  {
    id: '5',
    text: '¿Qué debes usar al montar bicicleta de noche?',
    options: [
      { id: 0, text: 'Casco', icon: '⛑️' },
      { id: 1, text: 'Luces', icon: '💡' },
      { id: 2, text: 'Guantes', icon: '🧤' }
    ],
    correctAnswer: 1,
    category: 'Bicicletas',
    difficulty: 'medium'
  },
  {
    id: '6',
    text: '¿Dónde deben caminar los peatones?',
    options: [
      { id: 0, text: 'En la calle', icon: '🛣️' },
      { id: 1, text: 'En la acera', icon: '🚶‍♂️' },
      { id: 2, text: 'En el carril', icon: '🚗' }
    ],
    correctAnswer: 1,
    category: 'Peatones',
    difficulty: 'easy'
  },
  {
    id: '7',
    text: '¿Qué significa esta señal?',
    options: [
      { id: 0, text: 'Pare', icon: '🛑' },
      { id: 1, text: 'Ceda el paso', icon: '⚠️' },
      { id: 2, text: 'Prohibido', icon: '🚫' }
    ],
    correctAnswer: 0,
    category: 'Señales',
    difficulty: 'easy'
  },
  {
    id: '8',
    text: '¿A qué edad pueden los niños ir solos en bicicleta?',
    options: [
      { id: 0, text: '5 años', icon: '👶' },
      { id: 1, text: '8 años', icon: '👦' },
      { id: 2, text: '12 años', icon: '👨' }
    ],
    correctAnswer: 2,
    category: 'Bicicletas',
    difficulty: 'medium'
  },
  {
    id: '9',
    text: '¿Qué debes hacer antes de cruzar la calle?',
    options: [
      { id: 0, text: 'Mirar y escuchar', icon: '👀👂' },
      { id: 1, text: 'Correr rápido', icon: '🏃‍♂️' },
      { id: 2, text: 'Usar el celular', icon: '📱' }
    ],
    correctAnswer: 0,
    category: 'Peatones',
    difficulty: 'easy'
  },
  {
    id: '10',
    text: '¿Qué significa esta señal?',
    options: [
      { id: 0, text: 'Escuela', icon: '🏫' },
      { id: 1, text: 'Hospital', icon: '🏥' },
      { id: 2, text: 'Parque', icon: '🌳' }
    ],
    correctAnswer: 0,
    category: 'Señales',
    difficulty: 'medium'
  },
  {
    id: '11',
    text: '¿Cuál es la velocidad máxima en zona escolar?',
    options: [
      { id: 0, text: '50 km/h', icon: '🚗💨' },
      { id: 1, text: '30 km/h', icon: '🚗🐌' },
      { id: 2, text: '80 km/h', icon: '🚗⚡' }
    ],
    correctAnswer: 1,
    category: 'Velocidad',
    difficulty: 'medium'
  },
  {
    id: '12',
    text: '¿Qué debes hacer si ves un autobús escolar parado?',
    options: [
      { id: 0, text: 'Pasar rápido', icon: '🏃‍♂️' },
      { id: 1, text: 'Parar y esperar', icon: '⏸️' },
      { id: 2, text: 'Tocar bocina', icon: '📯' }
    ],
    correctAnswer: 1,
    category: 'Autobuses',
    difficulty: 'easy'
  },
  {
    id: '13',
    text: '¿Dónde es más seguro esperar el autobús?',
    options: [
      { id: 0, text: 'En la calle', icon: '🛣️' },
      { id: 1, text: 'En la parada', icon: '🚏' },
      { id: 2, text: 'En el carril', icon: '🚗' }
    ],
    correctAnswer: 1,
    category: 'Autobuses',
    difficulty: 'easy'
  },
  {
    id: '14',
    text: '¿Qué significa el cinturón de seguridad?',
    options: [
      { id: 0, text: 'Molestia', icon: '😤' },
      { id: 1, text: 'Protección', icon: '🛡️' },
      { id: 2, text: 'Decoración', icon: '🎀' }
    ],
    correctAnswer: 1,
    category: 'Seguridad',
    difficulty: 'easy'
  },
  {
    id: '15',
    text: '¿Cuándo debes usar el cinturón de seguridad?',
    options: [
      { id: 0, text: 'Solo en carretera', icon: '🛣️' },
      { id: 1, text: 'Siempre', icon: '🔄' },
      { id: 2, text: 'Solo de noche', icon: '🌙' }
    ],
    correctAnswer: 1,
    category: 'Seguridad',
    difficulty: 'easy'
  }
];

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Question[] => {
  return educationVialQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByCategory = (category: string): Question[] => {
  return educationVialQuestions.filter(q => q.category === category);
};

export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...educationVialQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

