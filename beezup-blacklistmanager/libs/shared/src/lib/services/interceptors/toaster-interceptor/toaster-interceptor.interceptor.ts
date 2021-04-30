import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {isEmpty} from 'lodash';
import {ToasterService} from '../../toaster/toaster.service';


@Injectable()
export class ToasterInterceptor implements HttpInterceptor {

  constructor(private toasterService: ToasterService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next
      .handle(request)
      .pipe(tap((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          if (ev.status === 200 && ev.body && ev.body.message && !isEmpty(ev.body.message)) {
            this.toasterService.setMessages(ev.body.message);
          }
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          /**
           * CHECK RESPONSE IN ERROR HANDLING
           */

          if (!err.error) {
            return;
          } else if (err.error.MESSAGE) {
            err.error['error'] = err.error.MESSAGE;
            delete err.error.MESSAGE;
          } else if (err.error.message) {
            err.error['error'] = err.error.message.error || err.error.message;
            delete err.error.message;
          }

          if (err.status !== 404) {
            this.toasterService.setMessages(err.error);
          }
        }
      }));
  }
}

