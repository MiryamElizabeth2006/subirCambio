import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { catAvatars } from './CatAvatar';

interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  position: number;
}

interface PodiumProps {
  players: Player[];
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export default function Podium({ players, onPlayAgain, onBackToMenu }: PodiumProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  const getPodiumHeight = (position: number) => {
    switch (position) {
      case 1: return 120; // Oro
      case 2: return 80;  // Plata
      case 3: return 60;  // Bronce
      default: return 40;
    }
  };

  const getPodiumColor = (position: number) => {
    switch (position) {
      case 1: return '#FFD700'; // Oro
      case 2: return '#C0C0C0'; // Plata
      case 3: return '#CD7F32'; // Bronce
      default: return '#6B7280';
    }
  };

  const getMedalEmoji = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 ¡Resultados Finales!</Text>
      
      <View style={styles.podiumContainer}>
        {/* Segundo lugar */}
        {sortedPlayers[1] && (
          <View style={styles.podiumPosition}>
            <View style={[styles.podium, { 
              height: getPodiumHeight(2), 
              backgroundColor: getPodiumColor(2) 
            }]}>
              <Text style={styles.medal}>{getMedalEmoji(2)}</Text>
            </View>
            <View style={styles.playerInfo}>
              <Text style={styles.playerAvatar}>
                {catAvatars[sortedPlayers[1].avatar as keyof typeof catAvatars]?.emoji}
              </Text>
              <Text style={styles.playerName}>{sortedPlayers[1].name}</Text>
              <Text style={styles.playerScore}>{sortedPlayers[1].score} pts</Text>
            </View>
          </View>
        )}

        {/* Primer lugar */}
        {sortedPlayers[0] && (
          <View style={styles.podiumPosition}>
            <View style={[styles.podium, { 
              height: getPodiumHeight(1), 
              backgroundColor: getPodiumColor(1) 
            }]}>
              <Text style={styles.medal}>{getMedalEmoji(1)}</Text>
            </View>
            <View style={styles.playerInfo}>
              <Text style={styles.playerAvatar}>
                {catAvatars[sortedPlayers[0].avatar as keyof typeof catAvatars]?.emoji}
              </Text>
              <Text style={styles.playerName}>{sortedPlayers[0].name}</Text>
              <Text style={styles.playerScore}>{sortedPlayers[0].score} pts</Text>
            </View>
          </View>
        )}

        {/* Tercer lugar */}
        {sortedPlayers[2] && (
          <View style={styles.podiumPosition}>
            <View style={[styles.podium, { 
              height: getPodiumHeight(3), 
              backgroundColor: getPodiumColor(3) 
            }]}>
              <Text style={styles.medal}>{getMedalEmoji(3)}</Text>
            </View>
            <View style={styles.playerInfo}>
              <Text style={styles.playerAvatar}>
                {catAvatars[sortedPlayers[2].avatar as keyof typeof catAvatars]?.emoji}
              </Text>
              <Text style={styles.playerName}>{sortedPlayers[2].name}</Text>
              <Text style={styles.playerScore}>{sortedPlayers[2].score} pts</Text>
            </View>
          </View>
        )}
      </View>

      {/* Lista completa de jugadores */}
      <View style={styles.rankingList}>
        <Text style={styles.rankingTitle}>📊 Clasificación Completa</Text>
        {sortedPlayers.map((player, index) => (
          <View key={player.id} style={styles.rankingItem}>
            <Text style={styles.rankingPosition}>#{index + 1}</Text>
            <Text style={styles.rankingAvatar}>
              {catAvatars[player.avatar as keyof typeof catAvatars]?.emoji}
            </Text>
            <Text style={styles.rankingName}>{player.name}</Text>
            <Text style={styles.rankingScore}>{player.score} pts</Text>
          </View>
        ))}
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.playAgainButton} onPress={onPlayAgain}>
          <Text style={styles.playAgainText}>🔄 Jugar Otra Vez</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Text style={styles.backText}>🏠 Volver al Menú</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 30,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 30,
    height: 200,
  },
  podiumPosition: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  podium: {
    width: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 8,
  },
  medal: {
    fontSize: 30,
  },
  playerInfo: {
    alignItems: 'center',
  },
  playerAvatar: {
    fontSize: 40,
    marginBottom: 5,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  playerScore: {
    fontSize: 14,
    color: '#ffd700',
    fontWeight: 'bold',
  },
  rankingList: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  rankingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 15,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
  },
  rankingPosition: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    width: 40,
  },
  rankingAvatar: {
    fontSize: 24,
    marginHorizontal: 15,
  },
  rankingName: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  rankingScore: {
    fontSize: 16,
    color: '#ffd700',
    fontWeight: 'bold',
  },
  actionButtons: {
    gap: 15,
  },
  playAgainButton: {
    backgroundColor: '#10B981',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
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
  },
  backText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});