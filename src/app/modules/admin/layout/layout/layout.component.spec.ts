import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from '../sidebar/sidebar.component'
import { HeaderComponent } from '../header/header.component'
import { RouterTestingModule } from '@angular/router/testing'
import { LoadingComponent } from '../../../../shared/components/loading/loading.component'
import { AlertComponent } from '../../../../shared/components/alert/alert.component'

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        LoadingComponent,
        AlertComponent
      ],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
