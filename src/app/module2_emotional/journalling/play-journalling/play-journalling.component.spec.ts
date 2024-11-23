import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayJournallingComponent } from './play-journalling.component';

describe('PlayJournallingComponent', () => {
  let component: PlayJournallingComponent;
  let fixture: ComponentFixture<PlayJournallingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayJournallingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayJournallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
