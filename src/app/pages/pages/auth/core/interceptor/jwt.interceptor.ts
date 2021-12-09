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
import {shareReplay} from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthService,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');
        let clonedReq;

        if (token) {
            clonedReq = request.clone({
                headers: request.headers.set('Authorization', token)
            });
        }

        const handler: Observable<any> = next.handle(token ? clonedReq : request).pipe(shareReplay());

        handler.toPromise().then().catch(event => {
            if (event instanceof HttpErrorResponse && (event.status === 401 || event.status === 403)) {
                console.log('Unauthorized request was handled. Logging out: ', event);

                this.authenticationService.logout();
                this.router.navigate(['/login']);
            }
        });

        return next.handle(request);
    }

}
