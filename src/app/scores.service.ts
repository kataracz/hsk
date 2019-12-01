import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { AngularFirestore } from '@angular/fire/firestore';
import {FirebaseListObservable} from "@angular/fire/database-deprecated";


export class Scores {
  id:string;
  score: number;
  correctAnswers: number;
  allAnswers: number;
  wordsToPractice : any [];
  mywords: any [];

  constructor(){
    this.id="";
    this.score=0;
    this.correctAnswers=0;
    this.allAnswers=0;
    this.wordsToPractice = [];
    this.mywords=[];
  }

}

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  scores:Scores;
  loggedin;
  cInARow: number;
  source: any[];

  getScores(id:string) {
    return this.firestore.collection('scores').doc(id).get().subscribe(data=>{
      this.scores={
        id: data.data().id,
        score:data.data().score,
        correctAnswers:data.data().correctAnswers,
        allAnswers:data.data().allAnswers,
        wordsToPractice:data.data().wordsToPractice,
        mywords:data.data().mywords
      };
      this.loggedin=1;
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
  /*updateScore(score: Scores){
    delete score.id;
    this.firestore.collection('scores').doc(score.id).update(score)
      .then(function() {
        console.log("Score updated!");
      })
      .catch(function(error) {
        console.error("Error: ", error);
      });
  }*/
  constructor(private http:HttpClient,private firestore: AngularFirestore) {

    this.loggedin=0;
    this.cInARow=0;
    this.scores={
      id: "",
      score:0,
      correctAnswers:0,
      allAnswers:0,
      wordsToPractice:[],
      mywords:[]
    }
  }
}
