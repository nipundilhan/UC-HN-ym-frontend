import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTutorialsComponent } from './view-tutorials.component';

describe('ViewTutorialsComponent', () => {
  let component: ViewTutorialsComponent;
  let fixture: ComponentFixture<ViewTutorialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTutorialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTutorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
