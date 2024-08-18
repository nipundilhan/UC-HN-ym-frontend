import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Module1EnterGameComponent } from './module1-enter-game.component';

describe('Module1EnterGameComponent', () => {
  let component: Module1EnterGameComponent;
  let fixture: ComponentFixture<Module1EnterGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Module1EnterGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Module1EnterGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
