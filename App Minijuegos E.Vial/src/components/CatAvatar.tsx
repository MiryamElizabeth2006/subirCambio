import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CatAvatarProps {
  avatar: string;
  isSelected: boolean;
  onSelect: (avatar: string) => void;
}

const catAvatars = {
  'cat1': { emoji: '🐱', name: 'Gatito Azul', color: '#3B82F6' },
  'cat2': { emoji: '🐈', name: 'Gatita Rosa', color: '#EC4899' },
  'cat3': { emoji: '😸', name: 'Gatito Verde', color: '#10B981' },
  'cat4': { emoji: '😺', name: 'Gatita Púrpura', color: '#8B5CF6' },
  'cat5': { emoji: '🙀', name: 'Gatito Naranja', color: '#F59E0B' },
  'cat6': { emoji: '😿', name: 'Gatita Amarilla', color: '#EAB308' },
};

export default function CatAvatar({ avatar, isSelected, onSelect }: CatAvatarProps) {
  const cat = catAvatars[avatar as keyof typeof catAvatars];
  
  return (
    <TouchableOpacity
      style={[
        styles.avatarContainer,
        isSelected && { ...styles.selectedAvatar, borderColor: cat.color }
      ]}
      onPress={() => onSelect(avatar)}
    >
      <View style={[styles.avatarCircle, { backgroundColor: cat.color }]}>
        <Text style={styles.avatarEmoji}>{cat.emoji}</Text>
      </View>
      <Text style={[styles.avatarName, isSelected && { color: cat.color }]}>
        {cat.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    margin: 8,
    padding: 8,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: 'transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedAvatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ scale: 1.1 }],
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 8,
  },
  avatarEmoji: {
    fontSize: 32,
  },
  avatarName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export { catAvatars };
