import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProyectoComentariosComponent } from './detalle-proyecto-comentarios.component';

describe('DetalleProyectoComentariosComponent', () => {
  let component: DetalleProyectoComentariosComponent;
  let fixture: ComponentFixture<DetalleProyectoComentariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleProyectoComentariosComponent]
    });
    fixture = TestBed.createComponent(DetalleProyectoComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
