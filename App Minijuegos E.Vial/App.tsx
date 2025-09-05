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
import MobileFrame from './src/components/MobileFrame';
import CatAvatar, { catAvatars } from './src/components/CatAvatar';
import RoomSelector from './src/components/RoomSelector';
import QuestionCard from './src/components/QuestionCard';
import Podium from './src/components/Podium';
import { getRandomQuestions, TriviaQuestion } from './src/data/triviaQuestions';

const { width } = Dimensions.get('window');

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('cat1');
  const [selectedAge, setSelectedAge] = useState('5-7');
  const [gameMode, setGameMode] = useState<'solo' | 'pairs' | 'group'>('solo');
  const [roomCode, setRoomCode] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [players, setPlayers] = useState<any[]>([]);

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
    setCurrentScreen('room-selector');
  };

  const handleJoinRoom = (code: string, mode: 'solo' | 'pairs' | 'group') => {
    setRoomCode(code);
    setGameMode(mode);
    startGame();
  };

  const handleCreateRoom = (mode: 'pairs' | 'group') => {
    const newRoomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    setRoomCode(newRoomCode);
    setGameMode(mode);
    startGame();
  };

  const startGame = () => {
    const gameQuestions = getRandomQuestions(10);
    setQuestions(gameQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setCurrentScreen('game');
  };

  const handleAnswer = (selectedAnswer: number) => {
    const question = questions[currentQuestion];
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
      } else {
        endGame();
      }
    }, 2000);
  };

  const endGame = () => {
    if (gameMode === 'solo') {
      setCurrentScreen('solo-results');
    } else {
      // Simular otros jugadores para el podio
      const mockPlayers = [
        { id: '1', name: playerName, avatar: selectedAvatar, score: score, position: 1 },
        { id: '2', name: 'Gatito Azul', avatar: 'cat1', score: Math.max(0, score - 20), position: 2 },
        { id: '3', name: 'Gatita Rosa', avatar: 'cat2', score: Math.max(0, score - 30), position: 3 },
      ];
      setPlayers(mockPlayers);
      setCurrentScreen('podium');
    }
  };

  const handlePlayAgain = () => {
    startGame();
  };

  const handleBackToMenu = () => {
    setCurrentScreen('room-selector');
  };

  const renderLogin = () => (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>🚦 Trivia Educación Vial</Text>
        <Text style={styles.subtitle}>¡Aprende jugando con gatitos!</Text>
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
        <Text style={styles.sectionTitle}>🐱 Elige tu Gatito</Text>
        <View style={styles.avatarContainer}>
          {Object.keys(catAvatars).map((avatarKey) => (
            <CatAvatar
              key={avatarKey}
              avatar={avatarKey}
              isSelected={selectedAvatar === avatarKey}
              onSelect={setSelectedAvatar}
            />
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

  const renderRoomSelector = () => (
    <RoomSelector
      onJoinRoom={handleJoinRoom}
      onCreateRoom={handleCreateRoom}
    />
  );

  const renderGame = () => {
    if (questions.length === 0) return null;
    
    return (
      <View style={styles.gameContainer}>
        <View style={styles.gameHeader}>
          <Text style={styles.gameTitle}>Pregunta {currentQuestion + 1} de {questions.length}</Text>
          <Text style={styles.scoreText}>Puntos: {score}</Text>
          <Text style={styles.timeText}>⏰ {timeLeft}s</Text>
        </View>
        <QuestionCard
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          timeLeft={timeLeft}
        />
      </View>
    );
  };

  const renderSoloResults = () => (
    <View style={styles.container}>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>🎉 ¡Excelente trabajo!</Text>
        <Text style={styles.resultsSubtitle}>Has completado la trivia</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.finalScore}>{score}</Text>
          <Text style={styles.scoreLabel}>Puntos</Text>
        </View>
        
        <View style={styles.accuracyContainer}>
          <Text style={styles.accuracyText}>
            {Math.round((score / (questions.length * 10)) * 100)}% de aciertos
          </Text>
        </View>
        
        <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
          <Text style={styles.playAgainText}>🔄 Jugar Otra Vez</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backButton} onPress={handleBackToMenu}>
          <Text style={styles.backText}>🏠 Volver al Menú</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    <MobileFrame>
      <StatusBar style="auto" />
      {currentScreen === 'login' && renderLogin()}
      {currentScreen === 'room-selector' && renderRoomSelector()}
      {currentScreen === 'game' && renderGame()}
      {currentScreen === 'solo-results' && renderSoloResults()}
      {currentScreen === 'podium' && (
        <Podium
          players={players}
          onPlayAgain={handlePlayAgain}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </MobileFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  contentContainer: {
    padding: 15,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#16213e',
    borderWidth: 2,
    borderColor: '#ffd700',
    borderRadius: 16,
    padding: 16,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: '#ffffff',
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
  // Estilos para el juego
  gameContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#16213e',
  },
  gameTitle: {
    fontSize: 16,
    color: '#ffd700',
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: 'bold',
  },
  // Estilos para resultados
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultsTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 10,
  },
  resultsSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  finalScore: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#10B981',
  },
  scoreLabel: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
  },
  accuracyContainer: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  accuracyText: {
    fontSize: 18,
    color: '#ffd700',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playAgainButton: {
    backgroundColor: '#10B981',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  playAgainText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#6B7280',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  backText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

