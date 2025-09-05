import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { Room, Player } from '../types';

interface LobbyScreenProps {
  room: Room;
  currentPlayer: Player;
  isHost: boolean;
  onStartGame: () => void;
  onLeaveRoom: () => void;
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({
  room,
  currentPlayer,
  isHost,
  onStartGame,
  onLeaveRoom
}) => {
  const [readyPlayers, setReadyPlayers] = useState<Set<string>>(new Set());
  const pulseScale = useSharedValue(1);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  useEffect(() => {
    // Animación de pulso para el botón de inicio
    if (isHost && room.players.length >= 2) {
      pulseScale.value = withRepeat(
        withTiming(1.1, { duration: 1000 }),
        -1,
        true
      );
    } else {
      pulseScale.value = withSpring(1);
    }
  }, [isHost, room.players.length]);

  const handlePlayerReady = () => {
    // Aquí se enviaría el evento al servidor
    const newReadyPlayers = new Set(readyPlayers);
    if (readyPlayers.has(currentPlayer.id)) {
      newReadyPlayers.delete(currentPlayer.id);
    } else {
      newReadyPlayers.add(currentPlayer.id);
    }
    setReadyPlayers(newReadyPlayers);
  };

  const handleStartGame = () => {
    if (room.players.length < 2) {
      Alert.alert('¡Espera!', 'Necesitas al menos 2 jugadores para empezar');
      return;
    }
    onStartGame();
  };

  const canStartGame = isHost && room.players.length >= 2;

  const getGameModeInfo = () => {
    switch (room.gameMode) {
      case '1v1':
        return { title: 'Batalla 1v1', icon: '⚔️', color: 'text-red-600' };
      case 'all-vs-all':
        return { title: 'Todos vs Todos', icon: '🏆', color: 'text-blue-600' };
      case 'tournament':
        return { title: 'Torneo', icon: '🏅', color: 'text-purple-600' };
      default:
        return { title: 'Modo de Juego', icon: '🎮', color: 'text-gray-600' };
    }
  };

  const gameModeInfo = getGameModeInfo();

  return (
    <View className="flex-1 bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <View className="bg-primary-500 p-6 rounded-b-3xl">
        <Text className="text-2xl font-bold text-white text-center mb-2">
          🏠 Sala de Espera
        </Text>
        <Text className="text-primary-100 text-center">
          Código: <Text className="font-bold text-white">{room.code}</Text>
        </Text>
      </View>

      {/* Game mode info */}
      <View className="mx-6 mt-6 bg-white rounded-2xl p-4 shadow-lg">
        <View className="flex-row items-center justify-center space-x-3">
          <Text className="text-3xl">{gameModeInfo.icon}</Text>
          <Text className={`text-xl font-bold ${gameModeInfo.color}`}>
            {gameModeInfo.title}
          </Text>
        </View>
      </View>

      {/* Players list */}
      <View className="flex-1 px-6 mt-6">
        <Text className="text-lg font-bold text-center mb-4 text-gray-800">
          👥 Jugadores ({room.players.length})
        </Text>
        
        <View className="space-y-3">
          {room.players.map((player, index) => (
            <View
              key={player.id}
              className={`flex-row items-center p-4 rounded-2xl border-2 ${
                player.id === currentPlayer.id
                  ? 'border-primary-500 bg-primary-100'
                  : 'border-gray-300 bg-white'
              }`}
              style={{
                shadowColor: player.id === currentPlayer.id ? '#22c55e' : '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              {/* Avatar */}
              <View className="w-12 h-12 rounded-full bg-primary-100 items-center justify-center mr-4">
                <Text className="text-2xl">{player.avatar}</Text>
              </View>

              {/* Player info */}
              <View className="flex-1">
                <Text className={`text-lg font-bold ${
                  player.id === currentPlayer.id ? 'text-primary-700' : 'text-gray-800'
                }`}>
                  {player.name}
                  {player.id === currentPlayer.id && ' (Tú)'}
                  {player.id === room.hostId && ' 👑'}
                </Text>
                <Text className="text-sm text-gray-600">
                  {player.age} años
                </Text>
              </View>

              {/* Ready status */}
              <View className="items-center">
                {readyPlayers.has(player.id) ? (
                  <View className="bg-green-500 rounded-full p-2">
                    <Text className="text-white text-lg">✅</Text>
                  </View>
                ) : (
                  <View className="bg-gray-300 rounded-full p-2">
                    <Text className="text-gray-600 text-lg">⏳</Text>
                  </View>
                )}
                <Text className="text-xs text-gray-500 mt-1">
                  {readyPlayers.has(player.id) ? 'Listo' : 'Esperando'}
                </Text>
              </View>

              {/* Connection status */}
              <View className="ml-2">
                <View className={`w-3 h-3 rounded-full ${
                  player.isConnected ? 'bg-green-500' : 'bg-red-500'
                }`} />
              </View>
            </View>
          ))}
        </View>

        {/* Waiting for players message */}
        {room.players.length < 2 && (
          <View className="items-center justify-center py-8">
            <Text className="text-4xl mb-4">👥</Text>
            <Text className="text-lg text-gray-500 text-center">
              Esperando más jugadores...
            </Text>
            <Text className="text-sm text-gray-400 text-center mt-2">
              Mínimo 2 jugadores para empezar
            </Text>
          </View>
        )}
      </View>

      {/* Action buttons */}
      <View className="px-6 pb-8 space-y-4">
        {/* Ready button */}
        <TouchableOpacity
          onPress={handlePlayerReady}
          className={`py-4 rounded-2xl items-center ${
            readyPlayers.has(currentPlayer.id) ? 'bg-green-500' : 'bg-blue-500'
          }`}
          style={{
            shadowColor: readyPlayers.has(currentPlayer.id) ? '#22c55e' : '#3b82f6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Text className="text-white text-xl font-bold">
            {readyPlayers.has(currentPlayer.id) ? '✅ ¡Listo!' : '⏳ Marcar como Listo'}
          </Text>
        </TouchableOpacity>

        {/* Start game button (only for host) */}
        {isHost && (
          <Animated.View style={pulseAnimatedStyle}>
            <TouchableOpacity
              onPress={handleStartGame}
              disabled={!canStartGame}
              className={`py-4 rounded-2xl items-center ${
                canStartGame ? 'bg-primary-500' : 'bg-gray-400'
              }`}
              style={{
                shadowColor: canStartGame ? '#22c55e' : '#9ca3af',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text className="text-white text-xl font-bold">
                🚀 Iniciar Juego
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Leave room button */}
        <TouchableOpacity
          onPress={onLeaveRoom}
          className="bg-red-500 py-3 rounded-2xl items-center"
          style={{
            shadowColor: '#ef4444',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Text className="text-white text-lg font-bold">
            🚪 Salir de la Sala
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

