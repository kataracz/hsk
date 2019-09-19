import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {QuizService} from "../quiz.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  qwords=[];
  question;
  answers=[];
  correctAnswer=0;
  mode=0;
  feedback=0;
  practiceMore=0;
  @Output() myword= new EventEmitter<string>();
  constructor(private httpService: HttpClient,private quiz:QuizService) {
    this.qwords=quiz.getQuizSource();
  }
  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  generateAnswers(){
    this.answers[0]=this.question;
    let i=1;
    while(i<4){
      this.answers[i]=this.qwords[Math.floor(Math.random()*this.qwords.length)];
      i++;
      if (this.answers[i]==this.question){
        this.generateAnswers();
      }
    }
    this.shuffle(this.answers);
    this.correctAnswer=0;
  }
  generateQuestion(){
    this.question=this.qwords[Math.floor(Math.random()*this.qwords.length)];
    this.generateAnswers();
  }
  correct(){
    this.correctAnswer=1;
    setTimeout(()=>{this.generateQuestion()},2000);
    clearTimeout();
    this.feedback++;
    if (this.feedback>=21){
      this.feedback=0;
    }
    this.practiceMore=0;
  }
  notCorrect(){
    this.correctAnswer=-1;
    setTimeout(()=>{this.correctAnswer=0},2000);
    clearTimeout();
    this.feedback=0;
    this.practiceMore++;
  }
  addWord(word:string){
    this.myword.emit(word);
  }

  ngOnInit() {
    this.mode=0;
    this.generateQuestion();

  }

}
