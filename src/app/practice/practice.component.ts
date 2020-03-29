import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ScoresService} from "../scores.service";
import {PronounciationService} from "../pronounciation.service";

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  words=[];

  delete(needToDelete){
    this.words.splice(needToDelete,1);
  }
  pronounciation(word){
    this.speech.pronounciation(word);
  }

  constructor(private user:ScoresService, private speech: PronounciationService) {
    this.words=user.scores.wordsToPractice;
  }
  ngOnInit() {
    this.words=this.user.scores.wordsToPractice;
    this.user.source = this.user.scores.wordsToPractice;
  }

}
