import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Resource} from "../../../models/Resource";

@Component({
  selector: 'app-tech-talk',
  templateUrl: './tech-talk.component.html',
  styleUrls: ['./tech-talk.component.scss']
})

export class TechTalkComponent implements OnInit {
  resource: Resource;
  draft;
  compilerForm: FormGroup;
  output = [];
  text: string = "";
  options: any = {maxLines: 1000, printMargin: false};
  draftNotification: boolean;
  languages = [
    {language: 'PHP', slug: 'php'},
    {language: 'JAVA', slug: 'java'},
    {language: 'Python', slug: 'python'}
  ];

  ngOnInit() {

  }
  onSubmit() {

  }

  onChange(code) {

  }

  saveDraft() {

  }
}
