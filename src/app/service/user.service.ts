import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('access_token'),
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Access-Control-Allow-Origin': '*'
        })
    };

    constructor(private http: HttpClient) {
    }

    getUser(): Observable<any> {
        return this.http.get(``, this.httpOptions);
    }

    createUser(user): Observable<any> {
        return this.http.post(`dsfdsfgdsfg/sdfsdf/${user}`, user, this.httpOptions);
    }

}
