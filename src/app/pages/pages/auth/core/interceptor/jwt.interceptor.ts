import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from "@angular/common/http";

import {Injectable} from "@angular/core";
import {AuthService} from "../../auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthService,
                private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`,
                },
            });
        }

        return next.handle(request);
    }

}

// @Injectable()
// export class RequestInterceptor implements HttpInterceptor {
//
//     constructor(private persistence: PersistenceService,
//                 private auth: AuthService,
//                 private storageService: StorageService,
//                 private router: Router) {
//     }
//
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//
//         let headers = req.headers;
//         // paste token
//         const token = this.persistence.get(PersistenceService.TOKEN);
//
//         if (!new RegExp(ServiceBaseUrlConstants.acceptedURLS.join('|')).test(req.url) && token !== null &&
//             token !== '' && req.url !== 'https://beta.kcell.kz/graphql') {
//             headers = headers.set('Authorization', token);
//         }
//
//         // define response content type
//         // headers = headers.set('Accept', 'application/json');
//         if (req.responseType === 'blob') {
//             return next.handle(
//                 req.clone({headers})
//             ).pipe(
//                 // handle response data
//                 map(
//                     event => {
//                         if (event instanceof HttpResponse) {
//                             event = event.clone({body: this.processResponseData(event.body, req.url)});
//                         }
//                         return event;
//                     }
//                 ));
//         } else if ('https://beta.kcell.kz/graphql' === req.url) {
//             return next.handle(
//                 req.clone({headers})
//             ).pipe(
//                 // handle response data
//                 map(
//                     event => {
//                         if (event instanceof HttpResponse) {
//                             event = event.clone({body: event.body});
//                         }
//                         return event;
//                     }
//                 ));
//         } else {
//             return next.handle(
//                 req.clone({headers})
//             ).pipe(
//                 // handle response data
//                 map(
//                     event => {
//                         if (event instanceof HttpResponse) {
//                             event = event.clone({body: this.processResponseData(event.body, req.url)});
//                         }
//                         return event;
//                     }
//                 ), catchError((error: any) => {
//                     if (error instanceof HttpErrorResponse) {
//                         console.log(error);
//                         if (error.status === 401) {
//                             this.router.navigate(['/']);
//                         } else if (error.status === 403
//                             || (error.status === 500 && error.error.message.includes('Не авторизован'))) {
//                             this.storageService.changeUAuthHandle(true);
//                         }
//                     }
//                     return throwError(error);
//                 })
//             );
//         }
//     }
//
//     processResponseData(body: any, url: any): void {
//         const responseModel = new ResponseModel(body);
//         if (responseModel.isError()) {
//             throw new Error(responseModel.errorDescription);
//         }
//         return responseModel.data;
//     }
//
// }
