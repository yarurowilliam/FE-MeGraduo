import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyStudentComponent } from './verify-student.component';

describe('VerifyStudentComponent', () => {
  let component: VerifyStudentComponent;
  let fixture: ComponentFixture<VerifyStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyStudentComponent]
    });
    fixture = TestBed.createComponent(VerifyStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
