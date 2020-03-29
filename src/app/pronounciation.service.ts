import {Injectable} from "@angular/core";
import Speech from 'speak-tts';


@Injectable({
  providedIn: 'root'
})
export class PronounciationService {
  speech = new Speech();

  pronounciation(word){
    speechSynthesis.getVoices().forEach(voice => {
      if(voice.lang=="zh-CN"){
        this.speech.setVoice(voice.name);
      }
    });

    this.speech.speak({text: word}).catch(e => {
      console.error(e);
    })
  }

  constructor() {
    this.speech.init({'lang': 'zh-CN', 'voiceURI': 'Google 普通话（中国大陆）'}).catch(e => {
      console.error(e);
    });
  }
}
