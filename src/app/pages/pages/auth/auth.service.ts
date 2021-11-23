import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = '/crm/api';

  constructor(
      private http: HttpClient
  ) { }

  public login(obj: any){
    return this.http.post(`${URL}` + '/login', obj);
  }
}
