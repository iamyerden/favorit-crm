import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {list} from 'postcss';
import {NbModel} from '../pages/apps/news-blog/model/nb.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  news = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getUsers(params): Observable<any> {
    return this.http.get(
        `/administration-service/user?pageSize=${params.pageSize}&pageNo=${params.pageNo}&sortBy=${params.sortBy}`
    );
  }

  createUser(user): Observable<any> {
    return this.http.post(`/administration-service/user`, user, this.httpOptions);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`/administration-service/user/` + id);
  }

  getByIdUser(id): Observable<any> {
    return this.http.get(`/administration-service/user/` + id);
  }
}
