import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpCacheService } from '../services/httpcache.service';

export const CACHEABLE = new HttpContextToken(() => true);

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: HttpCacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!req.context.get(CACHEABLE)) {
      return next.handle(req);
    }

    //non-cacheable requests
    if (req.method !== 'GET') {
      console.log(`Invalidating cache:${req.method} ${req.url}`);
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    //retrive cache response
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

    //cached response
    if (cachedResponse) {
      console.log(`Returning a cached response: ${cachedResponse.url}`);
      console.log(cachedResponse);
      return of(cachedResponse);
    }

    //send request to server and add response to cache
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log(`Adding item to cache: ${req.url}`);
          this.cacheService.put(req.url,event)
        }
      })
    );
  }
}
