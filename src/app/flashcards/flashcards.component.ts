import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Scores, ScoresService} from "../scores.service";
import {ActivatedRoute} from "@angular/router";

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
  scoreToSave: Scores;
  flashcardLink;
  quizLink;
  boardgameLink;

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
  }
  isMyWord(word){
    return this.user.scores.mywords.includes(word);
  }

  constructor(private httpService: HttpClient, public user:ScoresService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var param = params.get('level');
      if(!param){
        this.fwords = this.user.source;
        this.generateCard();
        if(this.user.source == this.user.scores.wordsToPractice){
          this.flashcardLink = '/practice/flashcards';
          this.quizLink = '/practice/quiz';
          this.boardgameLink = '/practice/boardgame';
        }
        else if (this.user.source == this.user.scores.mywords){
          this.flashcardLink = '/mywords/flashcards';
          this.quizLink = '/mywords/quiz';
          this.boardgameLink = '/mywords/boardgame';
        }
      } else {
        var hskLevel = '/hsk/' + params.get('level');
        this.flashcardLink = hskLevel + '/flashcards';
        this.quizLink = hskLevel + '/quiz';
        this.boardgameLink = hskLevel + '/boardgame';
        if (this.user.source) {
          this.fwords=this.user.source;
          this.generateCard();
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
                this.fwords = data as string [];
                this.user.source=this.fwords;
                this.generateCard();

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
    if(this.user.loggedin==1&&this.touched==true){
      this.scoreToSave={
        id: this.user.scores.id,
        score: this.user.scores.score,
        correctAnswers: this.user.scores.correctAnswers,
        allAnswers: this.user.scores.allAnswers,
        wordsToPractice: this.user.scores.wordsToPractice,
        mywords: this.user.scores.mywords,
        bestTimerQuizScore: this.user.scores.bestTimerQuizScore,
        whichDay: this.user.scores.whichDay,
        lastLogin: this.user.scores.lastLogin
      };
      this.user.newScore(this.scoreToSave).then(r => console.log((this.scoreToSave)));
    }
  }

}
