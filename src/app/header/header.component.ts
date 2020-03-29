import {Component} from '@angular/core';
import {ScoresService} from "../scores.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  routerLink(){
    if (this.scores.loggedin) {
      return 'dashboard';
    } else {
      return '';
    }
  }

  signOut() {
    var scoreToSave={
      id: this.scores.scores.id,
      score: this.scores.scores.score,
      correctAnswers: this.scores.scores.correctAnswers,
      allAnswers: this.scores.scores.allAnswers,
      wordsToPractice: this.scores.scores.wordsToPractice,
      mywords: this.scores.scores.mywords,
      bestTimerQuizScore: this.scores.scores.bestTimerQuizScore,
      whichDay: this.scores.scores.whichDay,
      lastLogin: new Date()
    };
    this.scores.newScore(scoreToSave).then(r => console.log((scoreToSave)));
    this.scores.loggedin = 0;
    this.scores.source = [];
    this.scores.cInARow = 0;
    this.scores.scores = {
      id: "",
      score: 0,
      correctAnswers: 0,
      allAnswers: 0,
      wordsToPractice: [],
      mywords: [],
      bestTimerQuizScore: 0,
      whichDay: 0,
      lastLogin: new Date()
    }
  }
  constructor(public scores: ScoresService) { }
}
