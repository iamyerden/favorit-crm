import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly CATEGORY_URL = '/questionnaire-service/category';

  categories = null;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getCategories (): Observable<any> {
    return this.http.get(this.CATEGORY_URL);
  }

  createCategory (category): Observable<any> {
    return this.http.post(this.CATEGORY_URL, category, this.httpOptions);
  }

  deleteCategory (id) : Observable<any> {
    return this.http.delete(this.CATEGORY_URL + `/` + id);
  }

  getCategoryById (id) : Observable<any> {
    return this.http.get(this.CATEGORY_URL + `/` + id);
  }
}
