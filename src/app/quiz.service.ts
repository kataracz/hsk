import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizSource=[];
  getQuizSource(){
    return this.quizSource;
  }

}
