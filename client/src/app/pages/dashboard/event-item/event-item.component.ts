import {Component, Input, OnInit} from '@angular/core';
import {IEvent} from "../../../models/event";

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {

  @Input() data: IEvent;

  constructor() { }

  ngOnInit() {
  }

}
