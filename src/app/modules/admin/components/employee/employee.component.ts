import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PositionsService } from '../../../../shared/services/endpoints/positions/positions.service'
import { IPositions } from '../../../../interfaces/IPositions'
import { DatePipe } from '@angular/common'
import { EmployeeService } from '../../services/employee/employee.service'
import { LoadingService } from '../../../../shared/services/loading/loading.service'
import { AlertService } from '../../../../shared/services/alert/alert.service'
import { IEmployee } from '../../../../interfaces/IEmployee'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @Input() data?: IEmployee
  formEmployee!: FormGroup
  positionsData!: IPositions
  constructor (private fb: FormBuilder,
               private positionsService: PositionsService,
               private datePipe: DatePipe,
               private employeeService: EmployeeService,
               private loadingService: LoadingService,
               private alertService: AlertService
  ) {}

  ngOnInit (): void {
    /**
     * get positions data from api
     */
    this.positionsService.getPositions().subscribe({
      next: positions => {
        this.positionsData = positions
      }
    })

    this.formEmployee = this.fb.group({
      name: ['', [Validators.required]],
      job: [null, [Validators.required]],
      surName: ['', [Validators.required]],
      birthDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
      id: [Math.floor(Math.random() * 1000000)]
    })

    if (this.data) {
      this.formEmployee.setValue(this.data)
    }
  }

  /**
   * select job option at select component
   * @param option
   */

  onSelectOption (option: string): void {
    this.formEmployee.get('job')?.setValue(option)
  }

  /**
   * create employee user before validate form
   */

  async create (): Promise<void> {
    if (this.formEmployee.valid) {
      try {
        this.loadingService.present()
        await this.employeeService.create(this.formEmployee.value)
        this.loadingService.close()
        this.alertService.success('Se ha creado el usuario correctamente')
      } catch (e) {
        this.alertService.error('Hubo un problema al intentar crear el usuario, por favor intente luego')
      }
    } else {
      this.formEmployee.markAllAsTouched()
    }
  }

  isEditOrCreate(): void {
    this.data ? this.edit(this.formEmployee.value) : this.create()
  }

  async edit (employee: IEmployee) {
    try {
      this.loadingService.present()
      await this.employeeService.edit(employee)
      this.loadingService.close()
      this.alertService.success('Se ha actualizado correctamente el empleado')
    } catch (e) {
      this.alertService.error('Hubo un problema al intentar editar el usuario, por favor intente luego')
    }
  }
}
