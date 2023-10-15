import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanteamientoComponent } from './planteamiento.component';

describe('PlanteamientoComponent', () => {
  let component: PlanteamientoComponent;
  let fixture: ComponentFixture<PlanteamientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanteamientoComponent]
    });
    fixture = TestBed.createComponent(PlanteamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
