import { AfterViewInit, Component, OnInit, ViewContainerRef } from '@angular/core'
import { IEmployee } from '../../../../interfaces/IEmployee'
import { ModalService } from '../../../../shared/services/modal/modal.service'
import { EmployeeComponent } from '../../components/employee/employee.component'
import { ModalComponent } from '../../../../shared/components/modal/modal.component'
import { EmployeeService } from '../../services/employee/employee.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  employees: IEmployee[] = []

  constructor (private modalService: ModalService,
               private viewContainerRef: ViewContainerRef,
               private employeeService: EmployeeService
  ) {}

  ngOnInit (): void {
    this.employeeService.getAll()
    this.employeeService.employees.subscribe({
      next: employees => {
        this.employees = employees
      }
    })
  }

  ngAfterViewInit (): void {
    this.modalService.setRootViewContainerRef(this.viewContainerRef)
  }

  openModal (): void {
    this.modalService.open(ModalComponent, EmployeeComponent)
  }

}
