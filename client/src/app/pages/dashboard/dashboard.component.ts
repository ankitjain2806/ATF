import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import {DashboardService} from "./dashboard.service";
import {EventRegistration} from "../../models/event-registration";
import {LoaderService} from "../../shared/util/loader.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userEvent = null;
  showAlert: boolean = false;

  constructor(private dashboardService: DashboardService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe((res) => {
      this.userEvent = res.events.data;
    });
  }

  ngOnInit() {

  }

  eventRegistration(eventSlug: string) {
    this.dashboardService.registerEvent({'eventSlug' : eventSlug}).subscribe(() => {
      this.showAlert = true;
      this.dashboardService.getUserEvents().subscribe((events) =>{
        this.userEvent = events.data;
      },error => {
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
