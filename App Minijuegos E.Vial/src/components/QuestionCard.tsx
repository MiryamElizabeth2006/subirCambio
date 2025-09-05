import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { TriviaQuestion } from '../data/triviaQuestions';

interface QuestionCardProps {
  question: TriviaQuestion;
  onAnswer: (selectedAnswer: number) => void;
  timeLeft: number;
}

export default function QuestionCard({ question, onAnswer, timeLeft }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (timeLeft <= 0 && selectedAnswer === null) {
      onAnswer(-1); // Tiempo agotado
    }
  }, [timeLeft, selectedAnswer, onAnswer]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    // Animación de respuesta
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Reproducir sonido si existe
    if (question.sound) {
      // Aquí se reproduciría el sonido
      console.log(`Reproduciendo: ${question.sound}`);
    }

    setTimeout(() => {
      onAnswer(answerIndex);
    }, 2000);
  };

  const getAnswerStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index ? styles.selectedAnswer : styles.answerButton;
    }

    if (index === question.correctAnswer) {
      return styles.correctAnswer;
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return styles.wrongAnswer;
    }
    
    return styles.answerButton;
  };

  const getAnswerTextStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index ? styles.selectedAnswerText : styles.answerText;
    }

    if (index === question.correctAnswer) {
      return styles.correctAnswerText;
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return styles.wrongAnswerText;
    }
    
    return styles.answerText;
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.questionContainer}>
        <Text style={styles.category}>
          {question.category === 'semaforo' ? '🚦 SEMÁFORO' : 
           question.category === 'paso_cebra' ? '🦓 PASO CEBRA' : 
           '🚸 SEÑALÉTICAS'}
        </Text>
        
        <View style={styles.imageContainer}>
          <Text style={styles.questionImage}>{question.image}</Text>
        </View>
        
        <Text style={styles.questionText}>{question.question}</Text>
        
        {showResult && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}
      </View>

      <View style={styles.answersContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getAnswerStyle(index)}
            onPress={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
          >
            <Text style={getAnswerTextStyle(index)}>
              {String.fromCharCode(65 + index)}. {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  questionContainer: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 15,
    textAlign: 'center',
  },
  imageContainer: {
    backgroundColor: '#0f3460',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionImage: {
    fontSize: 50,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
  },
  explanationContainer: {
    backgroundColor: '#0f3460',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  explanationText: {
    fontSize: 16,
    color: '#ffd700',
    textAlign: 'center',
    fontWeight: '600',
  },
  answersContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  answerButton: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#0f3460',
  },
  selectedAnswer: {
    backgroundColor: '#3B82F6',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#1D4ED8',
  },
  correctAnswer: {
    backgroundColor: '#10B981',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#059669',
  },
  wrongAnswer: {
    backgroundColor: '#EF4444',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#DC2626',
  },
  answerText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
  selectedAnswerText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  correctAnswerText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  wrongAnswerText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});