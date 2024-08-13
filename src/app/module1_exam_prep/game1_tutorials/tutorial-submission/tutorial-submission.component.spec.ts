import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialSubmissionComponent } from './tutorial-submission.component';

describe('TutorialSubmissionComponent', () => {
  let component: TutorialSubmissionComponent;
  let fixture: ComponentFixture<TutorialSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
