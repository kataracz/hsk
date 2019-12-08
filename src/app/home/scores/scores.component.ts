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
  level;
  levels=["Newbie",
    "Novice",
    "Rookie",
    "Beginner",
    "Talented",
    "Skilled",
    "Intermediate",
    "Skillful",
    "Seasoned",
    "Proficient",
    "Experienced",
    "Advanced",
    "Senior",
    "Expert"];
  achievements=[
    {"title":"Confidence", "description":"Gain confidence: the less words you get wrong, the better!","achieved":false, "image": "/assets/happy.png"},
    {"title":"Pro quiz player", "description":"Play as many quizes as you can!","achieved":false, "image": "/assets/question.png"},
    {"title":"Student", "description":"Start practicing and become a student!","achieved":false, "image": "/assets/student.png"},
    {"title":"The Good Student", "description":"Be THE Good Student and take some time to study these characters","achieved":false, "image": "/assets/studying.png"},
    {"title":"Unicorn", "description":"To get the official Unicorn title, get your score to 5 000","achieved":false, "image": "/assets/unicorn.png"}
    ];
  constructor(private user:ScoresService) {

  }
  onSelect(section: string){
    this.chosenSection.emit(section);
  }
  isAchieved(achievement){
    if(achievement.achieved){
      return 'none';
    }else{
      return 'grayscale(100%)';
    }
  }
  achieved(title){
    this.achievements.forEach(function(value){
      if(value.title==title){
        value.achieved=true;
      }
    });
  }
  ngOnInit() {
    this.scores=this.user.scores;
    this.progress=this.scores.correctAnswers/(this.scores.allAnswers/100);
    var levelscore=Math.floor(this.user.scores.score/200);
    if(levelscore>14){
      this.level="Expert";
    }
    if(this.user.scores.score!=0){
        this.achieved("Student");
    }
    if(this.progress>=80){
      this.achieved("Confidence");
    }
    if(this.user.scores.score>=5000){
      this.achieved("Unicorn");
    }

    this.level=this.levels[levelscore];
  }

}
