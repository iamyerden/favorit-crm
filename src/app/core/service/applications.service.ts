import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  news = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getPageableApplications(_params): Observable<any> {
    return this.http.get(`/confirmation-service/application/read/pageable`, {
      params: _params
    });
  }

  getByIdApplication(id): Observable<any> {
    return this.http.get(`/confirmation-service/application/read/` + id);
  }

  approveApplication(id): Observable<any> {
    return this.http.put(`/confirmation-service/application/approve/` + id, null);
  }

  declineApplication(id): Observable<any> {
    return this.http.put(`/confirmation-service/application/decline/` + id, null);
  }
}
