import {Component, OnInit} from '@angular/core';
import {ScoresService} from "../../scores.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  progress;
  achievementClicked = false;
  achievementInfo = {
    title: 'string',
    desc: ''
  };
  level;
  playedToday;
  time: Date;
  info: any[];
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
    {"title":"Student", "description":"Start practicing and become a student!","achieved":false, "image": "/assets/student.png"},
    {"title":"Confident", "description":"Gain confidence: the less words you get wrong, the better!","achieved":false, "image": "/assets/happy.png"},
    {"title":"Pro quiz player", "description":"Get your best quiz score above 20!","achieved":false, "image": "/assets/question.png"},
    {"title":"So productive", "description":"Practice 10 mins a day for a week","achieved":false, "image": "/assets/studying.png"},
    {"title":"Unicorn", "description":"To get the official Unicorn title, get your score to 5 000","achieved":false, "image": "/assets/unicorn.png"}
    ];

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

  showAchievemntInfo(achievement) {
    this.achievementInfo.title = achievement.title;
    this.achievementInfo.desc = achievement.description;
    this.achievementClicked = true;
    setTimeout(()=>{this.achievementClicked=false}, 4000);
  }

  checkScores(){
    this.progress=this.user.scores.correctAnswers/(this.user.scores.allAnswers/100);
    var levelscore=Math.floor(this.user.scores.score/200);
    this.level=this.levels[levelscore];
    this.playedToday = Math.floor((this.time.getTime() -this.user.startedToday.getTime())/1000/60);
    if(this.playedToday>10 && this.user.isNewDay) {
      this.user.scores.whichDay +=1;
    }
    this.info = [
      {title: 'Welcome back', data: this.level},
      {title: 'Total score', data: this.user.scores.score},
      {title: 'Best quiz score (timer mode)', data: this.user.scores.bestTimerQuizScore},
    ];
    if(levelscore>14){
      this.level="Expert";
    }
    if(this.user.scores.score!=0){
      this.achieved("Student");
    }
    if(this.progress>=80){
      this.achieved("Confident");
    }
    if(this.user.scores.score>=5000){
      this.achieved("Unicorn");
    }
    if(this.user.scores.bestTimerQuizScore >= 20) {
      this.achieved("Pro quiz player");
    }
    if(this.user.scores.whichDay >= 7) {
      this.achieved("So productive");
    }
  }
  constructor(public user:ScoresService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    if(!this.user.loggedin){
      this.router.navigate(['/']);
    } else {
      this.time = new Date();
      this.checkScores();
    }
  }
}
