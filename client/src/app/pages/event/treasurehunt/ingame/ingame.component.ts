import { Component, OnInit } from '@angular/core';
import {reject} from "q";
import {HttpService} from "../../../../shared/util/http.service";
import {UserSessionService} from "../../../../shared/util/user-session.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  showNext: Boolean = false;
  userSession = null;
  private paramsSub: any;

  constructor(private session: UserSessionService,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              private treasurehuntService: TreasurehuntService) {
    this.userSession = this.session.getSession();
  }

  ngOnInit() {
    this.paramsSub = this.activatedRouter.params.subscribe(params => {
      this.eventId = params['id'];
      this.getCurrentQuestion();
    });
  }

  checkAnswerAndChangeState() {
    this.treasurehuntService.checkIsCorrectAnswer(this.userSession._id, this.eventId, this.answer).subscribe(response => {
      if (response['error']) {
        alert(response['error']);
      } else {
        /**check if the answer is correct */
        response['data'] ? this.performIfUserCorrect() : this.performIfUserWrong();
      }
    });
  }

  performIfUserCorrect() {
    alert('correct answer!!!');
    this.showNext = true;
  }

  performIfUserWrong() {
    alert('Wrong answer!!! try again');
  }

  private getCurrentQuestion() {
    this.treasurehuntService.getUserState(this.userSession._id, this.eventId).subscribe(state => {
      this.state = state['data'][0];
      /** check state if completed or in progress*/
      if (this.state['completed']) {
        this.router.navigate(['/event', 'treasurehunt', 'finished']);
      } else {
        this.requestAndRenderQuestion();
      }
    });
  }

  private requestAndRenderQuestion() {
    this.treasurehuntService.getUserStageQuestion(this.userSession._id, this.eventId).subscribe((response) => {
      /** showing new question for state*/
      this.showNext = false;
      this.question = response;
    });
  }
}
