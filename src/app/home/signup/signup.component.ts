import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Scores, ScoresService} from "../../scores.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('form',{static:true}) login: NgForm;
  user:Scores;
  defaultEmail="email";
  defaultPassword="Password";
  defConfirmPassword=this.defaultPassword;
  pwderror=0;

  constructor(private http: HttpClient, private score:ScoresService) { }

  ngOnInit() {
  }

  submitted(){
    if(this.login.value.password==this.login.form.value.confirmPassword){


    }else{this.pwderror=1;}

    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-JnIUJvEhVJeq_XAjNQDjdM1Z5VcVMKY', {"email":this.login.value.email,"password":this.login.value.password , "returnSecureToken":true}).subscribe(response =>{
     /*this.user={
        id: response['localId'],
        score: this.score.score,
        correctAnswers: this.score.correctAnswers,
        allAnswers: this.score.allAnswers,
        wordsToPractice: this.score.wordsToPractice,
        mywords: this.score.scores.mywords
     };*/
     this.user=this.score.scores;
     this.score.scores.id=response['localId'];
     this.score.newScore(this.user).then(r => console.log(r));
      /* this.http.post('https://hsk-practice.firebaseio.com/scores.json', {
        /!*name:response['localId'],*!/
          userId: response['localId'],
          score: this.score.score,
          correctAnswers: this.score.correctAnswers,
          allAnswers: this.score.allAnswers,
          wordsToPractice: this.score.wordsToPractice,
          mywords: this.score.mywords
      }).subscribe(scores =>{
        this.score.name=scores['name'];
        console.log(response['dbId']);

    });*/

      this.score.loggedin=1;
    });
  }


}
