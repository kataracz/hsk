import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FlashcardsService} from "../flashcards.service";
import {QuizService} from "../quiz.service";

@Component({
  selector: 'app-mywords',
  templateUrl: './mywords.component.html',
  styleUrls: ['./mywords.component.scss']
})
export class MywordsComponent implements OnInit {
  @Input() public words=[];
  @Output() chosenFunction= new EventEmitter<string>();
  constructor(private flashcard:FlashcardsService, private quizz:QuizService) {
  }
  flashcards(){
    this.flashcard.flashcardsSource=this.words;
  }
  quiz(){
    this.quizz.quizSource=this.words;
  }
  onSelect(section:string){
    this.chosenFunction.emit(section);
  }
  delete(needToDelete){
    this.words.splice(needToDelete,1);
  }

  ngOnInit() {
  }

}
