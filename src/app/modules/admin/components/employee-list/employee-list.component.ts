import { Component, Input } from '@angular/core'
import { IEmployee } from '../../../../interfaces/IEmployee'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  @Input() employees!: IEmployee[]
}
