import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsAndBlogsService {
  news = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getNewsAndBlogs(params): Observable<any> {
    return this.http.get(
        `/administration-service/news/get/all?pageSize=${params.pageSize}&pageNo=${params.pageNo}&sortBy=${params.sortBy}`
    );
  }

  createNewsAndBlogs(news): Observable<any> {
    return this.http.post(`/administration-service/news/save`, news, this.httpOptions);
  }

  deleteNewsAndBlogs(ids): Observable<any> {
    return this.http.get(`/administration-service/news/delete/` + ids);
  }

  getByIdNewsAndBlog(id): Observable<any> {
    return this.http.get(`/administration-service/news/getbyid/` + id);
  }
}
