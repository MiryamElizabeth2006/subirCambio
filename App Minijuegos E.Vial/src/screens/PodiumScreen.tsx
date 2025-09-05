import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Podium } from '../components/Podium';
import { GameResult } from '../types';

interface PodiumScreenProps {
  results: GameResult[];
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const PodiumScreen: React.FC<PodiumScreenProps> = ({
  results,
  onPlayAgain,
  onBackToMenu
}) => {
  return (
    <View className="flex-1">
      <Podium
        results={results}
        onPlayAgain={onPlayAgain}
        onBackToMenu={onBackToMenu}
      />
    </View>
  );
};

