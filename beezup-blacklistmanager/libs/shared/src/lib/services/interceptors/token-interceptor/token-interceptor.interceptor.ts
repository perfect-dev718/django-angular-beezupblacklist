import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {EMPTY, Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor token")
      if (!request.url.includes('/login') &&
        !request.url.includes('en.json')) {
        if (!this.auth.token) {
          this.auth.logout();
          return EMPTY;
        }
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.auth.token}`,
          }
        });
      } else if (request.url.includes('/security/refresh')) {
        const token = localStorage.getItem('userToken');
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          }
        });
      }

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.auth.logout();
        }
      }
    }));
  }
}
