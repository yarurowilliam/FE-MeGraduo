import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProyectoCalificacionesComponent } from './detalle-proyecto-calificaciones.component';

describe('DetalleProyectoCalificacionesComponent', () => {
  let component: DetalleProyectoCalificacionesComponent;
  let fixture: ComponentFixture<DetalleProyectoCalificacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleProyectoCalificacionesComponent]
    });
    fixture = TestBed.createComponent(DetalleProyectoCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
