import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() chosenSection= new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onSelect(section: string){
    this.chosenSection.emit(section);
  }
}
