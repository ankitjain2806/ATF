import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EventService} from "../event.service";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event;

  constructor(private eventService: EventService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.eventService.getEventDetail(params['slug'])
        .subscribe(res => {
          this.event = res;
        });
    });
  }

  ngOnInit() {

  }
}
