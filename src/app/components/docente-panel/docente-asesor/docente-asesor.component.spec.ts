import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteAsesorComponent } from './docente-asesor.component';

describe('DocenteAsesorComponent', () => {
  let component: DocenteAsesorComponent;
  let fixture: ComponentFixture<DocenteAsesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocenteAsesorComponent]
    });
    fixture = TestBed.createComponent(DocenteAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
