import { Component, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from './app-state/models';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EditUserComponent implements OnDestroy {

  constructor(private appService: AppService) {}

  title = 'rje-app5';

  @Input() selectedUser: User;


 
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
  ngOnInit(): void {
    this.userForm.setValue({id: this.selectedUser.id, 
      firstName: this.selectedUser.firstName, 
      lastName: this.selectedUser.lastName, 
      team: this.selectedUser.team, 
      job: this.selectedUser.job, 
      status: this.selectedUser.status});
  }

  onSave() {

    this.appService.editUser(this.userForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      this.userCount = this.userCount;
      //console.log(this.userCount);
      //this.userForm.reset();
    });
    //this.getAllUsers();
    window.location.reload();
  }

  saveChanges() {
    alert("editUsers - Save:");
  }

  getAllUsers() {
    this.appService.getUsers().pipe(takeUntil(this.destroy$)).subscribe((users: any[]) => {
        this.users = users;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
