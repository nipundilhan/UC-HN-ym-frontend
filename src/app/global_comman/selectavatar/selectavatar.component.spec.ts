import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectavatarComponent } from './selectavatar.component';

describe('SelectavatarComponent', () => {
  let component: SelectavatarComponent;
  let fixture: ComponentFixture<SelectavatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectavatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectavatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
