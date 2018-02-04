import { Component, OnInit } from '@angular/core';
import {IEvent} from '../../models/event';

import {DashboardService} from "./dashboard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  events: IEvent[] = [];

  constructor(private dashboardService: DashboardService,
              private router: Router) { }

  ngOnInit() {
    this.dashboardService.getAllEvents().subscribe(data => {
      console.log(data);
      this.events = data;
    });
  }

  goToEvent(event) {
    console.log(event._id);
    // this.router.navigate(['/treasurehunt', event._id, 'overview']);
  }

}
