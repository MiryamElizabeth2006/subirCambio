# 🚦 App Minijuegos E.Vial

Una aplicación educativa de trivias sobre educación vial para niños de 5 a 12 años en Ecuador, desarrollada con React Native, Expo y Socket.IO.

## 🎯 Características

- **Login divertido**: Selección de avatar, nombre y edad
- **Múltiples modos de juego**: 1v1, Todos vs Todos, Torneos
- **Tiempo real**: Comunicación instantánea con Socket.IO
- **Educación vial**: Preguntas adaptadas para niños ecuatorianos
- **UI amigable**: Diseño colorido y apto para niños
- **Ranking en vivo**: Competencia dinámica entre jugadores

## 🏗️ Arquitectura

### Frontend (React Native + Expo)
```
src/
├── components/          # Componentes reutilizables
│   ├── AvatarSelector.tsx
│   ├── QuestionCard.tsx
│   ├── RankingBoard.tsx
│   ├── Podium.tsx
│   └── AgeSelector.tsx
├── screens/            # Pantallas principales
│   ├── LoginScreen.tsx
│   ├── ModeSelectionScreen.tsx
│   ├── LobbyScreen.tsx
│   ├── TriviaScreen.tsx
│   └── PodiumScreen.tsx
├── services/           # Servicios
│   └── socket.ts
├── data/              # Datos estáticos
│   └── questions.ts
└── types/             # Tipos TypeScript
    └── index.ts
```

### Backend (Node.js + Socket.IO)
```
server/src/
├── models/            # Modelos de datos
│   ├── Player.ts
│   └── Room.ts
├── sockets/           # Lógica de Socket.IO
│   └── trivia.ts
├── data/             # Preguntas y datos
│   └── questions.ts
├── types/            # Tipos TypeScript
│   └── index.ts
└── index.ts          # Servidor principal
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Expo CLI
- Android Studio / Xcode (para desarrollo móvil)

### Frontend

1. **Instalar dependencias**:
```bash
npm install
```

2. **Iniciar el servidor de desarrollo**:
```bash
npm start
```

3. **Ejecutar en dispositivo**:
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### Backend

1. **Navegar al directorio del servidor**:
```bash
cd server
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Ejecutar en modo desarrollo**:
```bash
npm run dev
```

4. **Compilar para producción**:
```bash
npm run build
npm start
```

## 🎮 Modos de Juego

### 1. Batalla 1v1
- Dos jugadores compiten cara a cara
- El más rápido en responder gana la ronda
- Mejor de 3 rondas

### 2. Todos vs Todos
- Todos los jugadores responden simultáneamente
- Ranking dinámico en tiempo real
- Puntuación basada en velocidad y precisión

### 3. Torneo
- Eliminación directa
- Mínimo 4 jugadores
- Llaves automáticas

## 🚦 Educación Vial

Las preguntas cubren temas esenciales:
- **Semáforos**: Significado de luces roja, amarilla y verde
- **Peatones**: Derechos y responsabilidades
- **Bicicletas**: Seguridad y equipamiento
- **Señales**: Reconocimiento de señales viales
- **Velocidad**: Límites en zonas escolares
- **Autobuses**: Comportamiento seguro
- **Seguridad**: Cinturones y medidas de protección

## 🎨 Diseño para Niños

- **Colores vibrantes**: Verde, amarillo, rojo, azul
- **Íconos grandes**: Emojis y símbolos visuales
- **Texto simple**: Lenguaje adaptado a cada edad
- **Animaciones suaves**: Transiciones divertidas
- **Botones grandes**: Fáciles de tocar

## 🔧 Configuración de Desarrollo

### Variables de Entorno

Crear archivo `.env` en el directorio raíz:
```env
# Backend
PORT=3001
NODE_ENV=development

# Frontend
EXPO_PUBLIC_SERVER_URL=http://localhost:3001
```

### Estructura de Red

- **Frontend**: Puerto 8081 (Expo)
- **Backend**: Puerto 3001
- **Socket.IO**: Mismo puerto que backend

## 📱 Compatibilidad

- **Android**: 6.0+ (API 23+)
- **iOS**: 11.0+
- **Web**: Navegadores modernos

## 🚀 Despliegue

### Frontend (Expo)
```bash
# Build para producción
expo build:android
expo build:ios

# O usar EAS Build
eas build --platform all
```

### Backend
```bash
# Compilar TypeScript
npm run build

# Ejecutar en producción
npm start
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

Desarrollado para la educación vial de niños en Ecuador.

## 🆘 Soporte

Para soporte técnico o preguntas:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo

---

**¡Aprende sobre educación vial de manera divertida! 🚦🎮**

