import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  playedToday: number;
  startTime: Date;
  lastPlayed: Date;
  whichDay;

  constructor() {
    this.playedToday= 0;
    this.startTime= new Date();
    this.lastPlayed= null;
    this.whichDay= 0;
  }
}
