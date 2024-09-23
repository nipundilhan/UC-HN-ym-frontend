import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnTutorialsComponent } from './learn-tutorials.component';

describe('LearnTutorialsComponent', () => {
  let component: LearnTutorialsComponent;
  let fixture: ComponentFixture<LearnTutorialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnTutorialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnTutorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
