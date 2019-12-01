import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Scores, ScoresService} from "../../scores.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('form',{static:true}) login: NgForm;
  user:Scores;
  defaultEmail="email";
  defaultPassword="Password";
  constructor(private http: HttpClient, private score:ScoresService) { }

  ngOnInit() {
  }

  submitted(){
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-JnIUJvEhVJeq_XAjNQDjdM1Z5VcVMKY', {"email":this.login.value.email,"password":this.login.value.password,"returnSecureToken":true}).subscribe(response =>{
      this.score.scores.id=response['localId'];
      this.score.getScores(response['localId']);
    });


    /*this.user={
      id: Math.random()*100+1,
      name:this.login.value.username,
      password:this.login.value.password,
      score:this.score.score,
      correctAnswers:this.score.correctAnswers,
      allAnswers:this.score.allAnswers,
      wordsToPractice : this.practice.words,
    };
    this.score.loggedin=1;
    this.score.name=this.user.name;*/
  }
}
