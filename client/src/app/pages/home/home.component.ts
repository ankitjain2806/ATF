import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {LoaderService} from "../../shared/util/loader.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userEvent;

  constructor(private homeService: HomeService,
              private route: ActivatedRoute,
              private router: Router,
              private loader: LoaderService) {
    this.route.data.subscribe((res) => {
      this.userEvent = res.events.data;
      this.loader.hideLoader();
    },error => {
      this.loader.hideLoader();
    });
  }

  ngOnInit() {
  }

  callGoogleLogin() {
    this.loader.showLoader()
    this.homeService.googleLoginApi().subscribe((data) => {
      console.log(data);
      this.loader.hideLoader();
    },error2 => {
      this.loader.hideLoader();
    });
  }
}
