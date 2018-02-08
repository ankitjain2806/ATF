import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {EventService} from "../event.service";
import {SocketService} from "../../../shared/util/socket.service";

@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss']
})
export class CompilerComponent implements OnInit {
  compilerForm: FormGroup;
  output: string;
  languages = [
    {language: 'PHP', slug: 'php'},
    {language: 'JAVA', slug: 'java'},
    {language: 'Python', slug: 'python'}
  ]

  constructor(private fb: FormBuilder,
              private eventService: EventService,
              private socketService: SocketService) {
  }

  ngOnInit() {
    this.compilerForm = this.fb.group({
      code: [''],
      language: ['java'],
    });
  }

  onSubmit() {
    // console.log(this.compilerForm.value);
    this.socketService.receiveSocket('testConnection').subscribe((data)=>{
      this.output = data.data.response.stdout;
    });
    
    this.eventService.runCompilerCode(this.compilerForm.value).subscribe((res: any) => {
      this.output = res.stdout;
    })
  }
}
