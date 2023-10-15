import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarPerfilDocenteComponent } from './completar-perfil-docente.component';

describe('CompletarPerfilDocenteComponent', () => {
  let component: CompletarPerfilDocenteComponent;
  let fixture: ComponentFixture<CompletarPerfilDocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletarPerfilDocenteComponent]
    });
    fixture = TestBed.createComponent(CompletarPerfilDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
