import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { QuestionCard } from '../components/QuestionCard';
import { RankingBoard } from '../components/RankingBoard';
import { Question, Player } from '../types';

interface TriviaScreenProps {
  question: Question;
  timeLeft: number;
  players: Player[];
  currentPlayerId: string;
  onAnswer: (answer: number) => void;
  isAnswered: boolean;
  selectedAnswer?: number;
  correctAnswer?: number;
  questionNumber: number;
  totalQuestions: number;
}

export const TriviaScreen: React.FC<TriviaScreenProps> = ({
  question,
  timeLeft,
  players,
  currentPlayerId,
  onAnswer,
  isAnswered,
  selectedAnswer,
  correctAnswer,
  questionNumber,
  totalQuestions
}) => {
  const [showRanking, setShowRanking] = useState(false);
  const questionScale = useSharedValue(0.8);
  const questionOpacity = useSharedValue(0);

  const questionAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: questionScale.value }],
    opacity: questionOpacity.value,
  }));

  useEffect(() => {
    // Animación de entrada de la pregunta
    questionScale.value = withSpring(1, { damping: 15 });
    questionOpacity.value = withTiming(1, { duration: 500 });
    
    // Resetear animación para nueva pregunta
    if (questionNumber > 1) {
      questionScale.value = 0.8;
      questionOpacity.value = 0;
      setTimeout(() => {
        questionScale.value = withSpring(1, { damping: 15 });
        questionOpacity.value = withTiming(1, { duration: 500 });
      }, 100);
    }
  }, [question.id]);

  const handleAnswer = (answer: number) => {
    onAnswer(answer);
  };

  const toggleRanking = () => {
    setShowRanking(!showRanking);
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <View className="bg-primary-500 p-4 rounded-b-3xl">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-3">
            <Text className="text-white text-lg font-bold">
              Pregunta {questionNumber}/{totalQuestions}
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={toggleRanking}
            className="bg-white bg-opacity-20 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">
              🏆 Ranking
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Progress bar */}
        <View className="mt-4">
          <View className="h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <View 
              className="h-full bg-white rounded-full"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </View>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        {showRanking ? (
          <RankingBoard 
            players={players} 
            currentPlayerId={currentPlayerId}
          />
        ) : (
          <View className="flex-1 justify-center">
            <Animated.View style={questionAnimatedStyle}>
              <QuestionCard
                question={question}
                timeLeft={timeLeft}
                onAnswer={handleAnswer}
                isAnswered={isAnswered}
                selectedAnswer={selectedAnswer}
                correctAnswer={correctAnswer}
              />
            </Animated.View>
          </View>
        )}
      </View>

      {/* Bottom info */}
      {!showRanking && (
        <View className="px-6 pb-6">
          <View className="bg-white rounded-2xl p-4 shadow-lg">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-2">
                <Text className="text-2xl">👥</Text>
                <Text className="text-lg font-semibold text-gray-800">
                  {players.length} jugador{players.length !== 1 ? 'es' : ''}
                </Text>
              </View>
              
              <View className="flex-row items-center space-x-2">
                <Text className="text-2xl">⏰</Text>
                <Text className={`text-lg font-bold ${
                  timeLeft > 10 ? 'text-green-600' : 
                  timeLeft > 5 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {timeLeft}s
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

