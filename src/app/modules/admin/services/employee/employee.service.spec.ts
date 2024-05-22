import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { LocalStoreService } from '../../../../shared/services/local-store/local-store.service'
import { IEmployee } from '../../../../interfaces/IEmployee'

describe('EmployeeService', () => {
  let service: EmployeeService;
  let localStoreService: jasmine.SpyObj<LocalStoreService>;

  beforeEach(() => {
    const localStoreSpy = jasmine.createSpyObj('LocalStoreService', ['getData', 'setData']);

    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        { provide: LocalStoreService, useValue: localStoreSpy }
      ]
    });

    service = TestBed.inject(EmployeeService);
    localStoreService = TestBed.inject(LocalStoreService) as jasmine.SpyObj<LocalStoreService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an employee', (done) => {
    const newEmployee: IEmployee = { id: 1, name: 'John', job: 'Developer', surName: 'Doe', birthDate: new Date('1990-01-01') };
    localStoreService.getData.and.returnValue([]);
    localStoreService.setData.and.stub();

    service.create(newEmployee).then((result) => {
      expect(result).toBeTrue();
      expect(localStoreService.setData).toHaveBeenCalledWith('employees', [newEmployee]);
      done();
    });

    service.getAll();
  });

  it('should delete an employee', (done) => {
    const employees: IEmployee[] = [
      { id: 1, name: 'John', job: 'Developer', surName: 'Doe', birthDate: new Date('1990-01-01') },
      { id: 2, name: 'Jane', job: 'Designer', surName: 'Doe', birthDate: new Date('1992-02-02') }
    ];
    localStoreService.getData.and.returnValue(employees);
    localStoreService.setData.and.stub();

    service.delete(1).then((result) => {
      expect(result).toBeTrue();
      expect(localStoreService.setData).toHaveBeenCalledWith('employees', [employees[1]]);
      done();
    });

    service.getAll();
  });

  it('should search employees by name', () => {
    const employees: IEmployee[] = [
      { id: 1, name: 'John', job: 'Developer', surName: 'Doe', birthDate: new Date('1990-01-01') },
      { id: 2, name: 'Jane', job: 'Designer', surName: 'Doe', birthDate: new Date('1992-02-02') }
    ];
    service.allEmployees = employees;
    service.searchByName('Jane');

    service.employees.subscribe((filteredEmployees) => {
      expect(filteredEmployees.length).toBe(1);
      expect(filteredEmployees[0].name).toBe('Jane');
    });
  });
});
