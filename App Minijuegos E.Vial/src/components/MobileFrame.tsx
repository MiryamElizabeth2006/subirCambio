import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MobileFrameProps {
  children: React.ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <View style={styles.container}>
      {/* Marco del celular */}
      <View style={styles.phoneFrame}>
        {/* Pantalla del celular */}
        <View style={styles.phoneScreen}>
          {/* Contenido de la app */}
          <View style={styles.appContent}>
            {children}
          </View>
        </View>
        
        {/* Botón home */}
        <View style={styles.homeButton} />
        
        {/* Altavoz */}
        <View style={styles.speaker} />
        
        {/* Cámara frontal */}
        <View style={styles.frontCamera} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  phoneFrame: {
    width: 320,
    height: 640,
    backgroundColor: '#2d2d2d',
    borderRadius: 40,
    padding: 8,
    elevation: 20,
    position: 'relative',
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  appContent: {
    flex: 1,
    backgroundColor: '#f0fdf4', // Color de fondo de la app
  },
  homeButton: {
    position: 'absolute',
    bottom: 15,
    left: '50%',
    marginLeft: -30,
    width: 60,
    height: 4,
    backgroundColor: '#666',
    borderRadius: 2,
  },
  speaker: {
    position: 'absolute',
    top: 20,
    left: '50%',
    marginLeft: -25,
    width: 50,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  frontCamera: {
    position: 'absolute',
    top: 15,
    right: 20,
    width: 12,
    height: 12,
    backgroundColor: '#333',
    borderRadius: 6,
  },
});
