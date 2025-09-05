import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withSequence,
  runOnJS
} from 'react-native-reanimated';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  timeLeft: number;
  onAnswer: (answer: number) => void;
  isAnswered: boolean;
  selectedAnswer?: number;
  correctAnswer?: number;
}

const { width } = Dimensions.get('window');

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  timeLeft,
  onAnswer,
  isAnswered,
  selectedAnswer,
  correctAnswer
}) => {
  const [localTimeLeft, setLocalTimeLeft] = useState(timeLeft);
  const progress = useSharedValue(1);
  const cardScale = useSharedValue(0.8);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    setLocalTimeLeft(timeLeft);
    progress.value = withTiming(timeLeft / 30, { duration: 100 });
  }, [timeLeft]);

  useEffect(() => {
    cardScale.value = withSpring(1, { damping: 15 });
    cardOpacity.value = withTiming(1, { duration: 500 });
  }, []);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
    opacity: cardOpacity.value,
  }));

  const getOptionStyle = (optionId: number) => {
    if (!isAnswered) {
      return 'bg-white border-2 border-gray-300';
    }
    
    if (optionId === correctAnswer) {
      return 'bg-green-100 border-2 border-green-500';
    }
    
    if (optionId === selectedAnswer && optionId !== correctAnswer) {
      return 'bg-red-100 border-2 border-red-500';
    }
    
    return 'bg-gray-100 border-2 border-gray-300';
  };

  const getOptionTextStyle = (optionId: number) => {
    if (!isAnswered) {
      return 'text-gray-800';
    }
    
    if (optionId === correctAnswer) {
      return 'text-green-800 font-bold';
    }
    
    if (optionId === selectedAnswer && optionId !== correctAnswer) {
      return 'text-red-800 font-bold';
    }
    
    return 'text-gray-600';
  };

  const handleAnswer = (answer: number) => {
    if (isAnswered) return;
    
    cardScale.value = withSequence(
      withSpring(0.95, { damping: 15 }),
      withSpring(1, { damping: 15 })
    );
    
    onAnswer(answer);
  };

  return (
    <Animated.View style={cardStyle} className="w-full px-6">
      <View className="bg-white rounded-3xl p-6 shadow-lg">
        {/* Barra de tiempo */}
        <View className="mb-6">
          <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <Animated.View 
              style={progressStyle}
              className={`h-full rounded-full ${
                localTimeLeft > 10 ? 'bg-green-500' : 
                localTimeLeft > 5 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            />
          </View>
          <Text className="text-center mt-2 text-lg font-bold text-gray-700">
            ⏰ {localTimeLeft}s
          </Text>
        </View>

        {/* Pregunta */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-center text-gray-800 leading-relaxed">
            {question.text}
          </Text>
        </View>

        {/* Opciones */}
        <View className="space-y-4">
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleAnswer(option.id)}
              disabled={isAnswered}
              className={`p-4 rounded-2xl ${getOptionStyle(option.id)} ${
                !isAnswered ? 'active:scale-95' : ''
              }`}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center space-x-4">
                <Text className="text-4xl">{option.icon}</Text>
                <Text className={`text-lg font-semibold flex-1 ${getOptionTextStyle(option.id)}`}>
                  {option.text}
                </Text>
                {isAnswered && option.id === correctAnswer && (
                  <Text className="text-2xl">✅</Text>
                )}
                {isAnswered && option.id === selectedAnswer && option.id !== correctAnswer && (
                  <Text className="text-2xl">❌</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Indicador de categoría */}
        <View className="mt-6 bg-primary-100 rounded-full py-2 px-4 self-center">
          <Text className="text-primary-700 font-semibold text-center">
            📚 {question.category}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

