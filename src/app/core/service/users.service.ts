import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pagination} from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  private readonly USERS_URL = '/administration-service/user';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  requestConstructor(params: Pagination) {
    let requestParams = '?';
    // tslint:disable-next-line:forin
    for (const param in params) {
      requestParams += (params[param] === '' || params[param] === null)
          ? '' : (param + '=' + params[param] + '&');
    }
    return requestParams;
  }

  getUsers(params): Observable<any> {
    return this.http.get(
         `${this.USERS_URL}?pageSize=${params.pageSize}&pageNo=${params.pageNo}&sortBy=${params.sortBy}`
    );
  }

  inputValidator(params): Observable<any> {
    return this.http.get(
        `${this.USERS_URL}/validator/${params.field}/${params.value}`
    );
  }

  getUsersPageable(params: Pagination): Observable<any> {
    return this.http.get(
        `${this.USERS_URL}/pageable` + this.requestConstructor(params)
    );
  }

  createUser(user): Observable<any> {
    return this.http.post(`/crm/api/signup`, user, this.httpOptions);
  }

  blockUser(userBlockDto): Observable<any> {
    return this.http.post(`${this.USERS_URL}/block-user`, userBlockDto, this.httpOptions);
  }

  unlockUser(id): Observable<any> {
    return this.http.get(`${this.USERS_URL}/unlock-user/` + id);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${this.USERS_URL}/` + id);
  }

  getByIdUser(id): Observable<any> {
    return this.http.get(`${this.USERS_URL}/` + id);
  }
}
