import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HeaderService} from './header.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private headerService: HeaderService) {
    this.headerService.getUserSession()
      .subscribe(res => {
        console.log(res)
      })
  }

  ngOnInit() {
  }
}
