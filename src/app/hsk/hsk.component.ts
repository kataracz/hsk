import {Component, EventEmitter, HostBinding, Inject, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HttpErrorResponse } from '@angular/common/http';
import {PageEvent} from "@angular/material/paginator";
import Speech from 'speak-tts'
import {Scores, ScoresService} from "../scores.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-hsk',
  templateUrl: './hsk.component.html',
  styleUrls: ['./hsk.component.scss']
})
export class HskComponent implements OnInit, OnDestroy {
  words = [];
  @Input() public src:string;
  @Output() chosenFunction= new EventEmitter<string>();
  @ViewChild('form',{static:true}) form: NgForm;
  scoreToSave:Scores;
  touched=false;
  speech = new Speech();
  searched="";

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

  pronounciation(word){

    let i=0;
    speechSynthesis.getVoices().forEach(voice => {
      if(voice.lang=="zh-CN"){
        this.speech.setVoice(voice.name);
      }
    });

    this.speech.speak({
      text: word,
    }).then(() => {
      console.log("Success !")
    }).catch(e => {
      console.error("An error occurred :", e)
    })
  }

  addWord(word:string){
    if(!this.user.scores.mywords.includes(word)) {
      this.user.scores.mywords.push(word);
      this.touched=true;
    }
  }
  isMyWord(word){
    if(this.user.scores.mywords.includes(word)){
      return 'none';
    }else{
      return 'grayscale(100%)';
    }
  }
  onSelect(section: string){
    this.chosenFunction.emit(section);
    this.user.source=this.words;
  }

  search(){
    this.words.forEach((value)=>{
      if(value.hanzi==this.form.value.search||value.translations.includes(this.form.value.search)){
        this.searched=value;
      }
    });
  }

  constructor (private httpService: HttpClient,private user:ScoresService) {

  }
  ngOnInit () {
    //get data from the JSON files
    //the JSON files containing the words for each HSK level can be found at https://github.com/gigacool/hanyu-shuiping-kaoshi/
    //these files are created by a github user named gigacool
    this.httpService.get(this.src).subscribe(
      data => {
        this.words = data as string [];
        this.displayedWords=this.words.slice(0,10);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );

    this.speech.init({'lang': 'zh-CN', 'voiceURI': 'Google 普通话（中国大陆）'}).then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
      console.log("Speech is ready, voices are available", data)
    }).catch(e => {
      console.error("An error occured while initializing : ", e)
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
        mywords: this.user.scores.mywords
      };
      this.user.newScore(this.scoreToSave).then(r => console.log((this.scoreToSave)));
    }
  }

}
