import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HttpErrorResponse } from '@angular/common/http';
import {PageEvent} from "@angular/material/paginator";
import {Scores, ScoresService} from "../scores.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PronounciationService} from "../pronounciation.service";

@Component({
  selector: 'app-hsk',
  templateUrl: './hsk.component.html',
  styleUrls: ['./hsk.component.scss']
})
export class HskComponent implements OnInit, OnDestroy {
  words = [];
  src;
  hskLevel;
  @ViewChild('form',{static:true}) form: NgForm;
  scoreToSave:Scores;
  touched=false;
  searchedWord="";
  searched={
    "pinyin":"",
    "hanzi":"",
    "translations":""
  };

  pageIndex=0;
  pageSize=10;
  length=this.words.length;
  pageSizeOptions=[5,10,20];
  pageEvent:PageEvent;
  displayedWords=[];
  setPageSizeOptions(pageSizeOption: string) {
    this.pageSizeOptions=pageSizeOption.split(',').map(str=> +str);
  }
  changePage(e){
    let low=e.pageIndex*e.pageSize;
    let high=low+e.pageSize;
    this.displayedWords= this.words.slice(low,high);
  }

  addWord(word){
    if(!this.user.scores.mywords.includes(word)) {
      this.user.scores.mywords.push(word);
      this.touched=true;
    }
  }
  isMyWord(word){
    return this.user.scores.mywords.includes(word);
  }

  search(){
    this.words.forEach((value)=>{
      if(value.hanzi==this.form.value.search||value.translations.includes(this.form.value.search)){
        this.searched=value;
      }
    });
  }

  pronounciation(word) {
    this.speech.pronounciation(word);
  }

  constructor (private httpService: HttpClient,private user:ScoresService, private route: ActivatedRoute,
               private router: Router,private http: HttpClient, private speech: PronounciationService) {

  }
  ngOnInit () {
    this.route.paramMap.subscribe(params => {
      this.src = 'assets/hsk-level-' + params.get('level') + '.json';
      this.hskLevel = 'hsk/' + params.get('level');

      //get data from the JSON files
      //the JSON files containing the words for each HSK level can be found at https://github.com/gigacool/hanyu-shuiping-kaoshi/
      //these files are created by a github user named gigacool
      this.httpService.get(this.src).subscribe(
        data => {
          this.words = data as string [];
          this.user.source=this.words;
          this.displayedWords=this.words.slice(0,10);
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
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
