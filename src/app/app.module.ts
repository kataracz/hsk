import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MywordsComponent } from './mywords/mywords.component';
import { HskComponent } from './hsk/hsk.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { QuizComponent } from './quiz/quiz.component';
import {FlashcardsService} from "./flashcards.service";
import {QuizService} from "./quiz.service";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from "@angular/material/paginator";
import {PageEvent} from "@angular/material/paginator";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MywordsComponent,
    HskComponent,
    HomeComponent,
    FlashcardsComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule
  ],
  providers: [FlashcardsService,QuizService,PageEvent],
  bootstrap: [AppComponent]
})
export class AppModule { }
