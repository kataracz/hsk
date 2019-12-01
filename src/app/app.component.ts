import {Component, OnDestroy} from '@angular/core';
import {ScoresService} from "./scores.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Hsk practice';
  displayedSection='';
  user;
  navigate(section: string){
    this.displayedSection=section;
  }
  constructor(private score:ScoresService){

  }

}
