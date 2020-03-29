import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ScoresService} from "../../scores.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('form',{static:true}) login: NgForm;
  defaultEmail="";
  defaultPassword="";

  constructor(private http: HttpClient, private score:ScoresService) { }

  ngOnInit() {
  }

  submitted(){
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-JnIUJvEhVJeq_XAjNQDjdM1Z5VcVMKY', {"email":this.login.value.email,"password":this.login.value.password,"returnSecureToken":true}).subscribe(response =>{
      this.score.getScores(response['localId']);
    });
  }
}
