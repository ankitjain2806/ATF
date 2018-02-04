import { Injectable } from '@angular/core';
import {HttpService} from "../../../shared/util/http.service";

@Injectable()
export class TreasurehuntService {

  private local_base = '/api/events/treasurehunt'

  constructor(private httpService: HttpService) { }

  getEventInformation() {
    return this.httpService.get(this.local_base + '/details', {});
  }

  getUserState(userId, eventId) {
    return this.httpService.post(this.local_base + '/get/state', {user: userId, event: eventId});
  }

  setUserState(user, state, eventId) {

    const params = {
      user: user,
      event: eventId,
      state: state
    };

    return this.httpService.post(this.local_base + '/set/state', params);
  }

  checkIsCorrectAnswer(userId, event, answer) {
    return this.httpService.post(this.local_base + '/question/check',
      {
      user: userId,
      event: event,
      answer: answer.value
    });
  }

  getUserStageQuestion(userId, eventId) {
    return this.httpService.post(this.local_base + '/question', {user: userId, event: eventId});
  }
}
