import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnMindmapsComponent } from './learn-mindmaps.component';

describe('LearnMindmapsComponent', () => {
  let component: LearnMindmapsComponent;
  let fixture: ComponentFixture<LearnMindmapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnMindmapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnMindmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
