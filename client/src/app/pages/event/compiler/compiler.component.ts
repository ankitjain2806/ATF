import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {EventService} from "../event.service";
import {CompilerService} from "./compiler.service";
import {SocketService} from "../../../shared/util/socket.service";
import {ActivatedRoute} from "@angular/router";
import {AceEditorComponent} from "ng2-ace-editor"
import {Resource} from "../../../models/Resource";
import 'brace/theme/dracula';
import 'brace/mode/java.js';
import 'brace/index';

@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss']
})

export class CompilerComponent implements OnInit {
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

  @ViewChild("editor") editor: AceEditorComponent;

  constructor(private fb: FormBuilder,
              private eventService: EventService,
              private compilerService: CompilerService,
              private route: ActivatedRoute,
              private socketService: SocketService) {
    this.route.data.subscribe((res) => {
      this.resource = res.resource.data.resource;
      this.draft = res.resource.data.draft;
      if (this.draft) {
        this.text = this.draft.code;
      }
      this.languages = res.resource.data.language;
    });
  }

  ngOnInit() {
    this.compilerForm = this.fb.group({
      code: [(this.draft) ? this.draft.code : ''],
      language: [(this.draft) ? this.draft.language : 'java'],
    });
    this.socketService.receiveMessage('compilerSocket').subscribe((data) => {
      this.output.push(data);
    });
  }

  onSubmit() {
    /**/

    // this.socketService.sendMessage('testing')
    this.compilerService.runCompilerCode(this.compilerForm.value, this.resource._id).subscribe((res) => {
      // this.output = 'Brace yourself!! code is being compiled';
      this.output = [];
    })
  }

  onChange(code) {
    this.compilerForm.controls.code.setValue(code);
  }

  saveDraft() {
    this.compilerService.saveDraft(this.compilerForm.value, this.resource._id).subscribe((res) => {
      this.draftNotification = true;
      setTimeout(() => {
        this.draftNotification = false;
      }, 5000)
    })
  }
}
