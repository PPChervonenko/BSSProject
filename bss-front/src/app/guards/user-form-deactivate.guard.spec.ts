import { TestBed, async, inject } from '@angular/core/testing';

import { UserFormDeactivateGuard } from './user-form-deactivate.guard';

describe('UserFormDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFormDeactivateGuard]
    });
  });

  it('should ...', inject([UserFormDeactivateGuard], (guard: UserFormDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
