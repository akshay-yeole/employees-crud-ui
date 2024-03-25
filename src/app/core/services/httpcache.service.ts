import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  private requets: any = {};

  constructor(){}

  put(url: string, response: HttpResponse<any>) : void {
    this.requets[url] = response;
  }

  get(url: string): HttpResponse<any | undefined> {
    return this.requets[url];
  }

  invalidateUrl(url: string) :void {
    this.requets[url] = undefined;
  }

  invalidateCache() {
    this.requets = { };
  }
}
