import {Component, OnInit} from '@angular/core';
import {HomeService} from './home.service';
import {LoaderService} from "../../shared/util/loader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService,
              private loader: LoaderService) {
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
