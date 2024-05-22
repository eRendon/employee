import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { EmployeeService } from '../../../admin/services/employee/employee.service'
import { PositionsService } from '../../../../shared/services/endpoints/positions/positions.service'
import { IPositions } from '../../../../interfaces/IPositions'
import { LoadingService } from '../../../../shared/services/loading/loading.service'
import { AlertService } from '../../../../shared/services/alert/alert.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  employee!: FormGroup
  positionsData!: IPositions

  constructor (private fb: FormBuilder,
               private datePide: DatePipe,
               private employeeService: EmployeeService,
               private positionsService: PositionsService,
               private loadingService: LoadingService,
               private alertService: AlertService
  ) {}

  ngOnInit (): void {
    this.employee = this.fb.group({
      name: ['', [Validators.required]],
      job: [null, [Validators.required]],
      birthDate: [this.datePide.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
      surName: ['', [Validators.required]],
      id: [Math.floor(Math.random() * 1000000)]
    })

    this.positionsService.getPositions().subscribe({
      next: positions => {
        this.positionsData = positions
      }
    })
  }

  onSelectOption (option: string): void {
    this.employee.get('job')?.setValue(option)
  }

  async register (): Promise<void> {
    try {
      if (this.employee.valid) {
        this.loadingService.present()
        await this.employeeService.create(this.employee.value)
        this.employee.reset()
        this.loadingService.close()
        this.alertService.success('Se ha registrado correctamente')
      } else {
        this.employee.markAllAsTouched()
      }
    } catch (e) {
      this.loadingService.close()
      this.alertService.error('Hubo un error al intentar registrarse, por favor intente luegp')
    }
  }
}
