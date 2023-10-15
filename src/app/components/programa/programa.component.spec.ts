import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaComponent } from './programa.component';

describe('ProgramaComponent', () => {
  let component: ProgramaComponent;
  let fixture: ComponentFixture<ProgramaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramaComponent]
    });
    fixture = TestBed.createComponent(ProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
