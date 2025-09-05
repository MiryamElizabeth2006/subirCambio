import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface AvatarSelectorProps {
  selectedAvatar: string;
  onAvatarSelect: (avatar: string) => void;
}

const avatars = [
  { emoji: '🚗', name: 'Carro' },
  { emoji: '🚲', name: 'Bicicleta' },
  { emoji: '🚦', name: 'Semáforo' },
  { emoji: '🚶‍♂️', name: 'Peatón' },
  { emoji: '🚌', name: 'Autobús' },
  { emoji: '🚑', name: 'Ambulancia' },
  { emoji: '🚓', name: 'Policía' },
  { emoji: '🚚', name: 'Camión' },
  { emoji: '🏍️', name: 'Moto' },
  { emoji: '🚁', name: 'Helicóptero' },
  { emoji: '🚢', name: 'Barco' },
  { emoji: '✈️', name: 'Avión' }
];

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selectedAvatar, onAvatarSelect }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = (avatar: string) => {
    scale.value = withSpring(0.9, {}, () => {
      scale.value = withSpring(1);
    });
    onAvatarSelect(avatar);
  };

  return (
    <View className="w-full">
      <Text className="text-2xl font-bold text-center mb-6 text-primary-600">
        🎭 Elige tu Avatar
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="mb-4"
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        <View className="flex-row space-x-4">
          {avatars.map((avatar, index) => (
            <Animated.View key={index} style={animatedStyle}>
              <TouchableOpacity
                onPress={() => handlePress(avatar.emoji)}
                className={`w-20 h-20 rounded-full items-center justify-center border-4 ${
                  selectedAvatar === avatar.emoji
                    ? 'border-primary-500 bg-primary-100'
                    : 'border-gray-300 bg-white'
                }`}
                style={{
                  shadowColor: selectedAvatar === avatar.emoji ? '#22c55e' : '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <Text className="text-3xl">{avatar.emoji}</Text>
              </TouchableOpacity>
              <Text className="text-xs text-center mt-2 text-gray-600 font-medium">
                {avatar.name}
              </Text>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

