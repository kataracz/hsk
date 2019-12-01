import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import Speech from 'speak-tts'
import {ScoresService} from "../scores.service";

@Component({
  selector: 'app-mywords',
  templateUrl: './mywords.component.html',
  styleUrls: ['./mywords.component.scss']
})
export class MywordsComponent implements OnInit {
  public words=[];
  @Output() chosenFunction= new EventEmitter<string>();
  constructor(private user:ScoresService) {
    this.words=user.scores.mywords;
  }

  onSelect(section:string){
    this.chosenFunction.emit(section);
    this.user.source=this.words;
  }
  delete(needToDelete){
    this.words.splice(needToDelete,1);
  }
  pronounciation(word){
    const speech = new Speech();

    let i=0;
    speechSynthesis.getVoices().forEach(voice => {
      i++;
      if(i==17){
        speech.setVoice(voice.name);
      }
    });

    speech.init({'lang': 'zh-CN'}).then((data) => {
      // The "data" object contains the list of available voices and the voice synthesis params
      console.log("Speech is ready, voices are available", data)
    }).catch(e => {
      console.error("An error occured while initializing : ", e)
    });

    speech.speak({
      text: word,
    }).then(() => {
      console.log("Success !")
    }).catch(e => {
      console.error("An error occurred :", e)
    })
  }

  ngOnInit() {
  }

}
