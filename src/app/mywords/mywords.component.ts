import {Component, OnInit, ViewChild} from '@angular/core';
import {ScoresService} from "../scores.service";
import {NgForm} from "@angular/forms";
import {PronounciationService} from "../pronounciation.service";

@Component({
  selector: 'app-mywords',
  templateUrl: './mywords.component.html',
  styleUrls: ['./mywords.component.scss']
})
export class MywordsComponent implements OnInit {
  public words=[];
  @ViewChild('form',{static:true}) form: NgForm;
  searched={
    "pinyin":"",
    "hanzi":"",
    "translations":""
  };

  delete(needToDelete){
    this.words.splice(needToDelete,1);
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

  constructor(private user:ScoresService, private speech: PronounciationService) {}

  ngOnInit() {
    this.words=this.user.scores.mywords;
    this.user.source = this.user.scores.mywords;
  }
}
