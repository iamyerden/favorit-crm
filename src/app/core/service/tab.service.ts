import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pagination} from "../models/pagination.model";

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

    constructor(private http: HttpClient) {
    }

    getTabs(): Observable<any> {
        return this.http.get(this.TAB_URL);
    }

    createTab(tab): Observable<any> {
        return this.http.post(this.TAB_URL, tab, this.httpOptions);
    }

    updateTab(id, tab): Observable<any> {
        return this.http.put(this.TAB_URL + `/` + id, tab, this.httpOptions);
    }

    deleteTab(id): Observable<any> {
        return this.http.delete(this.TAB_URL + `/` + id);
    }

    getCategoryById(id): Observable<any> {
        return this.http.get(this.TAB_URL + `/` + id);
    }

    getAllTabs(): Observable<any> {
        return this.http.get(this.TAB_URL);
    }

    requestConstructor(params: Pagination) {
        let requestParams = '?';
        for (const param in params) {
            requestParams += (params[param] === '' || params[param] === null)
                ? '' : (param + '=' + params[param] + '&');
        }
        return requestParams;
    }

    getAllTabsPageable(params: Pagination): Observable<any> {
        return this.http.get(`${this.TAB_URL}/pageable` + this.requestConstructor(params));
    }
}
