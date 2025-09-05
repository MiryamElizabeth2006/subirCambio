import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence
} from 'react-native-reanimated';
import { Player } from '../types';

interface ModeSelectionScreenProps {
  player: Player;
  onJoinRoom: (roomCode: string, gameMode: string) => void;
  onCreateRoom: (gameMode: string) => void;
}

const gameModes = [
  {
    id: '1v1',
    title: 'Batalla 1v1',
    description: '¡Cara a cara! El más rápido gana',
    icon: '⚔️',
    color: 'bg-red-500',
    minPlayers: 2,
    maxPlayers: 2
  },
  {
    id: 'all-vs-all',
    title: 'Todos vs Todos',
    description: '¡Todos compiten al mismo tiempo!',
    icon: '🏆',
    color: 'bg-blue-500',
    minPlayers: 2,
    maxPlayers: 8
  },
  {
    id: 'tournament',
    title: 'Torneo',
    description: '¡Eliminación directa! Solo los mejores',
    icon: '🏅',
    color: 'bg-purple-500',
    minPlayers: 4,
    maxPlayers: 8
  }
];

export const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({
  player,
  onJoinRoom,
  onCreateRoom
}) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleModeSelect = (modeId: string) => {
    scale.value = withSequence(
      withSpring(0.95, { damping: 15 }),
      withSpring(1, { damping: 15 })
    );
    setSelectedMode(modeId);
  };

  const handleJoinRoom = () => {
    if (!roomCode.trim()) {
      Alert.alert('¡Ups!', 'Por favor ingresa el código de la sala');
      return;
    }
    
    if (roomCode.trim().length < 4) {
      Alert.alert('¡Ups!', 'El código debe tener al menos 4 caracteres');
      return;
    }

    setIsJoining(true);
    onJoinRoom(roomCode.trim().toUpperCase(), selectedMode || 'all-vs-all');
  };

  const handleCreateRoom = () => {
    if (!selectedMode) {
      Alert.alert('¡Ups!', 'Por favor selecciona un modo de juego');
      return;
    }
    onCreateRoom(selectedMode);
  };

  const selectedModeData = gameModes.find(mode => mode.id === selectedMode);

  return (
    <View className="flex-1 bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <View className="pt-16 pb-8 px-6">
        <Text className="text-3xl font-bold text-center text-primary-600 mb-2">
          🎮 ¡Hola {player.name}!
        </Text>
        <Text className="text-lg text-center text-gray-600">
          ¿Cómo quieres jugar hoy?
        </Text>
      </View>

      {/* Player info */}
      <View className="bg-white mx-6 rounded-2xl p-4 mb-6 shadow-lg">
        <View className="flex-row items-center space-x-4">
          <View className="w-16 h-16 rounded-full bg-primary-100 items-center justify-center">
            <Text className="text-3xl">{player.avatar}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-800">{player.name}</Text>
            <Text className="text-sm text-gray-600">{player.age} años</Text>
          </View>
        </View>
      </View>

      {/* Game modes */}
      <View className="px-6 mb-6">
        <Text className="text-xl font-bold text-center mb-4 text-gray-800">
          🎯 Selecciona el modo de juego
        </Text>
        
        <View className="space-y-4">
          {gameModes.map((mode) => (
            <Animated.View key={mode.id} style={animatedStyle}>
              <TouchableOpacity
                onPress={() => handleModeSelect(mode.id)}
                className={`p-4 rounded-2xl border-2 ${
                  selectedMode === mode.id
                    ? 'border-primary-500 bg-primary-100'
                    : 'border-gray-300 bg-white'
                }`}
                style={{
                  shadowColor: selectedMode === mode.id ? '#22c55e' : '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <View className="flex-row items-center space-x-4">
                  <Text className="text-4xl">{mode.icon}</Text>
                  <View className="flex-1">
                    <Text className={`text-lg font-bold ${
                      selectedMode === mode.id ? 'text-primary-700' : 'text-gray-800'
                    }`}>
                      {mode.title}
                    </Text>
                    <Text className={`text-sm ${
                      selectedMode === mode.id ? 'text-primary-600' : 'text-gray-600'
                    }`}>
                      {mode.description}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-1">
                      {mode.minPlayers}-{mode.maxPlayers} jugadores
                    </Text>
                  </View>
                  {selectedMode === mode.id && (
                    <Text className="text-2xl">✅</Text>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Join room section */}
      <View className="px-6 mb-6">
        <Text className="text-lg font-bold text-center mb-4 text-gray-800">
          🚪 Unirse a una sala
        </Text>
        
        <View className="bg-white rounded-2xl p-4 shadow-lg">
          <TextInput
            value={roomCode}
            onChangeText={setRoomCode}
            placeholder="Código de la sala (ej: ABCD)"
            className="border-2 border-gray-300 rounded-xl p-3 text-center text-lg font-semibold mb-4"
            placeholderTextColor="#9ca3af"
            maxLength={6}
            autoCapitalize="characters"
          />
          
          <TouchableOpacity
            onPress={handleJoinRoom}
            disabled={isJoining}
            className={`py-3 rounded-xl items-center ${
              isJoining ? 'bg-gray-400' : 'bg-blue-500'
            }`}
            style={{
              shadowColor: '#3b82f6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text className="text-white text-lg font-bold">
              {isJoining ? 'Uniéndose...' : '🚪 Unirse a Sala'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Create room button */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={handleCreateRoom}
          disabled={!selectedMode}
          className={`py-4 rounded-2xl items-center ${
            selectedMode ? 'bg-primary-500' : 'bg-gray-400'
          }`}
          style={{
            shadowColor: selectedMode ? '#22c55e' : '#9ca3af',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Text className="text-white text-xl font-bold">
            {selectedMode ? `🏠 Crear Sala - ${selectedModeData?.title}` : '🏠 Crear Sala'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

