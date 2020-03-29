import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { AngularFirestore } from '@angular/fire/firestore';
import {Router} from "@angular/router";

export class Scores {
  id:string;
  score: number;
  correctAnswers: number;
  allAnswers: number;
  wordsToPractice : any [];
  mywords: any [];
  bestTimerQuizScore: number;
  whichDay: number;
  lastLogin: Date;


  constructor(){
    this.id="";
    this.score=0;
    this.correctAnswers=0;
    this.allAnswers=0;
    this.wordsToPractice = [];
    this.mywords=[];
    this.bestTimerQuizScore = 0;
    this.whichDay = 0;
    this.lastLogin = new Date();
  }

}

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  scores:Scores;
  loggedin: number;
  cInARow: number;
  source: any[];
  placeOnCharts: number;
  startedToday: Date;
  isNewDay: boolean;

  getScores(id:string) {
    return this.firestore.collection('scores').doc(id).get().subscribe(data=>{
      this.scores={
        id: data.data().id,
        score:data.data().score,
        correctAnswers:data.data().correctAnswers,
        allAnswers:data.data().allAnswers,
        wordsToPractice:data.data().wordsToPractice,
        mywords:data.data().mywords,
        bestTimerQuizScore:data.data().bestTimerQuizScore,
        whichDay: data.data().whichDay,
        lastLogin: data.data().lastLogin
      };
      this.getChart();
      this.loggedin=1;
      this.startedToday = new Date();
      this.router.navigate(['/dashboard']);
    });
  }

  getChart() {
    var chart = [];
    this.firestore.collection('scores').get().subscribe((data)=> {
      data.forEach((doc) => {
        chart.push(doc.data().score);
      });
      chart = chart.sort((n1,n2) => n1 - n2);
      chart.reverse();
      for (let i=0; i<chart.length;i++){
        if (chart[i] == this.scores.score){
          this.placeOnCharts = i + 1;
          break;
        }
      }
    });
  }

  newScore(score: Scores){
    return this.firestore.collection('scores').doc(score.id).set(score)
      .then(function() {
      console.log("Score saved!");
    })
      .catch(function(error) {
        console.error("Error: ", error);
      });
  }
  constructor(private http:HttpClient,private firestore: AngularFirestore, private router: Router) {

    this.loggedin=0;
    this.cInARow=0;
    this.placeOnCharts=1;

    this.scores={
      id: "",
      score:0,
      correctAnswers:0,
      allAnswers:0,
      wordsToPractice:[],
      mywords:[],
      bestTimerQuizScore: 0,
      whichDay: 0,
      lastLogin: new Date()
    }
  }
}
