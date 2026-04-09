import { TestBed } from '@angular/core/testing';

import { InstallAppService } from './install-app.service';

describe('InstallAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstallAppService = TestBed.get(InstallAppService);
    expect(service).toBeTruthy();
  });
});
