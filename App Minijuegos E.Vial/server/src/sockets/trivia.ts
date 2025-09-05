import { Server, Socket } from 'socket.io';
import { Room } from '../models/Room';
import { Player as PlayerModel } from '../models/Player';
import { JoinRoomData, AnswerData } from '../types';
import { getRandomQuestions } from '../data/questions';

export class TriviaSocketHandler {
  private rooms: Map<string, Room> = new Map();
  private playerRooms: Map<string, string> = new Map(); // socketId -> roomId

  constructor(private io: Server) {
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log(`Cliente conectado: ${socket.id}`);

      socket.on('join-room', (data: JoinRoomData) => {
        this.handleJoinRoom(socket, data);
      });

      socket.on('leave-room', () => {
        this.handleLeaveRoom(socket);
      });

      socket.on('player-ready', () => {
        this.handlePlayerReady(socket);
      });

      socket.on('start-game', () => {
        this.handleStartGame(socket);
      });

      socket.on('answer-question', (data: AnswerData) => {
        this.handleAnswerQuestion(socket, data);
      });

      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });
    });
  }

  private handleJoinRoom(socket: Socket, data: JoinRoomData): void {
    try {
      let room = this.findRoomByCode(data.roomCode);
      
      if (!room) {
        // Crear nueva sala
        const questions = getRandomQuestions(10);
        room = new Room('all-vs-all', questions);
        this.rooms.set(room.id, room);
        console.log(`Nueva sala creada: ${room.code}`);
      }

      // Verificar si el jugador ya está en la sala
      const existingPlayer = room.getPlayerBySocketId(socket.id);
      if (existingPlayer) {
        socket.emit('room-joined', { room: room.toJSON(), playerId: existingPlayer.id });
        return;
      }

      // Agregar jugador a la sala
      const player = room.addPlayer(data.player, socket.id);
      this.playerRooms.set(socket.id, room.id);

      // Unir socket a la sala
      socket.join(room.id);

      // Notificar al jugador que se unió
      socket.emit('room-joined', { room: room.toJSON(), playerId: player.id });

      // Notificar a otros jugadores
      socket.to(room.id).emit('player-joined', player.toJSON());

      // Actualizar estado de la sala
      this.broadcastRoomUpdate(room);

      console.log(`Jugador ${player.name} se unió a la sala ${room.code}`);
    } catch (error) {
      console.error('Error al unirse a la sala:', error);
      socket.emit('error', 'Error al unirse a la sala');
    }
  }

  private handleLeaveRoom(socket: Socket): void {
    const roomId = this.playerRooms.get(socket.id);
    if (!roomId) return;

    const room = this.rooms.get(roomId);
    if (!room) return;

    const player = room.getPlayerBySocketId(socket.id);
    if (!player) return;

    // Remover jugador de la sala
    room.removePlayer(player.id);
    this.playerRooms.delete(socket.id);
    socket.leave(room.id);

    // Notificar a otros jugadores
    socket.to(room.id).emit('player-left', player.id);

    // Si la sala queda vacía, eliminarla
    if (room.players.length === 0) {
      this.rooms.delete(roomId);
      console.log(`Sala ${room.code} eliminada (sin jugadores)`);
    } else {
      // Actualizar estado de la sala
      this.broadcastRoomUpdate(room);
    }

    // Notificar al jugador que salió
    socket.emit('room-left');

    console.log(`Jugador ${player.name} salió de la sala ${room.code}`);
  }

  private handlePlayerReady(socket: Socket): void {
    const roomId = this.playerRooms.get(socket.id);
    if (!roomId) return;

    const room = this.rooms.get(roomId);
    if (!room) return;

    const player = room.getPlayerBySocketId(socket.id);
    if (!player) return;

    // Cambiar estado de listo
    const newReadyState = !player.isReady;
    room.setPlayerReady(player.id, newReadyState);

    // Notificar a todos los jugadores
    this.io.to(room.id).emit('player-ready-updated', {
      playerId: player.id,
      isReady: newReadyState
    });

    this.broadcastRoomUpdate(room);
  }

  private handleStartGame(socket: Socket): void {
    const roomId = this.playerRooms.get(socket.id);
    if (!roomId) return;

    const room = this.rooms.get(roomId);
    if (!room) return;

    const player = room.getPlayerBySocketId(socket.id);
    if (!player) return;

    // Verificar que sea el host
    if (room.hostId !== player.id) {
      socket.emit('error', 'Solo el host puede iniciar el juego');
      return;
    }

    // Verificar que se pueda iniciar el juego
    if (!room.canStartGame()) {
      socket.emit('error', 'No se puede iniciar el juego. Todos los jugadores deben estar listos.');
      return;
    }

    // Iniciar el juego
    room.startGame();
    this.broadcastRoomUpdate(room);

    // Notificar que el juego comenzó
    this.io.to(room.id).emit('game-started', { room: room.toJSON() });

    // Iniciar la primera pregunta después de 3 segundos
    setTimeout(() => {
      this.startQuestion(room);
    }, 3000);

    console.log(`Juego iniciado en la sala ${room.code}`);
  }

  private handleAnswerQuestion(socket: Socket, data: AnswerData): void {
    const roomId = this.playerRooms.get(socket.id);
    if (!roomId) return;

    const room = this.rooms.get(roomId);
    if (!room) return;

    const player = room.getPlayerBySocketId(socket.id);
    if (!player) return;

    // Verificar que haya una pregunta activa
    if (!room.currentQuestion || room.status !== 'playing') {
      return;
    }

    // Verificar que la pregunta coincida
    if (room.currentQuestion.id !== data.questionId) {
      return;
    }

    // Calcular puntuación
    const isCorrect = data.answer === room.currentQuestion.correctAnswer;
    const timeBonus = Math.max(0, data.timeLeft - 10) * 2; // Bonus por velocidad
    const baseScore = isCorrect ? 100 : 0;
    const totalScore = baseScore + timeBonus;

    // Actualizar puntuación del jugador
    room.updatePlayerScore(player.id, totalScore);

    // Notificar respuesta (solo al jugador)
    socket.emit('answer-received', {
      isCorrect,
      score: totalScore,
      timeBonus
    });

    console.log(`Jugador ${player.name} respondió: ${isCorrect ? 'Correcto' : 'Incorrecto'} (+${totalScore} puntos)`);
  }

  private handleDisconnect(socket: Socket): void {
    const roomId = this.playerRooms.get(socket.id);
    if (!roomId) return;

    const room = this.rooms.get(roomId);
    if (!room) return;

    const player = room.getPlayerBySocketId(socket.id);
    if (!player) return;

    // Marcar jugador como desconectado
    player.setConnected(false);

    // Notificar a otros jugadores
    socket.to(room.id).emit('player-left', player.id);

    // Si la sala queda vacía, eliminarla
    if (room.players.length === 0) {
      this.rooms.delete(roomId);
    } else {
      this.broadcastRoomUpdate(room);
    }

    this.playerRooms.delete(socket.id);

    console.log(`Jugador ${player.name} se desconectó de la sala ${room.code}`);
  }

  private startQuestion(room: Room): void {
    if (!room.currentQuestion) return;

    // Notificar inicio de pregunta
    this.io.to(room.id).emit('question-started', {
      question: room.currentQuestion,
      timeLeft: room.timeLeft
    });

    // Iniciar temporizador
    const timer = setInterval(() => {
      room.timeLeft--;
      
      if (room.timeLeft <= 0) {
        clearInterval(timer);
        this.endQuestion(room);
      }
    }, 1000);
  }

  private endQuestion(room: Room): void {
    if (!room.currentQuestion) return;

    // Notificar fin de pregunta
    this.io.to(room.id).emit('question-ended', {
      correctAnswer: room.currentQuestion.correctAnswer,
      results: room.players.map(player => ({
        playerId: player.id,
        isCorrect: false, // Se calculará basado en las respuestas recibidas
        score: player.score
      }))
    });

    // Esperar 3 segundos antes de la siguiente pregunta
    setTimeout(() => {
      if (room.nextQuestion()) {
        this.startQuestion(room);
      } else {
        this.endGame(room);
      }
    }, 3000);
  }

  private endGame(room: Room): void {
    room.endGame();

    // Notificar fin del juego
    this.io.to(room.id).emit('game-ended', {
      results: room.results
    });

    this.broadcastRoomUpdate(room);

    console.log(`Juego terminado en la sala ${room.code}`);
  }

  private findRoomByCode(code: string): Room | undefined {
    for (const room of this.rooms.values()) {
      if (room.code === code) {
        return room;
      }
    }
    return undefined;
  }

  private broadcastRoomUpdate(room: Room): void {
    this.io.to(room.id).emit('room-updated', room.toJSON());
  }
}

