import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  getStatuses() {
    return this.http.get(this.rootURL + '/statuses');
  }

  getUsers() {
    return this.http.get(this.rootURL + '/users');
  }

  addUser(user: any) {
    return this.http.post(this.rootURL + '/user', {user});
  }

  editUser(user: any) {
    return this.http.put(this.rootURL + '/user', {user});
  }

  deleteUser(id: any) {
     return this.http.delete(this.rootURL + '/users/' + id, id);
  }
}
