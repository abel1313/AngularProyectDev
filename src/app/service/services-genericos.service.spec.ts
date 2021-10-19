import { TestBed } from '@angular/core/testing';

import { ServicesGenericosService } from './services-genericos.service';

describe('ServicesGenericosService', () => {
  let service: ServicesGenericosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesGenericosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
