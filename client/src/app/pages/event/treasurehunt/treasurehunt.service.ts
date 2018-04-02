import { Injectable } from '@angular/core';
import {HttpService} from "app/shared/util/http.service";

@Injectable()
export class TreasurehuntService {

  private local_base = '/api/treasurehunt';

  constructor(private httpService: HttpService) { }

  getEventInformation() {
    return this.httpService.get(this.local_base + '/details');
  }

  getUserStage(userId, event) {
    console.log(event)
    return this.httpService.post(this.local_base + '/get/stage', {user: userId, event: event});
  }

  setUserState(user, state, eventId) {

    const params = {
      user: user,
      event: eventId,
      state: state
    };

    return this.httpService.post(this.local_base + '/set/state', params);
  }

  checkIsCorrectAnswer(params) {
    return this.httpService.post(this.local_base + '/question/check', params);
  }

  getUserStageQuestion(userId, event) {
    return this.httpService.post(this.local_base + '/question', {user: userId, event: event});
  }

  getAnswerParam(answer, questionType) {
    const param = [];
    switch (questionType) {
      case 'NORMAL':
        param.push(answer.text);
        break;
      case 'MCQ':
        answer.value.forEach(a => param.push(a));
        break;
    }
    return param;
  }

  resetAnswer() {
    return {
      value: []
    };
  }
}
