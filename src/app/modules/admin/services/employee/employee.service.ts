import { Injectable } from '@angular/core';
import { LocalStoreService } from '../../../../shared/services/local-store/local-store.service'
import { IEmployee } from '../../../../interfaces/IEmployee'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

/**
 * all fetch mocks have delay set time out to simulate response time
 */

export class EmployeeService {
  employeesKey = 'employees'
  employees: BehaviorSubject<IEmployee[]> = new BehaviorSubject<IEmployee[]>([])
  allEmployees: IEmployee[] = []
  constructor(private localStoreService: LocalStoreService) { }

  /**
   * create a new employee in the DB (localStore), obtain the employee of DB, if null data, return empty array and generate
   * new array with employee data and return all employees
   * @param employee
   */
  create(employee: IEmployee): Promise<boolean> {
    let employees: IEmployee[] = this.localStoreService.getData<IEmployee[]>(this.employeesKey) || []

    employees = [...employees, employee]

    this.localStoreService.setData(this.employeesKey, employees)

    this.getAll()

    return new Promise((resolve) => {
      setTimeout(()=> {
        resolve(true)
      }, 2000)
    })
  }

  /**
   * get all employee data and set in behavior and static property
   */

  getAll(): Promise<boolean> {
    const employees: IEmployee[] = this.localStoreService.getData<IEmployee[]>(this.employeesKey) || []
    this.allEmployees = employees
    this.employees.next(employees)

    return new Promise((resolve) => {
      setTimeout(()=> {
        resolve(true)
      }, 2000)
    })
  }

  /**
   * delete employee data by id, get all employee data from DB and filter data, set filtered data in behavior and static
   * property
   * @param id
   */

  delete(id: number) :Promise<boolean> {
    try {
      const employees: IEmployee[] = this.localStoreService.getData<IEmployee[]>(this.employeesKey) || []
      const newEmployees = employees.filter((employee) => employee.id !== id)
      this.allEmployees = employees
      this.employees.next(newEmployees)
      this.localStoreService.setData(this.employeesKey, this.employees.value)

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 2000)
      })
    } catch (e) {
      throw e
    }
  }

  /**
   * edit employee data by id, get all employee data and find by id, set a new array with old data and set the new data
   * in array.
   * @param dataEmployee
   */

  edit(dataEmployee: IEmployee): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        console.log(dataEmployee)
        const employees: IEmployee[] = this.localStoreService.getData<IEmployee[]>(this.employeesKey) || []
        const index = employees.findIndex((employee) => employee.id === dataEmployee.id)
        if (index != -1) {
          employees[index] = { ...employees[index], ...dataEmployee}
          this.localStoreService.setData(this.employeesKey, employees)
          this.allEmployees = employees
          this.employees.next(employees)
          setTimeout(() => {
            resolve(true)
          }, 2000)
        } else {
          setTimeout(() => {
            reject(false)
          }, 2000)
        }
      } catch (e) {
        setTimeout(() => {
          reject(e)
        }, 2000)
      }
    })
  }

  /**
   * search employee by name and filter data in behavior
   * @param name
   */
  searchByName(name: string): void {
    const employees = this.allEmployees.filter(employee => employee.name.toLowerCase().includes(name.toLowerCase()))
    this.employees.next(employees)
  }
}
