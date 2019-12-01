import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Scores, ScoresService} from "../../scores.service";

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  @Output() chosenSection= new EventEmitter<string>();
  scores:Scores;
  progress;
  constructor(private user:ScoresService) {

  }
  onSelect(section: string){
    this.chosenSection.emit(section);
  }
  ngOnInit() {
    this.scores=this.user.scores;
    this.progress=this.scores.correctAnswers/(this.scores.allAnswers/100);
  }

}
