import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ScoresService} from "../scores.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() chosenSection= new EventEmitter<string>();
  constructor(private http: HttpClient, private user:ScoresService) {
  }
  emit(e){
    this.chosenSection.emit(e);
  }
  IsUserLoggedin(){
    return this.user.loggedin;
  }
  ngOnInit() {

  }

}
