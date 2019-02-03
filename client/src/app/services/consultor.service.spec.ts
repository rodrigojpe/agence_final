import { TestBed } from '@angular/core/testing';

import { ConsultorService } from './consultor.service';

describe('ConsultorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultorService = TestBed.get(ConsultorService);
    expect(service).toBeTruthy();
  });
});
