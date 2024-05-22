import { Component, Input } from '@angular/core'
import { IEmployee } from '../../../../interfaces/IEmployee'
import { EmployeeService } from '../../services/employee/employee.service'
import { LoadingService } from '../../../../shared/services/loading/loading.service'
import { AlertService } from '../../../../shared/services/alert/alert.service'
import { ModalService } from '../../../../shared/services/modal/modal.service'
import { ModalComponent } from '../../../../shared/components/modal/modal.component'
import { EmployeeComponent } from '../employee/employee.component'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  @Input() employees!: IEmployee[]

  constructor (private employeeService: EmployeeService,
               private loadingService: LoadingService,
               private alertService: AlertService,
               private modalService: ModalService
  ) {}

  async delete (id: number): Promise<void> {
    this.loadingService.present()
    try {
      console.log(id)
      await this.employeeService.delete(id)
      this.loadingService.close()
      this.alertService.success('Se ha eliminado correctamente el empleado')
    } catch (e) {
      this.alertService.error('Hubo un problema al intentar eliminar el empleado, por favor intente luego')
    }
  }

  edit (employee: IEmployee) {
    this.modalService.open(ModalComponent, EmployeeComponent, employee)
  }
}
