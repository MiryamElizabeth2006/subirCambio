import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withDelay
} from 'react-native-reanimated';
import { Player } from '../types';

interface RankingBoardProps {
  players: Player[];
  currentPlayerId?: string;
}

export const RankingBoard: React.FC<RankingBoardProps> = ({ 
  players, 
  currentPlayerId 
}) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'bg-yellow-100 border-yellow-400';
      case 1: return 'bg-gray-100 border-gray-400';
      case 2: return 'bg-orange-100 border-orange-400';
      default: return 'bg-white border-gray-300';
    }
  };

  const RankingItem: React.FC<{ 
    player: Player; 
    index: number; 
    delay: number 
  }> = ({ player, index, delay }) => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    React.useEffect(() => {
      scale.value = withDelay(delay, withSpring(1, { damping: 15 }));
      opacity.value = withDelay(delay, withSpring(1, { duration: 500 }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }));

    const isCurrentPlayer = currentPlayerId === player.id;

    return (
      <Animated.View 
        style={animatedStyle}
        className={`flex-row items-center p-4 rounded-2xl border-2 mb-3 ${
          getRankColor(index)
        } ${isCurrentPlayer ? 'ring-4 ring-primary-300' : ''}`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        {/* Posición */}
        <View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-4">
          <Text className="text-lg font-bold">
            {getRankIcon(index)}
          </Text>
        </View>

        {/* Avatar */}
        <View className="w-12 h-12 rounded-full bg-primary-100 items-center justify-center mr-4">
          <Text className="text-2xl">{player.avatar}</Text>
        </View>

        {/* Información del jugador */}
        <View className="flex-1">
          <Text className={`text-lg font-bold ${
            isCurrentPlayer ? 'text-primary-700' : 'text-gray-800'
          }`}>
            {player.name}
            {isCurrentPlayer && ' (Tú)'}
          </Text>
          <Text className="text-sm text-gray-600">
            {player.age} años
          </Text>
        </View>

        {/* Puntuación */}
        <View className="items-center">
          <Text className="text-2xl font-bold text-primary-600">
            {player.score}
          </Text>
          <Text className="text-xs text-gray-500">puntos</Text>
        </View>

        {/* Estado de conexión */}
        <View className="ml-2">
          <View className={`w-3 h-3 rounded-full ${
            player.isConnected ? 'bg-green-500' : 'bg-red-500'
          }`} />
        </View>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-primary-500 p-6 rounded-b-3xl">
        <Text className="text-2xl font-bold text-white text-center">
          🏆 Ranking en Vivo
        </Text>
        <Text className="text-primary-100 text-center mt-1">
          {sortedPlayers.length} jugador{sortedPlayers.length !== 1 ? 'es' : ''}
        </Text>
      </View>

      <ScrollView 
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {sortedPlayers.length === 0 ? (
          <View className="items-center justify-center py-20">
            <Text className="text-4xl mb-4">👥</Text>
            <Text className="text-xl text-gray-500 text-center">
              Esperando jugadores...
            </Text>
          </View>
        ) : (
          sortedPlayers.map((player, index) => (
            <RankingItem
              key={player.id}
              player={player}
              index={index}
              delay={index * 100}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

