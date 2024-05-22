import { Component } from '@angular/core';
import { IEmployee } from '../../../../interfaces/IEmployee'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  employees: IEmployee[] = [
    {
      name: 'Jane',
      surName: 'Smith',
      job: 'Product Manager',
      birthDate: new Date('1985-09-20')
    }
  ]
}
