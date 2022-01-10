import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TabService {

  private readonly TAB_URL = '/news-service/tab';

  categories = null;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getTabs (): Observable<any> {
    return this.http.get(this.TAB_URL);
  }

  createTab (category): Observable<any> {
    return this.http.post(this.TAB_URL, category, this.httpOptions);
  }

  deleteTab (id) : Observable<any> {
    return this.http.delete(this.TAB_URL + `/` + id);
  }

  getCategoryById (id) : Observable<any> {
    return this.http.get(this.TAB_URL + `/` + id);
  }
}
