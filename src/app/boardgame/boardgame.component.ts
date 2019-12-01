import {Component, OnDestroy, OnInit} from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import {Scores, ScoresService} from "../scores.service";

@Component({
  selector: 'app-boardgame',
  templateUrl: './boardgame.component.html',
  styleUrls: ['./boardgame.component.scss']
})
export class BoardgameComponent implements OnInit , OnDestroy{
  words = [];
  word;
  chosenwords=[];
  tiles= [];
  feedback=0;
  practiceMore=0;
  chosen1;
  chosen2;
  guessedright=[];
  scoreToSave:Scores;
  touched=false;
  constructor(private scores:ScoresService) {
    this.words=scores.source;
  }

  guess(word) {

    if(!this.chosen1&&!this.chosen2){
      this.chosen1=word;
    }
    else if(this.chosen1&&!this.chosen2){
      this.touched=true;
      this.chosen2=word;
      for(let i=0;i<10; i++){
        if(this.chosen1==this.chosenwords[i].hanzi){
          if(this.chosenwords[i].pinyin==this.chosen2){
            this.correct();
            this.guessedright.push(this.chosen1,this.chosen2);
            break;
          }else {
            this.notCorrect(this.chosenwords[i]);
            break;
          }
        }else if(this.chosen2==this.chosenwords[i].hanzi){
          if(this.chosenwords[i].pinyin==this.chosen1){
            this.correct();
            this.guessedright.push(this.chosen1,this.chosen2);
            break;
          }else{
            this.notCorrect(this.chosenwords[i]);
            break;
          }
        }
      }
      this.chosen1="";
      this.chosen2="";
    }
  }
  isguessedright(word){
    if(this.chosen1==word||this.chosen2==word){
      return 'lightgrey';
    }
    if(this.guessedright.includes(word)){
      return 'lightgreen';
    }else{
      return 'transparent';
    }
}
  correct(){
    this.feedback++;
    this.practiceMore=0;
    this.scores.scores.allAnswers++;
    this.scores.scores.correctAnswers++;
    if(this.feedback>=this.scores.cInARow){
      this.scores.cInARow =this.feedback;
    }
    this.scores.scores.score+=5;
  }
  notCorrect(word){
    this.feedback=0;
    this.practiceMore++;
    this.scores.scores.allAnswers++;
    this.scores.scores.score-=3;
    if(!this.scores.scores.wordsToPractice.includes(word)){
      this.scores.scores.wordsToPractice.push(word);
    }
  }
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  choose(){
    for(let i=0;i<10;i++){
      this.generate();
    }
    for (let i=0;i<10;i++){
        this.tiles.push(this.chosenwords[i].hanzi);
    }
    for (let i=0;i<10;i++){
      this.tiles.push(this.chosenwords[i].pinyin);
    }

    this.shuffle(this.tiles);
  }
  generate(){
    this.word=this.words[Math.floor(Math.random()*this.words.length)];
    if(this.chosenwords&&this.chosenwords.includes(this.word)){
      this.generate();
    }else {
      this.chosenwords.push(this.word);
  }
  }

  generateBoard(){
    this.chosenwords=[];
    this.guessedright=[];
    this.tiles=[];
    this.choose();
  }

  ngOnInit() {
    this.choose();
  }
  getScore(){
    return this.scores.scores.score;
  }
  ngOnDestroy(): void {
    if(this.scores.loggedin==1&&this.touched){
      this.scoreToSave={
        id: this.scores.scores.id,
        score: this.scores.scores.score,
        correctAnswers: this.scores.scores.correctAnswers,
        allAnswers: this.scores.scores.allAnswers,
        wordsToPractice: this.scores.scores.wordsToPractice,
        mywords: this.scores.scores.mywords
      };
      this.scores.newScore(this.scoreToSave).then(r => console.log((this.scoreToSave)));
    }
    }
}
