import { TestBed } from '@angular/core/testing';

import { Debounce } from './debounce';

describe('Debounce', () => {
  let service: Debounce;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Debounce);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
