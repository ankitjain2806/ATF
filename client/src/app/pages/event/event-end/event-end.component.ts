import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../event.service";

@Component({
  selector: 'app-event-end',
  templateUrl: './event-end.component.html',
  styleUrls: ['./event-end.component.scss']
})
export class EventEndComponent implements OnInit {

  data;

  constructor(private service: EventService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const slug = this.route.params['slug'];
    this.service.getEventEndDetail(slug).subscribe((response) => {
      this.data = response;
    });
  }

}
