import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {
  flashcardsSource=[];
  getFlashcardsSource(){
    return this.flashcardsSource;

  }

}
