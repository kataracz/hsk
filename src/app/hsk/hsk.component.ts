import {Component, EventEmitter, HostBinding, Inject, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-hsk3',
  templateUrl: './hsk3.component.html',
  styleUrls: ['./hsk3.component.css']
})
export class Hsk3Component implements OnInit {
  words = [];
  @Input() src:string;
  @Output() myword= new EventEmitter<string>();

  addWord(word:string){
    this.myword.emit(word);
  }

  constructor (private httpService: HttpClient) {
  }

  ngOnInit () {
    this.httpService.get(this.src).subscribe(
      data => {
        this.words = data as string [];
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
}
