import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../../shared/util/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  info = {};
  isNew = true;

  constructor(private httpService: HttpService) {
  }

  _getEventInformation() {
    return this.httpService.get('/api/events/treasurehunt/details', {});
  }

  _getUserState(user) {
    return this.httpService.post('/api/events/treasurehunt/get/state', {user: user, event: 'treasurehunt'});
  }

  _setUserState(user, state) {

    const params = {
      user: user,
      event: 'treasurehunt',
      state: state
    };

    return this.httpService.post('/api/events/treasurehunt/set/state', params);
  }

  ngOnInit() {
    this._getEventInformation().subscribe((data) => {
      this.info = data.data;
    });

    this._getUserState('5a71804d4d04951790a33e4f').subscribe((response) => {
      if (response['error']) {
        // user is not present; redirect to home
      } else {
        if (response['data'] === null) {
          // show register button
          console.log('user state ', response);
        } else {
          this.isNew = false;
          // show continue button
          console.log('user state ', response);
        }
      }
    });
  }

  registerForEvent() {
    this._setUserState('5a71804d4d04951790a33e4f', {'stage': 0, 'multiplier': 1})
      .subscribe((response) => {
        // redirect to in game; if success
      });
  }
}
