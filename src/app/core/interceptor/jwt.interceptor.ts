import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {PersistenceService} from '../service/persistence.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthService,
                private persistenceService: PersistenceService,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.persistenceService.get(PersistenceService.TOKEN);

        if (token) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
            });
        }

        return next.handle(request).pipe(tap(() => {},
            (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.router.navigate(['login']);
                }
            }
        }));
    }
}
