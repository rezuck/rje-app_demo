import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { User } from './app-state/models';
import { AppService } from './app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {GlobalValues} from "./global-values";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private appService: AppService) { }

  showList: boolean = true;
  newUser: boolean = false;
  selectedUser: User;
  deletedUser: User;
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() users: any[];
  @Output() editUserEvent = new EventEmitter();

  ngOnInit(): void {
    this.getAllUsers();
  }
 
  editUser(user: User) {
    this.selectedUser = user;
    this.showList = false;

  }

  addUser() {
    GlobalValues.newuser = true;
    this.newUser = true;
    this.showList = false;
  }

  deleteUser(user: User) {
    this.deletedUser = user;
    
    if (confirm("Are you sure you want to delete " + user.firstName + " " + user.lastName + " ?")){
      this.appService.deleteUser(this.deletedUser.id).pipe(takeUntil(this.destroy$)).subscribe(data => {
        console.log('message::::', data);
      });
    }
    this.getAllUsers();
    window.location.reload();

  }

  getAllUsers() {
    this.appService.getUsers().pipe(takeUntil(this.destroy$)).subscribe((users: any[]) => {
        this.users = users;

        GlobalValues.currentId = this.users[this.users.length - 1].id;

        this.showList = true;
      });

  }

}
