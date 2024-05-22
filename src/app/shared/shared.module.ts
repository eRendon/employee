import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component'
import { ButtonComponent } from './components/atomic/button/button.component'
@NgModule({
  declarations: [
    ModalComponent,
    ButtonComponent
  ],
  exports: [
    ModalComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
