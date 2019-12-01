import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import Speech from 'speak-tts';
import {ScoresService} from "../scores.service";

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  @Output() chosenFunction= new EventEmitter<string>();
  words=[];
  speech = new Speech();
  constructor(private user:ScoresService) {
    this.words=user.scores.wordsToPractice;
  }
  onSelect(section:string){
    this.chosenFunction.emit(section);
    this.user.source=this.words;
  }
  delete(needToDelete){
    this.words.splice(needToDelete,1);
  }
  pronounciation(word){
    let i=0;
    speechSynthesis.getVoices().forEach(voice => {
      i++;
      if(i==17){
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

  ngOnInit() {
    this.speech.init({'lang': 'zh-CN'}).then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
      console.log("Speech is ready, voices are available", data)
    }).catch(e => {
      console.error("An error occured while initializing : ", e)
    });
  }

}
