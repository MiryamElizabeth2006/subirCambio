import { io, Socket } from 'socket.io-client';
import { SocketEvents } from '../types';

class SocketService {
  private socket: Socket | null = null;
  private serverUrl = 'http://localhost:3001'; // Cambiar por la URL de tu servidor

  connect(): Socket {
    if (!this.socket) {
      this.socket = io(this.serverUrl, {
        transports: ['websocket'],
        timeout: 20000,
      });

      this.socket.on('connect', () => {
        console.log('Conectado al servidor');
      });

      this.socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
      });

      this.socket.on('error', (error) => {
        console.error('Error del socket:', error);
      });
    }
    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  // Métodos para emitir eventos
  joinRoom(roomCode: string, player: any): void {
    this.socket?.emit('join-room', { roomCode, player });
  }

  leaveRoom(): void {
    this.socket?.emit('leave-room');
  }

  setPlayerReady(): void {
    this.socket?.emit('player-ready');
  }

  answerQuestion(questionId: string, answer: number, timeLeft: number): void {
    this.socket?.emit('answer-question', { questionId, answer, timeLeft });
  }

  startGame(): void {
    this.socket?.emit('start-game');
  }

  // Métodos para escuchar eventos
  onRoomJoined(callback: (data: any) => void): void {
    this.socket?.on('room-joined', callback);
  }

  onRoomLeft(callback: () => void): void {
    this.socket?.on('room-left', callback);
  }

  onPlayerJoined(callback: (player: any) => void): void {
    this.socket?.on('player-joined', callback);
  }

  onPlayerLeft(callback: (playerId: string) => void): void {
    this.socket?.on('player-left', callback);
  }

  onPlayerReadyUpdated(callback: (data: any) => void): void {
    this.socket?.on('player-ready-updated', callback);
  }

  onGameStarted(callback: (data: any) => void): void {
    this.socket?.on('game-started', callback);
  }

  onQuestionStarted(callback: (data: any) => void): void {
    this.socket?.on('question-started', callback);
  }

  onQuestionEnded(callback: (data: any) => void): void {
    this.socket?.on('question-ended', callback);
  }

  onGameEnded(callback: (data: any) => void): void {
    this.socket?.on('game-ended', callback);
  }

  onRoomUpdated(callback: (room: any) => void): void {
    this.socket?.on('room-updated', callback);
  }

  onError(callback: (message: string) => void): void {
    this.socket?.on('error', callback);
  }

  // Limpiar listeners
  removeAllListeners(): void {
    this.socket?.removeAllListeners();
  }

  removeListener(event: string): void {
    this.socket?.removeListener(event);
  }
}

export const socketService = new SocketService();

