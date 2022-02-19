import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {User} from '../models/user.model';
import {PersistenceService} from './persistence.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private readonly GENERAL = '/auth';
  private readonly loginUrl = this.GENERAL + '/login';
  private bearerPrefix = 'Bearer ';

  constructor(private http: HttpClient,
              private persistenceService: PersistenceService) {
    this.initializeCurrentUser();
  }

  initializeCurrentUser() {
    this.currentUserSubject = new BehaviorSubject<User>(
        this.persistenceService.get(PersistenceService.HEADER_USER)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }
  //
  // login(username: string, password: string){
  //   return this.http.post<any>(this.loginUrl, {
  //     username,
  //     password
  //   }).pipe(map((user) => {
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     console.log('This is our user = ' , user);
  //     localStorage.setItem('currentUser', JSON.stringify(user));
  //     this.currentUserSubject.next(user);
  //     return user;
  //   }));
  // }
  //
  // logout() {
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSubject.next(null);
  //
  //
  //   return of({success: false});
  // }
  //
  // loginUser(form: FormGroup): Observable<any> {
  //   return this.http.post(this.loginUrl, form.getRawValue());
  // }
  //
  // loggedIn() {
  //   return !!localStorage.getItem('currentUser');
  // }

  login(email: string, password: string){
    return this.http.post<any>(this.loginUrl, {
      email,
      password
    }).pipe(map((token) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log('This is our token = ' , token);
      if (token) {
        this.persistenceService.set(PersistenceService.TOKEN, this.bearerPrefix + token.accessToken);
        this.getCurrentUser().subscribe(user => {
          this.persistenceService.set(PersistenceService.HEADER_USER, user);
          this.setCurrentUser(user);
        }, error => {
          this.persistenceService.clear(PersistenceService.TOKEN);
        });
      }
      return token;
    }));
  }

  setCurrentUser(user) {
    this.currentUserSubject.next(user);
  }

  logout() {
    this.persistenceService.clear(PersistenceService.TOKEN);
    this.persistenceService.clear(PersistenceService.HEADER_USER);
    this.setCurrentUser(null);

    console.log('exit');

    return of({success: false});
  }

  loginUser(form: FormGroup): Observable<any> {
    return this.http.post(this.loginUrl, form.getRawValue());
  }

  public get loggedIn(): boolean {
    this.initializeCurrentUser();
    return this.persistenceService.get(PersistenceService.HEADER_USER) != null;
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`/user/me`);
  }

}
