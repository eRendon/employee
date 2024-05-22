import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { ButtonComponent } from '../../../../shared/components/atomic/button/button.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DatePipe } from '@angular/common'
import { SelectComponent } from '../../../../shared/components/atomic/select/select.component'
import { ReactiveFormsModule } from '@angular/forms'

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeComponent, ButtonComponent, SelectComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [DatePipe]
    });
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
