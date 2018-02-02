import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("userSession"));

  constructor() { }

  ngOnInit() {
  	}

}
