// @ts-ignore
import {Injectable} from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
  // @ts-ignore
} from '@angular/common/http';
// @ts-ignore
import {Observable} from 'rxjs';
// @ts-ignore
import {tap} from 'rxjs/operators';
// @ts-ignore
import {Router} from '@angular/router';
import {AuthenticationService} from "../service/authentication.service";

// @ts-ignore
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authenticationService.logout();
          this.router.navigate(['/']);
        } else if (err.status === 403) {
          this.router.navigate(['/']);
        }
      }
    }));
  }
}
