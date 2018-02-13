import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {EventService} from "../event.service";
import {SocketService} from "../../../shared/util/socket.service";
import {ActivatedRoute} from "@angular/router";
import {AceEditorComponent} from "ng2-ace-editor"
import {Resource} from "../../../models/Resource";
import 'brace/theme/clouds';
import 'brace/mode/java.js';
import 'brace/index';

@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss']
})

export class CompilerComponent implements OnInit {
  resource: Resource;
  compilerForm: FormGroup;
  output: string;
  text:string = "";
  options:any = {maxLines: 1000, printMargin: false};

  languages = [
    {language: 'PHP', slug: 'php'},
    {language: 'JAVA', slug: 'java'},
    {language: 'Python', slug: 'python'}
  ];

  @ViewChild("editor") editor: AceEditorComponent;

  constructor(private fb: FormBuilder,
              private eventService: EventService,
              private route: ActivatedRoute,
              private socketService: SocketService) {
    this.route.data.subscribe((res) => {
      this.resource = res.resource;
    });
  }

  ngOnInit() {
    this.compilerForm = this.fb.group({
      code: [''],
      language: ['java'],
    });
  }

  onSubmit() {
    this.socketService.receiveSocket('compilerSocket').subscribe((data) => {
      this.output = data.response.stdout;
    });

    this.eventService.runCompilerCode(this.compilerForm.value, this.resource._id, this.resource.eventId).subscribe((res: any) => {
      this.output = 'Brace yourself!! code is being compiled';
    })
  }

  onChange(code) {
    this.compilerForm.controls.code.setValue(code);
  }
}
