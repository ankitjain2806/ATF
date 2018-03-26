import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DashboardService} from "../../../dashboard/dashboard.service";
import {LoaderService} from "../../../../shared/util/loader.service";
import {TechTalkService} from "../tech-talk.service";
import {ToasterService} from "../../../../shared/util/toaster.service";

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
              private techTalkservice: TechTalkService,
              private toast: ToasterService,
              private loaderService: LoaderService) {
    this.loaderService.showLoader();
    this.route.data.subscribe((res) => {
      this.allTopics = res.topics.data.allTopics;
      this.myTopics = res.topics.data.myTopics.techTalks.map((x) => {
        return x.topicId
      });

      console.log(this.myTopics)
      this.loaderService.hideLoader();
    },error => {
      this.loaderService.hideLoader();
    });
  }

  subscribeTopic(topicId, subscribeTopic) {
    let obj = {
      topicId: topicId,
      subscribeTopic: subscribeTopic
    };
    this.loaderService.showLoader();
    this.techTalkservice.subscribeTopic(obj).subscribe( (data: any) => {
      this.myTopics = data.data.map((x) => {
        return x.topicId
      });
      let toastMessage = (this.subscribeTopic) ? 'You have subscribed this topic' : 'You ave unsubscribed this topic';
      this.toast.showSuccess('Success', toastMessage);
      this.loaderService.hideLoader();
    },error => {
      this.toast.showError(null, error);
      //this.loaderService.hideLoader();
    });
  }
}
