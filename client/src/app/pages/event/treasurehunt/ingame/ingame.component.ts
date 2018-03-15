import { Component, OnInit } from '@angular/core';
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
  enteredAnswer = "";
  slug: string;
  question = {};
  answer = {
    value: []
  };
  stage = {};
  showNext: Boolean = false;
  userSession = null;
  options :string;
  private paramsSub: any;

  constructor(private session: UserSessionService,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              private treasurehuntService: TreasurehuntService) {
    this.userSession = this.session.getSession();
    this.question = {};
    this.options ="";

  }

  ngOnInit() {
    // const slug = this.activatedRouter.params['slug'];
   /* this.paramsSub = this.activatedRouter.params.subscribe(params => {
      this.slug = params['slug'];
      this.getCurrentQuestion();
    });*/
    /**
     * @todo  need to remove hardcoded
     */
    this.slug = 'treasurehunt';
    this.getCurrentQuestion();

  }

  checkAnswerAndChangeState(userAnswer) {
    this.treasurehuntService.checkIsCorrectAnswer({
      user: this.userSession.id,
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
    this.options ="";
  }

  private performIfUserWrong() {
    alert('Wrong answer!!! try again');
    this.options = "";
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
    this.treasurehuntService.getUserStage(this.userSession.id, this.slug).subscribe(stage => {
      this.stage = stage['data'];
      /** check state if completed or in progress*/
      if (this.stage['completed']) {
        //redirect to the finish event route once the event is finished
        this.router.navigate(['/event', 'finished', 'treasurehunt' ]);
      } else {
        this.requestAndRenderQuestion();
      }
    });
  }

  private requestAndRenderQuestion() {
    this.treasurehuntService.getUserStageQuestion(this.userSession.id, this.slug).subscribe((response) => {
      /** showing new question for state*/
      this.showNext = false;
      this.question = response['data'];
    });
  }
}
