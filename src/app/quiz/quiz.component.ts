import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import Speech from 'speak-tts'
import {Scores, ScoresService} from "../scores.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  qwords=[];
  question;
  answers=[];
  feedback=0;
  practiceMore=0;
  correctAnswer=0;
  scoreToSave:Scores;
  touched=false;
  pinyin=false;
  speech = new Speech();
  constructor(private httpService: HttpClient, private scores:ScoresService) {
    this.qwords=scores.source;
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

  pronounciation(){
    this.scores.scores.score-=2;

    let i=0;
    speechSynthesis.getVoices().forEach(voice => {
      i++;
      if(i==17){
        this.speech.setVoice(voice.name);
      }
    });

    this.speech.speak({
      text: this.question.hanzi,
    }).then(() => {
      console.log("Success !")
    }).catch(e => {
      console.error("An error occurred :", e)
    })
  }

  correct(){
    this.touched=true;
    this.correctAnswer=1;
    setTimeout(()=>{this.generateQuestion();this.correctAnswer=0;},2000);
    clearTimeout();

    this.feedback++;
    this.practiceMore=0;
    this.scores.scores.allAnswers++;
    this.scores.scores.correctAnswers++;
    if(this.feedback>=this.scores.cInARow){
      this.scores.cInARow =this.feedback;
    }
    this.scores.scores.score+=5;

  }
  notCorrect(){
    this.touched=true;
    this.correctAnswer=-1;
    setTimeout(()=>{this.correctAnswer=0},2000);
    clearTimeout();
    this.feedback=0;
    this.practiceMore++;
    this.scores.scores.allAnswers++;
    this.scores.scores.score-=3;
    if(!this.scores.scores.wordsToPractice.includes(this.question)){
      this.scores.scores.wordsToPractice.push(this.question);
    }

  }
  addWord(word:string){
    if(!this.scores.scores.mywords.includes(word)) {
      this.scores.scores.mywords.push(word);
    }
  }
  getScore(){
    return this.scores.scores.score;
  }

  ngOnInit() {
    this.generateQuestion();
    this.speech.init({'lang': 'zh-CN'}).then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
      console.log("Speech is ready, voices are available", data)
    }).catch(e => {
      console.error("An error occured while initializing : ", e)
    });
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
