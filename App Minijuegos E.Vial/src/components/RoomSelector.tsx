import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

interface RoomSelectorProps {
  onJoinRoom: (roomCode: string, gameMode: 'solo' | 'pairs' | 'group') => void;
  onCreateRoom: (gameMode: 'pairs' | 'group') => void;
}

export default function RoomSelector({ onJoinRoom, onCreateRoom }: RoomSelectorProps) {
  const [roomCode, setRoomCode] = useState('');
  const [selectedMode, setSelectedMode] = useState<'solo' | 'pairs' | 'group'>('solo');

  const handleJoinRoom = () => {
    if (roomCode.trim().length < 4) {
      Alert.alert('¡Ups!', 'El código de sala debe tener al menos 4 caracteres');
      return;
    }
    onJoinRoom(roomCode.toUpperCase(), selectedMode);
  };

  const handleCreateRoom = () => {
    if (selectedMode === 'solo') {
      Alert.alert('¡Ups!', 'Para jugar solo no necesitas crear una sala');
      return;
    }
    onCreateRoom(selectedMode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 ¡Elige tu modo de juego!</Text>
      
      {/* Selector de modo */}
      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[styles.modeButton, selectedMode === 'solo' && styles.selectedMode]}
          onPress={() => setSelectedMode('solo')}
        >
          <Text style={styles.modeIcon}>🎯</Text>
          <Text style={[styles.modeTitle, selectedMode === 'solo' && styles.selectedModeText]}>
            Solo
          </Text>
          <Text style={styles.modeDescription}>Practica solo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeButton, selectedMode === 'pairs' && styles.selectedMode]}
          onPress={() => setSelectedMode('pairs')}
        >
          <Text style={styles.modeIcon}>👫</Text>
          <Text style={[styles.modeTitle, selectedMode === 'pairs' && styles.selectedModeText]}>
            Parejas
          </Text>
          <Text style={styles.modeDescription}>1 vs 1</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeButton, selectedMode === 'group' && styles.selectedMode]}
          onPress={() => setSelectedMode('group')}
        >
          <Text style={styles.modeIcon}>👥</Text>
          <Text style={[styles.modeTitle, selectedMode === 'group' && styles.selectedModeText]}>
            Grupo
          </Text>
          <Text style={styles.modeDescription}>Todos vs Todos</Text>
        </TouchableOpacity>
      </View>

      {/* Crear sala */}
      {selectedMode !== 'solo' && (
        <TouchableOpacity style={styles.createButton} onPress={handleCreateRoom}>
          <Text style={styles.createButtonText}>🏠 Crear Sala</Text>
        </TouchableOpacity>
      )}

      {/* Unirse a sala */}
      {selectedMode !== 'solo' && (
        <View style={styles.joinContainer}>
          <Text style={styles.joinTitle}>O únete a una sala existente:</Text>
          <TextInput
            style={styles.roomInput}
            value={roomCode}
            onChangeText={setRoomCode}
            placeholder="Código de sala (ej: ABCD)"
            placeholderTextColor="#9ca3af"
            maxLength={6}
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.joinButton} onPress={handleJoinRoom}>
            <Text style={styles.joinButtonText}>🚪 Unirse</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botón para jugar solo */}
      {selectedMode === 'solo' && (
        <TouchableOpacity 
          style={styles.soloButton} 
          onPress={() => onJoinRoom('SOLO', 'solo')}
        >
          <Text style={styles.soloButtonText}>🎯 ¡Empezar a Practicar!</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 30,
  },
  modeSelector: {
    marginBottom: 30,
  },
  modeButton: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#0f3460',
  },
  selectedMode: {
    backgroundColor: '#0f3460',
    borderColor: '#ffd700',
    transform: [{ scale: 1.05 }],
  },
  modeIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  modeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  selectedModeText: {
    color: '#ffd700',
  },
  modeDescription: {
    fontSize: 16,
    color: '#9ca3af',
  },
  createButton: {
    backgroundColor: '#10B981',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  joinContainer: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  joinTitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  roomInput: {
    backgroundColor: '#0f3460',
    borderRadius: 15,
    padding: 15,
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
    width: '100%',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  joinButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '100%',
  },
  joinButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  soloButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginTop: 20,
    elevation: 8,
  },
  soloButtonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
