import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnBreathingComponent } from './learn-breathing.component';

describe('LearnBreathingComponent', () => {
  let component: LearnBreathingComponent;
  let fixture: ComponentFixture<LearnBreathingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnBreathingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnBreathingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
