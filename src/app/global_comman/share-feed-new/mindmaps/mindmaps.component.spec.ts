import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindmapsComponent } from './mindmaps.component';

describe('MindmapsComponent', () => {
  let component: MindmapsComponent;
  let fixture: ComponentFixture<MindmapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MindmapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MindmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
