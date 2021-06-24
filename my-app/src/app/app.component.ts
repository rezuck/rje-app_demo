import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from './app-state/models';
import {GlobalValues} from "./global-values";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  constructor(private appService: AppService) {}

  title = 'rje-app5';
  selectedUser: User;
  newUser: boolean = false;

  userForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.nullValidator && Validators.required),
    lastName: new FormControl('', Validators.nullValidator && Validators.required),
    team: new FormControl('', Validators.nullValidator && Validators.required), 
    job: new FormControl('', Validators.nullValidator && Validators.required),
    status: new FormControl('', Validators.nullValidator && Validators.required)
  });

  users: any[] = [];
  userCount = 0;

  destroy$: Subject<boolean> = new Subject<boolean>();
  ngonInit(){
    this.newUser = GlobalValues.newuser;
  }

  onSubmit() {
    //this.userCount = this.userCount + 1;
    this.userCount = GlobalValues.currentId +1;
    GlobalValues.currentId = this.userCount;
    //alert("User count = " + this.userCount);
    this.userForm.patchValue({id: this.userCount});
    this.appService.addUser(this.userForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      //this.userCount = this.userCount + 1;
      console.log(this.userCount);
      GlobalValues.siteTitle = "false";
      this.newUser = false;
      this.userForm.reset();
    });
    this.getAllUsers();
    window.location.reload();
  }

  getAllUsers() {
    this.appService.getUsers().pipe(takeUntil(this.destroy$)).subscribe((users: any[]) => {
        this.users = users;
        //GlobalValues.currentId = this.users.length;
        //alert("total users:" + GlobalValues.currentId + " of " + this.users.length);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
