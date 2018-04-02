import {Component, Input, OnInit} from '@angular/core';
import {LoaderService} from "app/shared/util/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  counter: number = 0;

  constructor(public loader: LoaderService) {

  }

  ngOnInit() {
    this.loader.showLoader$.subscribe(() => {
      this.counter++;
    });

    this.loader.hideLoader$.subscribe(() => {
      this.counter--;
    })
  }
}
