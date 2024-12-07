import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMsgsComponent } from './admin-msgs.component';

describe('AdminMsgsComponent', () => {
  let component: AdminMsgsComponent;
  let fixture: ComponentFixture<AdminMsgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMsgsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMsgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
