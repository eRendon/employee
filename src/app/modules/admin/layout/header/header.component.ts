import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor (private employeeService: EmployeeService) {}

  search(target: EventTarget | null ) {
    if (target instanceof HTMLInputElement) {
      const searchTerm: string = target.value;
      this.employeeService.searchByName(searchTerm)
    }
  }
}
