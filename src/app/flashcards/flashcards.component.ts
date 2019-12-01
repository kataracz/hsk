import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ScoresService} from "../scores.service";

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit,OnDestroy {
  fwords=[];
  aclicked=false;
  qclicked=false;
  card;
  englishFirst=false;
  touched=false;
  scoreToSave;
  constructor(private httpService: HttpClient,private user:ScoresService) {
    this.fwords=user.source;
  }
  addWord(word:string){
    if(!this.user.scores.mywords.includes(word)) {
      this.user.scores.mywords.push(word);
      this.touched=true;
    }
  }
  wannaKnowPinyin(){
    this.qclicked=true;
  }
  wannaKnowAnswer(){
    this.aclicked=true
  }
  wannaKnowEnglishFirst(){
    this.englishFirst = this.englishFirst != true;
  }
  generateCard(){
    this.card=this.fwords[Math.floor(Math.random()*this.fwords.length)];
    this.aclicked=false;
    this.qclicked=false;
    for (let i;i<this.card.translations.length;i++){
      if(this.card.translations[i].length>20){
        this.card.translations.splice(i,1);
      }
    }
    //
    //this.card.translations=this.card.translations[0];
  }

  ngOnInit() {
    this.generateCard();
  }
  ngOnDestroy(): void {
    if(this.user.loggedin==1&&this.touched==true){
      this.scoreToSave={
        id: this.user.scores.id,
        score: this.user.scores.score,
        correctAnswers: this.user.scores.correctAnswers,
        allAnswers: this.user.scores.allAnswers,
        wordsToPractice: this.user.scores.wordsToPractice,
        mywords: this.user.scores.mywords
      };
      this.user.newScore(this.scoreToSave).then(r => console.log((this.scoreToSave)));
    }
  }

}
