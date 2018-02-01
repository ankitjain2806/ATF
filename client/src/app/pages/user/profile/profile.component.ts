import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	userName = "Divyanshu Kumar";
  email = "divyanshu.kumar@accoliteindia.com";
  coin = 15;
  gender = "Male";
  bio = "Promoting positive community and economic growth in our neighborhood";
  phoneNumber = "99999 99999";
  constructor() { }

  ngOnInit() {
  	}

}