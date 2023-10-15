import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoAddStudentComponent } from './general-info-add-student.component';

describe('GeneralInfoAddStudentComponent', () => {
  let component: GeneralInfoAddStudentComponent;
  let fixture: ComponentFixture<GeneralInfoAddStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInfoAddStudentComponent]
    });
    fixture = TestBed.createComponent(GeneralInfoAddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
