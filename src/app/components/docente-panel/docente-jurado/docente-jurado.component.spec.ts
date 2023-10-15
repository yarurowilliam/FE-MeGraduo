import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteJuradoComponent } from './docente-jurado.component';

describe('DocenteJuradoComponent', () => {
  let component: DocenteJuradoComponent;
  let fixture: ComponentFixture<DocenteJuradoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocenteJuradoComponent]
    });
    fixture = TestBed.createComponent(DocenteJuradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
