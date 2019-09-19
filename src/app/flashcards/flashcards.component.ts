import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FlashcardsService} from "../flashcards.service";

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit {
  fwords=[];
  aclicked=false;
  qclicked=false;
  card;
  englishFirst=false;
  @Output() myword= new EventEmitter<string>();
  constructor(private httpService: HttpClient,private flashcards:FlashcardsService) {
    this.fwords=flashcards.getFlashcardsSource();
  }
  addWord(word:string){
    this.myword.emit(word);
  }
  wannaKnowPinyin(){
    this.qclicked=true;
  }
  wannaKnowAnswer(){
    this.aclicked=true
  }
  wannaKnowEnglishFirst(){
    if (this.englishFirst==true){
      this.englishFirst=false;
    }
    else {
      this.englishFirst=true;
    }
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

}
