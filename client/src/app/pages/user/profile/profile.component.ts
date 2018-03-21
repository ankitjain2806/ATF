import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LoaderService} from "../../../shared/util/loader.service";

@Component({
  selector: 'app-user',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile;

  constructor(private route: ActivatedRoute,
              private loader: LoaderService) {
    this.loader.showLoader();
    this.route.data.subscribe((res) => {
      this.profile = res.profile.data;
      this.loader.hideLoader();
    },error2 => {
      this.loader.hideLoader();
    });
  }

  ngOnInit() {
  }
}
