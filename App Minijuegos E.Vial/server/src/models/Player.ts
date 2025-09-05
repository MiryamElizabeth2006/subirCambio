import { Player as IPlayer } from '../types';

export class Player implements IPlayer {
  public id: string;
  public name: string;
  public avatar: string;
  public age: string;
  public score: number;
  public isReady: boolean;
  public isConnected: boolean;
  public socketId: string;

  constructor(
    id: string,
    name: string,
    avatar: string,
    age: string,
    socketId: string
  ) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.age = age;
    this.socketId = socketId;
    this.score = 0;
    this.isReady = false;
    this.isConnected = true;
  }

  public updateScore(points: number): void {
    this.score += points;
  }

  public setReady(ready: boolean): void {
    this.isReady = ready;
  }

  public setConnected(connected: boolean): void {
    this.isConnected = connected;
  }

  public toJSON(): IPlayer {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      age: this.age,
      score: this.score,
      isReady: this.isReady,
      isConnected: this.isConnected,
      socketId: this.socketId
    };
  }
}

