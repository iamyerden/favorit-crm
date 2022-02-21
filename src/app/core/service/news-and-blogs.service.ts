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

  getPageableTournaments(_params): Observable<any> {
    return this.http.get(`/tournament/tournament/read/pageable`, {
      params: _params
    });
  }

  getByIdTournament(id): Observable<any> {
    return this.http.get(`/tournament/tournament/read/` + id);
  }

  approveTournament(id): Observable<any> {
    return this.http.put(`/tournament/tournament/approve/` + id, null);
  }

  declineTournament(id): Observable<any> {
    return this.http.put(`/tournament/tournament/decline/` + id, null);
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

  updateNewsStatus(newsId: any, newStatus: string, reason: string, username: string): Observable<any> {
    const headers = this.httpOptions.headers;
    headers.set('username', username);

    return this.http.put(`/news-service/news/news-status/${newsId}`, {}, {
      params: {
        status: newStatus,
        statusReason: reason
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
