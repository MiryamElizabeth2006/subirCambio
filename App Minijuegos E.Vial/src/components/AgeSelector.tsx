import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface AgeSelectorProps {
  selectedAge: string;
  onAgeSelect: (age: string) => void;
}

const ageGroups = [
  { value: '5-7', label: '5-7 años', icon: '👶', description: 'Pequeños exploradores' },
  { value: '8-10', label: '8-10 años', icon: '👦', description: 'Aventureros' },
  { value: '11-12', label: '11-12 años', icon: '👨', description: 'Expertos' }
];

export const AgeSelector: React.FC<AgeSelectorProps> = ({ selectedAge, onAgeSelect }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = (age: string) => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    onAgeSelect(age);
  };

  return (
    <View className="w-full">
      <Text className="text-2xl font-bold text-center mb-6 text-primary-600">
        🎂 ¿Cuántos años tienes?
      </Text>
      
      <View className="space-y-4">
        {ageGroups.map((ageGroup, index) => (
          <Animated.View key={index} style={animatedStyle}>
            <TouchableOpacity
              onPress={() => handlePress(ageGroup.value)}
              className={`p-6 rounded-2xl border-2 ${
                selectedAge === ageGroup.value
                  ? 'border-primary-500 bg-primary-100'
                  : 'border-gray-300 bg-white'
              }`}
              style={{
                shadowColor: selectedAge === ageGroup.value ? '#22c55e' : '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <View className="flex-row items-center space-x-4">
                <Text className="text-4xl">{ageGroup.icon}</Text>
                <View className="flex-1">
                  <Text className={`text-xl font-bold ${
                    selectedAge === ageGroup.value ? 'text-primary-700' : 'text-gray-800'
                  }`}>
                    {ageGroup.label}
                  </Text>
                  <Text className={`text-sm ${
                    selectedAge === ageGroup.value ? 'text-primary-600' : 'text-gray-600'
                  }`}>
                    {ageGroup.description}
                  </Text>
                </View>
                {selectedAge === ageGroup.value && (
                  <Text className="text-2xl">✅</Text>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

