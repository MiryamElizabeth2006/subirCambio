import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🚗');
  const [selectedAge, setSelectedAge] = useState('5-7');

  const avatars = ['🚗', '🚲', '🚦', '🚶‍♂️', '🚌', '🚑'];
  const ageGroups = [
    { value: '5-7', label: '5-7 años', icon: '👶' },
    { value: '8-10', label: '8-10 años', icon: '👦' },
    { value: '11-12', label: '11-12 años', icon: '👨' }
  ];

  const handleLogin = () => {
    if (playerName.trim().length < 2) {
      Alert.alert('¡Ups!', 'Por favor escribe tu nombre (mínimo 2 letras)');
      return;
    }
    setCurrentScreen('menu');
  };

  const handleStartGame = () => {
    Alert.alert('¡Juego iniciado!', `¡Hola ${playerName}! Tu avatar es ${selectedAvatar} y tienes ${selectedAge} años.`);
  };

  const renderLogin = () => (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>🚦 Educación Vial</Text>
        <Text style={styles.subtitle}>¡Aprende jugando sobre seguridad vial!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👋 ¿Cómo te llamas?</Text>
        <TextInput
          value={playerName}
          onChangeText={setPlayerName}
          placeholder="Escribe tu nombre aquí..."
          style={styles.input}
          placeholderTextColor="#9ca3af"
          maxLength={20}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎭 Elige tu Avatar</Text>
        <View style={styles.avatarContainer}>
          {avatars.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedAvatar(avatar)}
              style={[
                styles.avatarButton,
                selectedAvatar === avatar && styles.avatarButtonSelected
              ]}
            >
              <Text style={styles.avatarText}>{avatar}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎂 ¿Cuántos años tienes?</Text>
        {ageGroups.map((age, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedAge(age.value)}
            style={[
              styles.ageButton,
              selectedAge === age.value && styles.ageButtonSelected
            ]}
          >
            <Text style={styles.ageIcon}>{age.icon}</Text>
            <Text style={[
              styles.ageText,
              selectedAge === age.value && styles.ageTextSelected
            ]}>
              {age.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.startButton}>
        <Text style={styles.startButtonText}>¡Empezar a Jugar! 🎮</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderMenu = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎮 ¡Hola {playerName}!</Text>
        <Text style={styles.subtitle}>¿Cómo quieres jugar hoy?</Text>
      </View>

      <View style={styles.playerInfo}>
        <Text style={styles.avatarLarge}>{selectedAvatar}</Text>
        <Text style={styles.playerName}>{playerName}</Text>
        <Text style={styles.playerAge}>{selectedAge} años</Text>
      </View>

      <View style={styles.gameModes}>
        <TouchableOpacity style={[styles.gameModeButton, styles.mode1v1]}>
          <Text style={styles.gameModeIcon}>⚔️</Text>
          <Text style={styles.gameModeTitle}>Batalla 1v1</Text>
          <Text style={styles.gameModeDesc}>¡Cara a cara!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.gameModeButton, styles.modeAll]}>
          <Text style={styles.gameModeIcon}>🏆</Text>
          <Text style={styles.gameModeTitle}>Todos vs Todos</Text>
          <Text style={styles.gameModeDesc}>¡Todos compiten!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.gameModeButton, styles.modeTournament]}>
          <Text style={styles.gameModeIcon}>🏅</Text>
          <Text style={styles.gameModeTitle}>Torneo</Text>
          <Text style={styles.gameModeDesc}>¡Eliminación directa!</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleStartGame} style={styles.playButton}>
        <Text style={styles.playButtonText}>🚀 Iniciar Juego</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCurrentScreen('login')} style={styles.backButton}>
        <Text style={styles.backButtonText}>⬅️ Volver</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {currentScreen === 'login' ? renderLogin() : renderMenu()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16a34a',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#86efac',
    borderRadius: 16,
    padding: 16,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  avatarButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  avatarButtonSelected: {
    borderColor: '#16a34a',
    backgroundColor: '#dcfce7',
  },
  avatarText: {
    fontSize: 32,
  },
  ageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  ageButtonSelected: {
    borderColor: '#16a34a',
    backgroundColor: '#dcfce7',
  },
  ageIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  ageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    flex: 1,
  },
  ageTextSelected: {
    color: '#16a34a',
  },
  startButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  playerInfo: {
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarLarge: {
    fontSize: 48,
    marginBottom: 10,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  playerAge: {
    fontSize: 16,
    color: '#6b7280',
  },
  gameModes: {
    padding: 20,
  },
  gameModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mode1v1: {
    borderColor: '#ef4444',
  },
  modeAll: {
    borderColor: '#3b82f6',
  },
  modeTournament: {
    borderColor: '#8b5cf6',
  },
  gameModeIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  gameModeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    flex: 1,
  },
  gameModeDesc: {
    fontSize: 14,
    color: '#6b7280',
  },
  playButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    margin: 20,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#6b7280',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    margin: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

