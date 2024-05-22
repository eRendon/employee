import { Component, HostListener, ViewChild, ViewContainerRef } from '@angular/core'
import { ModalService } from '../../services/modal/modal.service'
import scaleInOut from '../../../animations/scaleInOut'
import fadeInOut from '../../../animations/fadeInOut'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [scaleInOut, fadeInOut]
})
export class ModalComponent {
  @ViewChild('modalContent', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef

  constructor (private modalService: ModalService) {}

  @HostListener('document:keydown.escape')
  close():void {
    this.modalService.close()
  }
}
