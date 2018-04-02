import {Component, OnInit} from '@angular/core';
import {UserSessionService} from "app/shared/util/user-session.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userSession = null;
  constructor(private session: UserSessionService) {
    this.userSession = this.session.getSession();
  }

  ngOnInit() {

  }

}
