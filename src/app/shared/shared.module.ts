import { NgModule } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component'
import { ButtonComponent } from './components/atomic/button/button.component'
import { SelectComponent } from './components/atomic/select/select.component'
import { CommonModule, DatePipe } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { AlertComponent } from './components/alert/alert.component'
@NgModule({
  declarations: [
    ModalComponent,
    ButtonComponent,
    SelectComponent,
    LoadingComponent,
    AlertComponent
  ],
  exports: [
    ModalComponent,
    ButtonComponent,
    SelectComponent,
    LoadingComponent,
    AlertComponent
  ],
  providers: [
    DatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
