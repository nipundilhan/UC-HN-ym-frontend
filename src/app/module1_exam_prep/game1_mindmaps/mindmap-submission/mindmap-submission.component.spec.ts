import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindmapSubmissionComponent } from './mindmap-submission.component';

describe('MindmapSubmissionComponent', () => {
  let component: MindmapSubmissionComponent;
  let fixture: ComponentFixture<MindmapSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MindmapSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MindmapSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
