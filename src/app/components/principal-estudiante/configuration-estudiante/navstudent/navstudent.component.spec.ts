import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavstudentComponent } from './navstudent.component';

describe('NavstudentComponent', () => {
  let component: NavstudentComponent;
  let fixture: ComponentFixture<NavstudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavstudentComponent]
    });
    fixture = TestBed.createComponent(NavstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
