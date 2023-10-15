import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteDirectorComponent } from './docente-director.component';

describe('DocenteDirectorComponent', () => {
  let component: DocenteDirectorComponent;
  let fixture: ComponentFixture<DocenteDirectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocenteDirectorComponent]
    });
    fixture = TestBed.createComponent(DocenteDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
