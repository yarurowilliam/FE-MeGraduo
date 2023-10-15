import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTeacherComponent } from './verify-teacher.component';

describe('VerifyTeacherComponent', () => {
  let component: VerifyTeacherComponent;
  let fixture: ComponentFixture<VerifyTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyTeacherComponent]
    });
    fixture = TestBed.createComponent(VerifyTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
