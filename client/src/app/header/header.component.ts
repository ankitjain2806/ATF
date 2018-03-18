import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HeaderService} from './header.service'
import {UserSessionService} from "../shared/util/user-session.service";
import {SocketService} from "../shared/util/socket.service";
import {LoaderService} from "../shared/util/loader.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userSession = null;

  constructor(private router: Router,
              private session: UserSessionService,
              private socketService: SocketService,
              private loader: LoaderService,
              private headerService: HeaderService) {

  }

  ngOnInit() {
    this.loader.showLoader();
    this.headerService.getUserSession()
      .subscribe(res => {
        this.loader.hideLoader();
        if (res.user != null) {
          localStorage.setItem('userSession', JSON.stringify(res.user));
          this.userSession = res.user;
          this.socketService.sendMessage('new_con', {
            userId : res.user.id
          });
        }
      });
  }

  handleLogout() {
    localStorage.removeItem('userSession');
  }
}
