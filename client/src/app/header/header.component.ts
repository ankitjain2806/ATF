import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HeaderService} from './header.service'
import {UserSessionService} from "../shared/util/user-session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userSession = null;

  constructor(private router: Router,
              private session: UserSessionService,
              private headerService: HeaderService) {
    this.headerService.getUserSession()
      .subscribe(res => {
        this.session.setSession(res.user);
        this.userSession = this.session.getSession();
      });
  }

  ngOnInit() {
  }
  goToProfile(){
    this.router.navigateByUrl('/profile');
  }
}
