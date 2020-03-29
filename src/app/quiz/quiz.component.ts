import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Scores, ScoresService} from "../scores.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PronounciationService} from "../pronounciation.service";

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
  timer=false;
  timerModeCount = 0 ;
  counter: { min: number, sec: number };
  flashcardLink: string;
  quizLink: string;
  boardgameLink: string;
  showTimerCount = false;

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

  pronounciation(word) {
    this.speech.pronounciation(word);
  }
  isMyWord(word){
    return this.scores.scores.mywords.includes(word);
  }

  correct(){
    this.touched=true;
    this.correctAnswer=1;
    setTimeout(()=>{this.generateQuestion();this.correctAnswer=0;},2000);
    clearTimeout();
    if(this.timer) {
      this.timerModeCount++;
    }

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

  timerMode() {
    this.timer = true;
    this.counter = { min: 2, sec: 0 };// choose whatever you want
    this.ticktock();
  }

  ticktock(){
    let intervalId = setInterval(() => {
      if (this.counter.sec - 1 == -1) {
        this.counter.min -= 1;
        this.counter.sec = 59
      }
      else this.counter.sec -= 1;
      if (this.counter.min === 0 && this.counter.sec == 0) {
        clearInterval(intervalId);
        this.showTimerCount = true;
        setTimeout(()=>{this.timer=false; this.showTimerCount=false; this.generateQuestion()},4000);
        clearTimeout();
        if (this.timerModeCount > this.scores.scores.bestTimerQuizScore) {
          this.scores.scores.bestTimerQuizScore = this.timerModeCount;
        }
      }
    }, 1000)
  }

  constructor(private httpService: HttpClient, public scores:ScoresService, private route: ActivatedRoute,
              private router: Router, private speech: PronounciationService) {
    this.qwords=scores.source;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var param = params.get('level');
      if(!param){
        this.qwords = this.scores.source;
        this.generateQuestion();
        if(this.scores.source == this.scores.scores.wordsToPractice){
          this.flashcardLink = '/practice/flashcards';
          this.quizLink = '/practice/quiz';
          this.boardgameLink = '/practice/boardgame';
        }
        else if (this.scores.source == this.scores.scores.mywords){
          this.flashcardLink = '/mywords/flashcards';
          this.quizLink = '/mywords/quiz';
          this.boardgameLink = '/mywords/boardgame';
        }
      } else {
        var hskLevel = '/hsk/' + params.get('level');
        this.flashcardLink = hskLevel + '/flashcards';
        this.quizLink = hskLevel + '/quiz';
        this.boardgameLink = hskLevel + '/boardgame';
        if (this.scores.source) {
          this.qwords=this.scores.source;
          this.generateQuestion();
        }
        else {
          this.route.paramMap.subscribe(params => {
            var hskLevel = '/hsk/' + params.get('level');
            this.flashcardLink = hskLevel + '/flashcards';
            this.quizLink = hskLevel + '/quiz';
            this.boardgameLink = hskLevel + '/boardgame';
            var src = 'assets/hsk-level-' + params.get('level') + '.json';

            //get data from the JSON files
            //the JSON files containing the words for each HSK level can be found at https://github.com/gigacool/hanyu-shuiping-kaoshi/
            //these files are created by a github user named gigacool
            this.httpService.get(src).subscribe(
              data => {
                this.qwords = data as string [];
                this.scores.source=this.qwords;
                this.generateQuestion();

              },
              (err: HttpErrorResponse) => {
                console.log (err.message);
              }
            );
          });
        }
      }
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
        mywords: this.scores.scores.mywords,
        bestTimerQuizScore: this.scores.scores.bestTimerQuizScore,
        whichDay: this.scores.scores.whichDay,
        lastLogin: this.scores.scores.lastLogin
      };
      this.scores.newScore(this.scoreToSave).then(r => console.log((this.scoreToSave)));
    }
    }
}
