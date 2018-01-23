import { Component, OnInit } from '@angular/core';
import {IEvent} from '../models/event';
import {AppService} from "../app.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  events: IEvent[] = [
    {
      name: 'Treasure Hunt',
      description: 'Hunt for treasure'
    },
    {
      name: 'Complier',
      description: 'you dont know compiler'
    }
  ];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getAllEvents().subscribe(data => {
      console.log(data);
    });
  }

}
