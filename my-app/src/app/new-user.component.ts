import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from './app-state/models';
import {GlobalValues} from "./global-values";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnDestroy {

  constructor(private appService: AppService) {}

  title = 'rje-app5';
  selectedUser: User;
  newUser: boolean = false;
  statuses: any = ["active", "inactive", "new", "retired"];
  selectedStatus: string = "";
 

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
    this.userCount = GlobalValues.currentId + 1;

    GlobalValues.currentId = this.userCount;
 
    this.userForm.patchValue({id: this.userCount});
    this.userForm.patchValue({status: this.selectedStatus});
    this.appService.addUser(this.userForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);

      this.userForm.reset();
    });
    GlobalValues.newuser = false;
    this.newUser = false;
    this.getAllUsers();
    window.location.reload();
  }

  changeStatus(e) {
    this.userForm.patchValue({status: e.target.value}, {
      onlySelf: true
    });
  //  this.userForm.patchValue({status: this.selectedStatus}, {
  //    onlySelf: true
  //  });
    this.selectedStatus = e.target.value;
  }

  getAllUsers() {
    this.appService.getUsers().pipe(takeUntil(this.destroy$)).subscribe((users: any[]) => {
        this.users = users;
        GlobalValues.currentId = this.users[this.users.length - 1].id;

      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
