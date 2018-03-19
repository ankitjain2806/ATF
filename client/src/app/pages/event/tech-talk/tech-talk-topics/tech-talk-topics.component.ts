import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DashboardService} from "../../../dashboard/dashboard.service";
import {LoaderService} from "../../../../shared/util/loader.service";

@Component({
  selector: 'app-tech-talk-topics',
  templateUrl: './tech-talk-topics.component.html',
  styleUrls: ['./tech-talk-topics.component.scss']
})

export class TechTalkTopicsComponent {
  allTopics;
  myTopics;
  constructor(private dashboardService: DashboardService,
              private route: ActivatedRoute,
              private router: Router,
              private loaderService: LoaderService) {
    this.loaderService.showLoader();
    this.route.data.subscribe((res) => {
      this.allTopics = res.topics.data.allTopics;
      this.myTopics = res.topics.data.myTopics;
      this.loaderService.hideLoader();
    },error => {
      this.loaderService.hideLoader();
    });
  }
}
