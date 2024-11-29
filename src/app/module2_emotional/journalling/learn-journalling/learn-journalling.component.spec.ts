import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnJournallingComponent } from './learn-journalling.component';

describe('LearnJournallingComponent', () => {
  let component: LearnJournallingComponent;
  let fixture: ComponentFixture<LearnJournallingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnJournallingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnJournallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
