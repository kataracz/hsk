import {Component, EventEmitter, HostBinding, Inject, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HttpErrorResponse } from '@angular/common/http';
import {FlashcardsService} from "../flashcards.service";
import {QuizService} from "../quiz.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-hsk',
  templateUrl: './hsk.component.html',
  styleUrls: ['./hsk.component.scss']
})
export class HskComponent implements OnInit {
  words = [];
  @Input() public src:string;
  @Output() myword= new EventEmitter<string>();
  @Output() chosenFunction= new EventEmitter<string>();

  pageIndex=0;
  pageSize=10;
  length=this.words.length;
  pageSizeOptions=[5,10,20];
  pageEvent:PageEvent;
  displayedWords=this.words.slice(0,10);
  setPageSizeOptions(pageSizeOption: string) {
    this.pageSizeOptions=pageSizeOption.split(',').map(str=> +str);
  }
  changePage(e){
    let low=e.pageIndex*e.pageSize;
    let high=low+e.pageSize;
    this.displayedWords= this.words.slice(low,high);
  }

  addWord(word:string){
    this.myword.emit(word);
  }
  flashcards(){
    this.flashcard.flashcardsSource=this.words;
  }
  quiz(){
    this.quizz.quizSource=this.words;
  }
  onSelect(section: string){
    this.chosenFunction.emit(section);
  }

  constructor (private httpService: HttpClient,private flashcard:FlashcardsService, private quizz:QuizService) {
  }
  ngOnInit () {
    this.httpService.get(this.src).subscribe(
      data => {
        this.words = data as string [];
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
}
