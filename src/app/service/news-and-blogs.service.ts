import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsAndBlogsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getNewsAndBlogs(): Observable<any> {
    return this.http.get(`/administration-service/news/get/all`);
  }

  createNewsAndBlogs(user): Observable<any> {
    return this.http.post(`dsfdsfgdsfg/sdfsdf/${user}`, user, this.httpOptions);
  }
}
