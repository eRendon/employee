import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { DatePipe } from '@angular/common'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SelectComponent } from '../../../../shared/components/atomic/select/select.component'
import { ButtonComponent } from '../../../../shared/components/atomic/button/button.component'
import { LoadingComponent } from '../../../../shared/components/loading/loading.component'
import { AlertComponent } from '../../../../shared/components/alert/alert.component'
import { ReactiveFormsModule } from '@angular/forms'

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        SelectComponent,
        ButtonComponent,
        LoadingComponent,
        AlertComponent
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [DatePipe]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
