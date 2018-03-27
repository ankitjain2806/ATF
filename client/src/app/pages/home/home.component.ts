import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {LoaderService} from "../../shared/util/loader.service";
import {Router, ActivatedRoute} from "@angular/router";
import {DashboardService} from "../dashboard/dashboard.service";
import {ToasterService} from "../../shared/util/toaster.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userEvent;

  constructor(private homeService: HomeService,
              private route: ActivatedRoute,
              private dashboardService: DashboardService,
              private toast : ToasterService,
              private router: Router) {
    this.route.data.subscribe((res) => {
      this.userEvent = res.events.data;
    });
  }

  ngOnInit() {
  }

  callGoogleLogin() {
    this.homeService.googleLoginApi().subscribe((data) => {});
  }

  eventRegistration(eventSlug: string) {
    this.dashboardService.registerEvent({'eventSlug' : eventSlug}).subscribe(() => {
      this.toast.showSuccess('Congratulations', 'You are registered in event. Please click Continue.')
      this.dashboardService.getUserEvents().subscribe((events) =>{
        this.userEvent = events.data;
      })
    })
  }

  eventContinue(eventSlug: string) {
    switch (eventSlug) {
      case 'compiler':
        this.router.navigate(['/compiler/intro']);
        break;
      case 'treasurehunt':
        this.router.navigate(['/treasurehunt/game']);
        break;
    }
  }
}
