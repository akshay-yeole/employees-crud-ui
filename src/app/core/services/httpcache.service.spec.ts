import { TestBed } from '@angular/core/testing';

import { HttpcacheService } from './httpcache.service';

describe('HttpcacheService', () => {
  let service: HttpcacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpcacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
