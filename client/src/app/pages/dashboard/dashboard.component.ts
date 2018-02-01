import { Component, OnInit } from '@angular/core';
import {IEvent} from '../../models/event';

import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  events: IEvent[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getAllEvents().subscribe(data => {
      console.log(data);
      this.events = data;
    });
  }

}
