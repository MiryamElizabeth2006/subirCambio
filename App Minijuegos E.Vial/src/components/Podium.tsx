import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay,
  withSequence
} from 'react-native-reanimated';
import { GameResult } from '../types';

interface PodiumProps {
  results: GameResult[];
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const Podium: React.FC<PodiumProps> = ({ 
  results, 
  onPlayAgain, 
  onBackToMenu 
}) => {
  const sortedResults = [...results].sort((a, b) => b.score - a.score);
  const topThree = sortedResults.slice(0, 3);

  const getPodiumHeight = (position: number) => {
    switch (position) {
      case 0: return 120; // Oro
      case 1: return 80;  // Plata
      case 2: return 60;  // Bronce
      default: return 40;
    }
  };

  const getPodiumColor = (position: number) => {
    switch (position) {
      case 0: return 'bg-yellow-400';
      case 1: return 'bg-gray-300';
      case 2: return 'bg-orange-400';
      default: return 'bg-gray-200';
    }
  };

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '🏅';
    }
  };

  const PodiumItem: React.FC<{ 
    result: GameResult; 
    position: number; 
    delay: number 
  }> = ({ result, position, delay }) => {
    const scale = useSharedValue(0);
    const translateY = useSharedValue(50);

    React.useEffect(() => {
      scale.value = withDelay(delay, withSpring(1, { damping: 15 }));
      translateY.value = withDelay(delay, withSpring(0, { damping: 15 }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scale.value },
        { translateY: translateY.value }
      ],
    }));

    return (
      <Animated.View 
        style={animatedStyle}
        className="items-center"
      >
        {/* Jugador */}
        <View className="items-center mb-4">
          <View className="w-20 h-20 rounded-full bg-primary-100 items-center justify-center mb-2">
            <Text className="text-3xl">🎮</Text>
          </View>
          <Text className="text-lg font-bold text-gray-800 text-center">
            {result.playerName}
          </Text>
          <Text className="text-2xl font-bold text-primary-600">
            {result.score} pts
          </Text>
          <Text className="text-sm text-gray-600">
            {result.correctAnswers}/{result.totalAnswers} correctas
          </Text>
        </View>

        {/* Podio */}
        <View 
          className={`${getPodiumColor(position)} rounded-t-2xl items-center justify-center`}
          style={{ 
            width: 80, 
            height: getPodiumHeight(position),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Text className="text-3xl mb-1">
            {getMedalIcon(position)}
          </Text>
          <Text className="text-white font-bold text-lg">
            #{position + 1}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const Fireworks: React.FC = () => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    React.useEffect(() => {
      scale.value = withDelay(1000, withSequence(
        withSpring(1.2, { damping: 15 }),
        withSpring(1, { damping: 15 })
      ));
      opacity.value = withDelay(1000, withSpring(1, { duration: 500 }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }));

    return (
      <Animated.View 
        style={animatedStyle}
        className="absolute top-10 left-0 right-0 items-center"
      >
        <Text className="text-6xl">🎉</Text>
        <Text className="text-4xl mt-2">🎊</Text>
        <Text className="text-6xl mt-2">🎈</Text>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-primary-50 to-white">
      <Fireworks />
      
      {/* Título */}
      <View className="items-center pt-16 pb-8">
        <Text className="text-4xl font-bold text-primary-600 mb-2">
          🏆 ¡Juego Terminado!
        </Text>
        <Text className="text-lg text-gray-600 text-center">
          ¡Excelente trabajo aprendiendo sobre educación vial!
        </Text>
      </View>

      {/* Podio */}
      <View className="flex-1 justify-end px-6">
        <View className="flex-row justify-center items-end space-x-4 mb-8">
          {topThree.map((result, index) => (
            <PodiumItem
              key={result.playerId}
              result={result}
              position={index}
              delay={index * 200}
            />
          ))}
        </View>

        {/* Lista completa de resultados */}
        {sortedResults.length > 3 && (
          <View className="bg-white rounded-2xl p-4 mb-6 shadow-lg">
            <Text className="text-lg font-bold text-center mb-4 text-gray-800">
              📊 Resultados Completos
            </Text>
            {sortedResults.slice(3).map((result, index) => (
              <View key={result.playerId} className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center">
                  <Text className="text-lg font-bold text-gray-600 w-8">
                    #{index + 4}
                  </Text>
                  <Text className="text-base font-semibold text-gray-800 ml-2">
                    {result.playerName}
                  </Text>
                </View>
                <Text className="text-base font-bold text-primary-600">
                  {result.score} pts
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Botones de acción */}
        <View className="space-y-4 mb-8">
          <TouchableOpacity
            onPress={onPlayAgain}
            className="bg-primary-500 py-4 rounded-2xl items-center"
            style={{
              shadowColor: '#22c55e',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text className="text-white text-xl font-bold">
              🔄 Jugar de Nuevo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onBackToMenu}
            className="bg-gray-500 py-4 rounded-2xl items-center"
            style={{
              shadowColor: '#6b7280',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text className="text-white text-xl font-bold">
              🏠 Volver al Menú
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

