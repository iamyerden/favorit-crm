import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../../../apps/user/model/user";
import {map} from "rxjs/operators";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private readonly loginUrl = '/crm/api/login';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string){
    return this.http.post<any>(this.loginUrl, {
      username,
      password
    }).pipe(map((user) => {
      //store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log("This is our user = " , user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);

    console.log('exit')

    return of({success: false});
  }

  loginUser(form: FormGroup): Observable<any> {
    return this.http.post(this.loginUrl, form.getRawValue());
  }

  loggedIn() {
    return !!localStorage.getItem('currentUser');
  }

}
