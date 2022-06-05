import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private urlsToNotUse: Array<string>;

  constructor(private authService: AuthService) {
    this.urlsToNotUse = [
      // 'users'
    ]
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isValidRequestForInterceptor(request.url)) {
      request = request.clone({
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          'x-auth-token': `${this.authService.getToken()}`,
        },
      });
    }
    return next.handle(request);
  }

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    let positionIndicator: string = 'api/';
    let position = requestUrl.indexOf(positionIndicator);

    if (position > 0) {
      let destination: string = requestUrl.substr(position + positionIndicator.length);
      for (let address of this.urlsToNotUse) {
        if (new RegExp(address).test(destination)) {
          return false;
        }
      }
    }
    return true;
  }
}
