import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getOrganizations(params): Observable<any> {
    return this.http.get(
        `/administration-service/organization?pageSize=${params.pageSize}&pageNo=${params.pageNo}&sortBy=${params.sortBy}`
    );
  }

  createOrganizations(organization): Observable<any> {
    return this.http.post(`/administration-service/organization`, organization, this.httpOptions);
  }

  deleteOrganization(id): Observable<any> {
    return this.http.delete(`/administration-service/organization/` + id);
  }

  getByIdOrganization(id): Observable<any> {
    return this.http.get(`/administration-service/organization/` + id);
  }
}
