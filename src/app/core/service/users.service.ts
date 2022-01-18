import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pagination} from '../models/pagination.model';
import {PageEvent} from "@angular/material/paginator";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly USERS_URL = '/administration-service/user';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

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

  deleteUser(id): Observable<any> {
    return this.http.delete(`${this.USERS_URL}/` + id);
  }

  getByIdUser(id): Observable<any> {
    return this.http.get(`${this.USERS_URL}/` + id);
  }
}
