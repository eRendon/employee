import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent]
    });
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    component.employees = []
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
