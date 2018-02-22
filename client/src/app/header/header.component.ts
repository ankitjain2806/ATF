import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HeaderService} from './header.service'
import {UserSessionService} from "../shared/util/user-session.service";
import {SocketService} from "../shared/util/socket.service";

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
              private headerService: HeaderService) {
    this.headerService.getUserSession()
      .subscribe(res => {
        //this.session.setSession(res.user);
        if (res.user != null) {
          localStorage.setItem('userSession', JSON.stringify(res.user));
          this.userSession = res.user;
          this.socketService.sendMessage('new_con', {
            userId : res.user.id
          });
        }
      });


  }

  ngOnInit() {
  }
}
