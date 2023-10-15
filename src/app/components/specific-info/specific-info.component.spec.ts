import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificInfoComponent } from './specific-info.component';

describe('SpecificInfoComponent', () => {
  let component: SpecificInfoComponent;
  let fixture: ComponentFixture<SpecificInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificInfoComponent]
    });
    fixture = TestBed.createComponent(SpecificInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
