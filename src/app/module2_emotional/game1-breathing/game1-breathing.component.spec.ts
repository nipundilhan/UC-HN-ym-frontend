import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Game1BreathingComponent } from './game1-breathing.component';

describe('Game1BreathingComponent', () => {
  let component: Game1BreathingComponent;
  let fixture: ComponentFixture<Game1BreathingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Game1BreathingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Game1BreathingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
