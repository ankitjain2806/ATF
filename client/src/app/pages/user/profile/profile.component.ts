import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((res) => {
      this.profile = res.profile.data
    });
  }

  ngOnInit() {
  }
}
