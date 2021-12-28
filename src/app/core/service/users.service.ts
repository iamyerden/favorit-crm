import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
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
    return this.http.post(`/crm/api/signup`, user, this.httpOptions);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`/administration-service/user/` + id);
  }

  getByIdUser(id): Observable<any> {
    return this.http.get(`/administration-service/user/` + id);
  }
}
