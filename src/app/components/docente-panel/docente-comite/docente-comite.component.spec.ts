import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteComiteComponent } from './docente-comite.component';

describe('DocenteComiteComponent', () => {
  let component: DocenteComiteComponent;
  let fixture: ComponentFixture<DocenteComiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocenteComiteComponent]
    });
    fixture = TestBed.createComponent(DocenteComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
