import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from "@angular/common/http";

import {Injectable} from "@angular/core";
import {AuthService} from "../../service/auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthService,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: `${currentUser.token}`
                }
            });
        }

        return next.handle(request).pipe(tap(() => {},
            (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status !== 401 && err.status !== 500) {
                    return;
                }

                this.router.navigate(['login']);
            }
        }));
    }
}
