import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserProfile} from "../../../models/UserProfile";

@Component({
  selector: 'app-user',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile : UserProfile;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((res) => {
      if(res.profile) {
        this.profile = res.profile.data;
      }
    });
  }

  ngOnInit() {
  }
}
