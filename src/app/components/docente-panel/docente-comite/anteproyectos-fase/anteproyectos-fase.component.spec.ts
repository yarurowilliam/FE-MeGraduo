import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnteproyectosFaseComponent } from './anteproyectos-fase.component';

describe('AnteproyectosFaseComponent', () => {
  let component: AnteproyectosFaseComponent;
  let fixture: ComponentFixture<AnteproyectosFaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnteproyectosFaseComponent]
    });
    fixture = TestBed.createComponent(AnteproyectosFaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
