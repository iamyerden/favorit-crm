import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {list} from 'postcss';
import {NbModel} from '../pages/apps/news-blog/model/nb.model';

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
        `/administration-service/news?pageSize=${params.pageSize}&pageNo=${params.pageNo}&sortBy=${params.sortBy}`
    );
  }

  createNewsAndBlogs(news): Observable<any> {
    return this.http.post(`/administration-service/news`, news, this.httpOptions);
  }

  deleteNewsAndBlogs(id): Observable<any> {
    return this.http.delete(`/administration-service/news/` + id);
  }

  getByIdNewsAndBlog(id): Observable<any> {
    return this.http.get(`/administration-service/news/` + id);
  }
}
