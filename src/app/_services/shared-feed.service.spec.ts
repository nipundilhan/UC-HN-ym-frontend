import { TestBed } from '@angular/core/testing';

import { SharedFeedService } from './shared-feed.service';

describe('SharedFeedService', () => {
  let service: SharedFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
