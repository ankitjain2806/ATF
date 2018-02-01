import { Component, OnInit } from '@angular/core';
import {reject} from "q";
import {HttpService} from "../../../../shared/util/http.service";
import {UserSessionService} from "../../../../shared/util/user-session.service";

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss']
})
export class IngameComponent implements OnInit {

  question = {};
  answer = {};
  state = {};
  userSession = null;

  constructor(private httpService: HttpService, private session: UserSessionService) {
    this.userSession = this.session.getSession();
    console.log('user sesion', this.userSession);
  }

  ngOnInit() {
/*    this.userSession = this.session.getSession();
    console.log('user sesion', this.userSession);*/
    this.getCurrentQuestion();
  }

  getUserStageQuestion(userId) {
    this.httpService.post('http://localhost:3000/api/events/treasurehunt/question', {user: userId})
      .subscribe((response) => {
        this.question = response;
      });
  }

  private getUserState(number: number) {
    return new Promise((resolve, rjt) => {
      setTimeout(function () {
        const state = {'inStage': number};
        resolve(state);
      }, 100);
    });
    // this.httpService.post('http://localhost:3000/api/events/state', {user: this.userSession});
  }

  private checkAnswerAndChangeState() {
    this.CheckAnswerCorrectness().subscribe(response => {
      if (response['data']) {
        this.getCurrentQuestion();
      } else {
        window.alert('wrong answer');
      }
    });
  }

  private getCurrentQuestion() {
    this.getUserState(1).then(state => {
      this.state = state;
      this.getUserStageQuestion(123);
    });
  }

  private CheckAnswerCorrectness() {
    return this.httpService.post('http://localhost:3000/api/events/treasurehunt/question/check', {user: 1, answer: this.answer});
  }
}
