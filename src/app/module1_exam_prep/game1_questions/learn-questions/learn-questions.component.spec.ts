import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnQuestionsComponent } from './learn-questions.component';

describe('LearnQuestionsComponent', () => {
  let component: LearnQuestionsComponent;
  let fixture: ComponentFixture<LearnQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
