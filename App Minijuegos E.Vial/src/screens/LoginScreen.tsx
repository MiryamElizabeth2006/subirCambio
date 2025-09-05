import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence
} from 'react-native-reanimated';
import { AvatarSelector } from '../components/AvatarSelector';
import { AgeSelector } from '../components/AgeSelector';

interface LoginScreenProps {
  onLogin: (playerData: { name: string; avatar: string; age: string }) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🚗');
  const [selectedAge, setSelectedAge] = useState('5-7');
  const [currentStep, setCurrentStep] = useState(0);

  const titleScale = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  React.useEffect(() => {
    titleScale.value = withSequence(
      withSpring(0.8, { damping: 15 }),
      withSpring(1, { damping: 15 })
    );
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep === 0 && name.trim().length < 2) {
      Alert.alert('¡Ups!', 'Por favor escribe tu nombre (mínimo 2 letras)');
      return;
    }
    
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleLogin();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLogin = () => {
    buttonScale.value = withSequence(
      withSpring(0.95, { damping: 15 }),
      withSpring(1, { damping: 15 })
    );
    
    onLogin({
      name: name.trim(),
      avatar: selectedAvatar,
      age: selectedAge
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View className="w-full">
            <Text className="text-2xl font-bold text-center mb-6 text-primary-600">
              👋 ¡Hola! ¿Cómo te llamas?
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Escribe tu nombre aquí..."
              className="bg-white border-2 border-primary-300 rounded-2xl p-4 text-xl text-center font-semibold"
              placeholderTextColor="#9ca3af"
              maxLength={20}
              autoFocus
            />
            <Text className="text-sm text-gray-500 text-center mt-2">
              Mínimo 2 letras
            </Text>
          </View>
        );
      
      case 1:
        return (
          <AvatarSelector
            selectedAvatar={selectedAvatar}
            onAvatarSelect={setSelectedAvatar}
          />
        );
      
      case 2:
        return (
          <AgeSelector
            selectedAge={selectedAge}
            onAgeSelect={setSelectedAge}
          />
        );
      
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0: return 'Paso 1 de 3';
      case 1: return 'Paso 2 de 3';
      case 2: return 'Paso 3 de 3';
      default: return '';
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 0: return 'Siguiente ➡️';
      case 1: return 'Siguiente ➡️';
      case 2: return '¡Empezar a Jugar! 🎮';
      default: return 'Siguiente';
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-gradient-to-b from-primary-50 to-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="pt-16 pb-8 px-6">
          <Animated.Text style={titleAnimatedStyle} className="text-4xl font-bold text-center text-primary-600 mb-2">
            🚦 Educación Vial
          </Animated.Text>
          <Text className="text-lg text-center text-gray-600">
            ¡Aprende jugando sobre seguridad vial!
          </Text>
        </View>

        {/* Progress indicator */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-center space-x-2">
            {[0, 1, 2].map((step) => (
              <View
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step <= currentStep ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </View>
          <Text className="text-center text-sm text-gray-500 mt-2">
            {getStepTitle()}
          </Text>
        </View>

        {/* Content */}
        <View className="flex-1 px-6 justify-center">
          {renderStep()}
        </View>

        {/* Buttons */}
        <View className="px-6 pb-8 space-y-4">
          <Animated.View style={buttonAnimatedStyle}>
            <TouchableOpacity
              onPress={handleNext}
              className="bg-primary-500 py-4 rounded-2xl items-center"
              style={{
                shadowColor: '#22c55e',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Text className="text-white text-xl font-bold">
                {getButtonText()}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {currentStep > 0 && (
            <TouchableOpacity
              onPress={handleBack}
              className="bg-gray-300 py-3 rounded-2xl items-center"
            >
              <Text className="text-gray-700 text-lg font-semibold">
                ⬅️ Atrás
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

