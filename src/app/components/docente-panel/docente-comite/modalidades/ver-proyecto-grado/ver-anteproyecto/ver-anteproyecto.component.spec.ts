import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAnteproyectoComponent } from './ver-anteproyecto.component';

describe('VerAnteproyectoComponent', () => {
  let component: VerAnteproyectoComponent;
  let fixture: ComponentFixture<VerAnteproyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerAnteproyectoComponent]
    });
    fixture = TestBed.createComponent(VerAnteproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
