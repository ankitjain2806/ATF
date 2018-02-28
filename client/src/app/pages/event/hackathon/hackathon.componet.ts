import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {EventService} from "../event.service";

@Component({
  selector: 'complete-registration',
  template: `
    <div class="col-md-4 offset-md-3">
    <h3 class="page-header">Add Details for Hackathon</h3>
    <form [formGroup]="resourceForm" (ngSubmit)="completeRegistration(resourceForm.value)">
      <div formArrayName="gitIds">
        <div *ngFor="let itemrow of resourceForm['controls'].gitIds['controls']; let i=index" [formGroupName]="i">
          <div class="form-group">
             <label>Git Ids</label>
             <input formControlName="gitId" class="form-control" required placeholder="Please Enter Git Id!">
             <button *ngIf="resourceForm.controls.gitIds.controls.length > 1" (click)="deleteRow(i,'gitIds')" class="btn btn-danger">Remove GitId</button>
          </div>
          <button class="btn btn-primary" (click)="addNewRow('gitIds')">Add GitId</button><br>
        </div>
      </div>
      <label>Description/Idea</label>
      <textarea formControlName="idea" class="form-control" required></textarea>
      <div formArrayName="resources">
        <div *ngFor="let itemrow of resourceForm['controls'].resources['controls']; let i=index" [formGroupName]="i">
          <h4>Resource/Software #{{ i + 1 }}</h4>
          <div class="form-group">
            <label>Required Resources/ Software</label>
            <input formControlName="resource" class="form-control">
          </div>
          <button *ngIf="resourceForm.controls.resources.controls.length > 1" (click)="deleteRow(i,'resources')" class="btn btn-danger">Remove Resource</button>
        </div>
      </div>
        <button class="btn btn-primary" (click)="addNewRow('resources')">Add New Resource</button><br>
      <div class="offset-md-3">
        <button type="submit" class="btn btn-primary">Complete Registration</button>
      </div>
    </form>
   </div>
  `,
})
export class HackathonComponet implements OnInit {
  public resourceForm: FormGroup;
  events : any = null;

  constructor(private _fb: FormBuilder, private eventService: EventService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.resourceForm = this._fb.group({
      gitIds:this._fb.array([this.initGitIds()]),
      idea:'',
      resources: this._fb.array([this.initResources()]),
      isApproved:false
    });
  }

  initGitIds() {
    return this._fb.group({
      gitId:['']
    });
  }

  initResources() {
    return this._fb.group({
      resource: [''],
    });
  }

  addNewRow(formField:string) {
    const control = <FormArray>this.resourceForm.controls[formField];
    if(formField === 'resources') {
      control.push(this.initResources());
    }
    else if(formField === 'gitIds'){
      control.push(this.initGitIds());
    }
  }

  deleteRow(index: number, formField: string) {
    const control = <FormArray>this.resourceForm.controls[formField];
    control.removeAt(index);
  }

  completeRegistration(resourceForm: any){
      this.eventService.completeHackathonRegistration(resourceForm.value).subscribe(data=>{
        console.log(data);
      })
  }
}
