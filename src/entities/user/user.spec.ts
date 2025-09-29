import { TestBed } from '@angular/core/testing';

import { UserComponent } from './user';

describe('User', () => {
  let service: UserComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
