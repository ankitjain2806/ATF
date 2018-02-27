import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userEvent: [string];

  constructor(private dashboardService: DashboardService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe((res) => {
      this.userEvent = res.events.data.data;
    });
  }

  ngOnInit() {
    this.dashboardService.getUserEvents().subscribe((data) => {
      this.userEvent = data.data;
    })
    /* this.dashboardService.getAllEvents().subscribe(data => {
       console.log(data);
       this.events = data;
     });*/
  }

  eventRegistration(eventSlug: string) {
    //
  }

  eventContinue(eventSlug: string) {
    switch (eventSlug) {
      case 'compiler':
        this.router.navigate(['/compiler/intro']);
    }
  }
}
