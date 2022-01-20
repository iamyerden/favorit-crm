import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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

  getNewsAndBlogs(): Observable<any> {
    return this.http.get(`/news-service/news/all`);
    // `/news-service/news/all?pageSize=${params.pageSize}&pageNo=${params.pageNo}&sortBy=${params.sortBy}`
  }

  createNewsAndBlogs(news): Observable<any> {
    return this.http.post(`/news-service/news`, news, this.httpOptions);
  }

  deleteNewsAndBlogs(id): Observable<any> {
    return this.http.delete(`/news-service/news/` + id, this.httpOptions);
  }

  getByIdNewsAndBlog(id): Observable<any> {
    return this.http.get(`/news-service/news/` + id, this.httpOptions);
  }

  updateNewsStatus(newsId: any, newStatus: string, username: string): Observable<any> {
    const headers = this.httpOptions.headers;
    headers.set('username', username);

    return this.http.put(`/news-service/newsStatus/${newsId}`, {}, {
      params: {
        status: newStatus
      },
      headers: this.httpOptions.headers
    });
  }

  getNewsAndBlogsByStatus(_status: string): Observable<any> {
    return this.http.get(`/news-service/news/status/${_status}`, {
      params: {
        status: _status
      },
      headers: this.httpOptions.headers
    });
  }
}
