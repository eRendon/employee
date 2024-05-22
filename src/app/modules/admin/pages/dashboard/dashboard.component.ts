import { AfterViewInit, Component, ViewContainerRef } from '@angular/core'
import { IEmployee } from '../../../../interfaces/IEmployee'
import { ModalService } from '../../../../shared/services/modal/modal.service'
import { EmployeeComponent } from '../../components/employee/employee.component'
import { ModalComponent } from '../../../../shared/components/modal/modal.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  employees: IEmployee[] = [
    {
      name: 'Jane',
      surName: 'Smith',
      job: 'Product Manager',
      birthDate: new Date('1985-09-20')
    }
  ]

  constructor (private modalService: ModalService, private viewContainerRef: ViewContainerRef) {}

  ngAfterViewInit (): void {
    this.modalService.setRootViewContainerRef(this.viewContainerRef)
  }

  openModal (): void {
    this.modalService.open(ModalComponent, EmployeeComponent)
  }

}
