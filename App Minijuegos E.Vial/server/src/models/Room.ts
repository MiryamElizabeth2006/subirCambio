import { v4 as uuidv4 } from 'uuid';
import { Room as IRoom, Player, Question, GameMode, RoomStatus, GameResult } from '../types';
import { Player as PlayerModel } from './Player';

export class Room implements IRoom {
  public id: string;
  public code: string;
  public hostId: string;
  public players: Player[];
  public gameMode: GameMode;
  public status: RoomStatus;
  public currentQuestion?: Question;
  public questionIndex: number;
  public totalQuestions: number;
  public timeLeft: number;
  public results: GameResult[];
  public questions: Question[];

  constructor(gameMode: GameMode, questions: Question[]) {
    this.id = uuidv4();
    this.code = this.generateRoomCode();
    this.hostId = '';
    this.players = [];
    this.gameMode = gameMode;
    this.status = 'waiting';
    this.questionIndex = 0;
    this.totalQuestions = questions.length;
    this.timeLeft = 30;
    this.results = [];
    this.questions = questions;
  }

  private generateRoomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  public addPlayer(playerData: Omit<Player, 'id' | 'score' | 'isReady' | 'isConnected' | 'socketId'>, socketId: string): PlayerModel {
    const player = new PlayerModel(
      uuidv4(),
      playerData.name,
      playerData.avatar,
      playerData.age,
      socketId
    );

    if (this.players.length === 0) {
      this.hostId = player.id;
    }

    this.players.push(player);
    return player;
  }

  public removePlayer(playerId: string): void {
    this.players = this.players.filter(p => p.id !== playerId);
    
    // Si el host se va, asignar nuevo host
    if (this.hostId === playerId && this.players.length > 0) {
      this.hostId = this.players[0].id;
    }
  }

  public getPlayer(playerId: string): PlayerModel | undefined {
    return this.players.find(p => p.id === playerId) as PlayerModel;
  }

  public getPlayerBySocketId(socketId: string): PlayerModel | undefined {
    return this.players.find(p => p.socketId === socketId) as PlayerModel;
  }

  public setPlayerReady(playerId: string, ready: boolean): void {
    const player = this.getPlayer(playerId);
    if (player) {
      player.setReady(ready);
    }
  }

  public canStartGame(): boolean {
    return this.players.length >= 2 && this.players.every(p => p.isReady);
  }

  public startGame(): void {
    this.status = 'playing';
    this.questionIndex = 0;
    this.currentQuestion = this.questions[0];
    this.timeLeft = 30;
  }

  public nextQuestion(): boolean {
    this.questionIndex++;
    if (this.questionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.questionIndex];
      this.timeLeft = 30;
      return true;
    } else {
      this.endGame();
      return false;
    }
  }

  public endGame(): void {
    this.status = 'finished';
    this.results = this.players.map(player => ({
      playerId: player.id,
      playerName: player.name,
      score: player.score,
      correctAnswers: 0, // Se calculará basado en las respuestas
      totalAnswers: this.questionIndex,
      timeBonus: 0
    }));
  }

  public updatePlayerScore(playerId: string, points: number): void {
    const player = this.getPlayer(playerId);
    if (player) {
      player.updateScore(points);
    }
  }

  public toJSON(): IRoom {
    return {
      id: this.id,
      code: this.code,
      hostId: this.hostId,
      players: this.players.map(p => p.toJSON()),
      gameMode: this.gameMode,
      status: this.status,
      currentQuestion: this.currentQuestion,
      questionIndex: this.questionIndex,
      totalQuestions: this.totalQuestions,
      timeLeft: this.timeLeft,
      results: this.results,
      questions: this.questions
    };
  }
}

