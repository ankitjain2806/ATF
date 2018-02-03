import { Component, OnInit } from '@angular/core';
import {reject} from "q";
import {HttpService} from "../../../../shared/util/http.service";
import {UserSessionService} from "../../../../shared/util/user-session.service";
import {ActivatedRoute} from "@angular/router";
import {TreasurehuntService} from "../treasurehunt.service";

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss']
})
export class IngameComponent implements OnInit {

  eventId: string;
  question = {};
  answer = {};
  state = {};
  userSession = null;
  private paramsSub: any;

  constructor(private session: UserSessionService,
              private activatedRouter: ActivatedRoute,
              private treasurehuntService: TreasurehuntService) {
    this.userSession = this.session.getSession();
    console.log('user sesion', this.userSession._id);
  }

  ngOnInit() {
    this.paramsSub = this.activatedRouter.params.subscribe(params => {
      this.eventId = params['id'];
      this.getCurrentQuestion();
    });
  }

  private checkAnswerAndChangeState() {
    this.treasurehuntService.checkIsCorrectAnswer(this.answer).subscribe(response => {
      if (response['data']) {
        this.getCurrentQuestion();
      } else {
        window.alert('wrong answer');
      }
    });
  }

  private getCurrentQuestion() {
    this.treasurehuntService.getUserState(this.userSession._id, this.eventId).subscribe(state => {
      this.state = state;
      this.treasurehuntService.getUserStageQuestion(this.userSession._id, this.eventId).subscribe((response) => {
        this.question = response;
      });
    });
  }
}
