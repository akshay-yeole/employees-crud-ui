import {
    HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const CONTENT_TYPE = new HttpContextToken(() => 'application/json');

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`URL :: ${req.url}`);
    let modifiedRequest: HttpRequest<any> = req.clone({
      setHeaders: { 'Content-Type': req.context.get(CONTENT_TYPE) },
    });
    return next.handle(modifiedRequest);
  }
}
