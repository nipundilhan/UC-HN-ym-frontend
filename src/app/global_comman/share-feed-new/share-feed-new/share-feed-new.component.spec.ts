import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareFeedNewComponent } from './share-feed-new.component';

describe('ShareFeedNewComponent', () => {
  let component: ShareFeedNewComponent;
  let fixture: ComponentFixture<ShareFeedNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareFeedNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareFeedNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
