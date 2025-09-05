export interface TriviaQuestion {
  id: string;
  question: string;
  image: string;
  sound?: string;
  video?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'semaforo' | 'paso_cebra' | 'señaleticas';
}

export const triviaQuestions: TriviaQuestion[] = [
  // Preguntas sobre Semáforo
  {
    id: 'semaforo_1',
    question: '¿Qué significa la luz roja del semáforo?',
    image: '🔴',
    sound: 'semaforo_rojo.mp3',
    options: ['Parar', 'Caminar', 'Correr', 'Esperar'],
    correctAnswer: 0,
    explanation: 'La luz roja significa que debemos PARAR y esperar.',
    category: 'semaforo'
  },
  {
    id: 'semaforo_2',
    question: '¿Qué significa la luz verde del semáforo?',
    image: '🟢',
    sound: 'semaforo_verde.mp3',
    options: ['Parar', 'Caminar', 'Esperar', 'Correr'],
    correctAnswer: 1,
    explanation: 'La luz verde significa que podemos CAMINAR con cuidado.',
    category: 'semaforo'
  },
  {
    id: 'semaforo_3',
    question: '¿Qué significa la luz amarilla del semáforo?',
    image: '🟡',
    sound: 'semaforo_amarillo.mp3',
    options: ['Caminar rápido', 'Parar', 'Correr', 'Esperar'],
    correctAnswer: 3,
    explanation: 'La luz amarilla significa que debemos ESPERAR, pronto cambiará.',
    category: 'semaforo'
  },

  // Preguntas sobre Paso Cebra
  {
    id: 'paso_cebra_1',
    question: '¿Dónde debemos cruzar la calle?',
    image: '🦓',
    sound: 'paso_cebra.mp3',
    options: ['En cualquier lugar', 'En el paso cebra', 'Corriendo', 'En el medio de la calle'],
    correctAnswer: 1,
    explanation: 'Siempre debemos cruzar por el PASO CEBRA.',
    category: 'paso_cebra'
  },
  {
    id: 'paso_cebra_2',
    question: '¿Qué debemos hacer antes de cruzar?',
    image: '👀',
    sound: 'mirar_lados.mp3',
    options: ['Correr', 'Mirar a ambos lados', 'Cantar', 'Saltar'],
    correctAnswer: 1,
    explanation: 'Siempre debemos MIRAR A AMBOS LADOS antes de cruzar.',
    category: 'paso_cebra'
  },
  {
    id: 'paso_cebra_3',
    question: '¿Cómo debemos cruzar la calle?',
    image: '🚶‍♂️',
    sound: 'caminar_despacio.mp3',
    options: ['Corriendo', 'Saltando', 'Caminando despacio', 'Bailando'],
    correctAnswer: 2,
    explanation: 'Debemos CAMINAR DESPACIO y con cuidado.',
    category: 'paso_cebra'
  },

  // Preguntas sobre Señaléticas
  {
    id: 'señal_1',
    question: '¿Qué significa esta señal?',
    image: '🚫',
    sound: 'prohibido.mp3',
    options: ['Puedo pasar', 'No puedo pasar', 'Puedo correr', 'Puedo jugar'],
    correctAnswer: 1,
    explanation: 'Esta señal significa que NO PODEMOS PASAR.',
    category: 'señaleticas'
  },
  {
    id: 'señal_2',
    question: '¿Qué significa esta señal?',
    image: '⚠️',
    sound: 'peligro.mp3',
    options: ['Todo está bien', 'Hay peligro', 'Puedo jugar', 'Es seguro'],
    correctAnswer: 1,
    explanation: 'Esta señal significa que HAY PELIGRO, debemos tener cuidado.',
    category: 'señaleticas'
  },
  {
    id: 'señal_3',
    question: '¿Qué significa esta señal?',
    image: '🚸',
    sound: 'niños.mp3',
    options: ['Hay adultos', 'Hay niños', 'Hay perros', 'Hay gatos'],
    correctAnswer: 1,
    explanation: 'Esta señal significa que HAY NIÑOS cerca, debemos ir despacio.',
    category: 'señaleticas'
  },
  {
    id: 'señal_4',
    question: '¿Qué significa esta señal?',
    image: '🚶‍♀️',
    sound: 'peatones.mp3',
    options: ['Solo carros', 'Solo peatones', 'Solo bicicletas', 'Solo perros'],
    correctAnswer: 1,
    explanation: 'Esta señal significa que es un paso SOLO PARA PEATONES.',
    category: 'señaleticas'
  }
];

export const getRandomQuestions = (count: number): TriviaQuestion[] => {
  const shuffled = [...triviaQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getQuestionsByCategory = (category: string): TriviaQuestion[] => {
  return triviaQuestions.filter(q => q.category === category);
};
