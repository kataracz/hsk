import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Scores, ScoresService} from "../../scores.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('form',{static:true}) login: NgForm;
  user:Scores;
  defaultEmail="";
  defaultPassword="";
  defConfirmPassword=this.defaultPassword;
  pwderror=0;
  signupMessage = false;

  goTo(){
    this.score.getScores(this.score.scores.id);
  }

  submitted(){
    if(this.login.value.password==this.login.form.value.confirmPassword){
      this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-JnIUJvEhVJeq_XAjNQDjdM1Z5VcVMKY', {"email":this.login.value.email,"password":this.login.value.password , "returnSecureToken":true}).subscribe(response =>{
        this.score.scores.id = response['localId'];
        this.score.newScore(this.score.scores).then(()=> this.signupMessage = true);
      });
    }else{
      this.pwderror=1;
    }
  }

  constructor(private http: HttpClient, private score:ScoresService) { }
}
