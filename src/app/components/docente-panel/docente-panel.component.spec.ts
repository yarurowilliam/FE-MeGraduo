import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocentePanelComponent } from './docente-panel.component';

describe('DocentePanelComponent', () => {
  let component: DocentePanelComponent;
  let fixture: ComponentFixture<DocentePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocentePanelComponent]
    });
    fixture = TestBed.createComponent(DocentePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
