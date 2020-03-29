import {Component, OnDestroy, OnInit} from '@angular/core';
import {Scores, ScoresService} from "../scores.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {PronounciationService} from "../pronounciation.service";

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
  flashcardLink: string;
  quizLink: string;
  boardgameLink: string;

  pronounciation(word) {
    this.speech.pronounciation(word);
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
            this.pronounciation(this.chosenwords[i].hanzi);
            this.correct();
            this.guessedright.push(this.chosen1,this.chosen2);
            break;
          }else {
            this.notCorrect(this.chosenwords[i]);
            break;
          }
        }else if(this.chosen2==this.chosenwords[i].hanzi){
          if(this.chosenwords[i].pinyin==this.chosen1){
            this.pronounciation(this.chosenwords[i].hanzi);
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
  getScore(){
    return this.scores.scores.score;
  }

  constructor(public scores:ScoresService, private httpService: HttpClient, private route: ActivatedRoute,
              private router: Router, private speech: PronounciationService) {
    this.words=scores.source;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var param = params.get('level');
      if(!param){
        this.words = this.scores.source;
        this.choose();
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
          this.words=this.scores.source;
          this.choose();
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
                this.words = data as string [];
                this.scores.source=this.words;
                this.choose();

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
      this.scores.newScore(this.scoreToSave).then(r => console.log(('score saved')));
    }

  }
}
