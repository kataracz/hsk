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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from "@angular/material/paginator";
import {PageEvent} from "@angular/material/paginator";
import {RouterModule, Routes} from "@angular/router";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { BoardgameComponent } from './boardgame/boardgame.component';
import { FormsModule} from "@angular/forms";
import { PracticeComponent } from './practice/practice.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule} from "@angular/fire/firestore";
import { ScoresComponent } from './home/scores/scores.component';

export const firebaseConfig = environment.firebaseConfig;
const routes: Routes=[
  {path:'',component:HomeComponent},
  {path:'dashboard',component:ScoresComponent},
  {path:'practice',component:PracticeComponent},
  {path:'practice/flashcards',component:FlashcardsComponent},
  {path:'practice/quiz',component:QuizComponent},
  {path:'practice/boardgame',component:BoardgameComponent},
  {path:'hsk/:level',component:HskComponent},
  {path:'hsk/:level/flashcards',component:FlashcardsComponent},
  {path:'hsk/:level/quiz',component:QuizComponent},
  {path:'hsk/:level/boardgame',component:BoardgameComponent},
  {path:'mywords',component:MywordsComponent},
  {path:'mywords/flashcards',component:FlashcardsComponent},
  {path:'mywords/quiz',component:QuizComponent},
  {path:'mywords/boardgame',component:BoardgameComponent},
  {path: '**', component:PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MywordsComponent,
    HskComponent,
    HomeComponent,
    FlashcardsComponent,
    QuizComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
    BoardgameComponent,
    PracticeComponent,
    ScoresComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [PageEvent],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule { }
