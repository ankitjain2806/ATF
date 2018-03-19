import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../../../../shared/util/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserSessionService} from "../../../../shared/util/user-session.service";
import {TreasurehuntService} from "../treasurehunt.service";
import {LoaderService} from "../../../../shared/util/loader.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  eventId: string;
  info = {};
  isNew = true;
  userSession = null;
  private paramsSub: any;

  constructor(private session: UserSessionService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private treasurehuntService: TreasurehuntService,
              private loaderService: LoaderService) {
    this.userSession = this.session.getSession();
  }

  ngOnInit() {
    this.loaderService.showLoader();
    this.paramsSub = this.activatedRouter.params.subscribe(params => {
      this.eventId = params['id'];
      this.loaderService.hideLoader();
      this.loaderService.showLoader();
      this.treasurehuntService.getEventInformation().subscribe((data) => {
        this.info = data.data;
        this.loaderService.hideLoader();
      },error2 => {
        this.loaderService.hideLoader();
      });
      this.loaderService.showLoader();
      this.treasurehuntService.getUserStage(this.userSession._id, this.eventId).subscribe((response) => {
        if (response['error']) {
          // user is not present; redirect to home
        } else {
          this.isNew = response['data'].length === 0;
          console.log('user is registerd as new ? ', this.isNew);
        }
        this.loaderService.hideLoader();
      },error2 => {
        this.loaderService.hideLoader();
      });
    },error2 => {
      this.loaderService.hideLoader();
    });
  }

  registerForEvent() {
    // Temp implementation
    this.loaderService.showLoader();
    this.treasurehuntService.setUserState(this.userSession._id,
      {'stage': 0, 'multiplier': 1},
      this.eventId)
      .subscribe((response) => {
        // redirect to in game; if success
        if (response['error']) {
          alert('cannot register');
        } else if (response['data']) {
          this.router.navigate(['/treasurehunt', this.eventId, 'game']);
        }
        this.loaderService.hideLoader();
      },error2 => {
        this.loaderService.hideLoader();
      });
  }

  goToInGame() {
    this.router.navigate(['/treasurehunt', this.eventId, 'game']);
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}
