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

  slug: string;
  question = {};
  answer = {
    value: []
  };
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
    // const slug = this.activatedRouter.params['slug'];
    this.paramsSub = this.activatedRouter.params.subscribe(params => {
      this.slug = params['slug'];
      this.getCurrentQuestion();
    });
  }

  checkAnswerAndChangeState() {
    const userAnswer = this.treasurehuntService.getAnswerParam(this.answer, this.question['type']);
    this.answer = this.treasurehuntService.resetAnswer();
    this.treasurehuntService.checkIsCorrectAnswer({
      user: this.userSession._id,
      event: this.slug,
      answer: userAnswer
    }).subscribe(response => {
      if (response['error']) {
        alert(response['error']);
      } else {
        /**check if the answer is correct */
        response['data'] ? this.performIfUserCorrect() : this.performIfUserWrong();
      }
    });
  }

  private performIfUserCorrect() {
    alert('correct answer!!!');
    this.showNext = true;
  }

  private performIfUserWrong() {
    alert('Wrong answer!!! try again');
  }

  private toggleAnswersSelected(selected) {
    const isPresentIndex = this.answer.value.findIndex(x => x === selected);
    if (isPresentIndex >= 0) {
      this.answer.value.splice(isPresentIndex);
    } else {
      this.answer.value.push(selected);
    }
  }

  private getCurrentQuestion() {
    this.treasurehuntService.getUserState(this.userSession._id, this.slug).subscribe(state => {
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
    this.treasurehuntService.getUserStageQuestion(this.userSession._id, this.slug).subscribe((response) => {
      /** showing new question for state*/
      this.showNext = false;
      this.question = response['data'];
    });
  }
}
