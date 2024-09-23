import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareFeedComponent } from './share-feed.component';

describe('ShareFeedComponent', () => {
  let component: ShareFeedComponent;
  let fixture: ComponentFixture<ShareFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
