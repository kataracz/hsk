import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hsk practice';
  displayedSection='';
  navigate(section: string){
    this.displayedSection=section;
  }
  mywords=[];
  addWord(word:string){
    if(!this.mywords.includes(word)) {
      this.mywords.push(word);
    }
  }
}
