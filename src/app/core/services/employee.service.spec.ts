import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';
import { ErrorInfo } from '../models/errorinfo.model';

describe('EmployeeService test suite', () => {
  let employeeService: EmployeeService;
  let httpTestingController: HttpTestingController;
  let employees: Employee[] = [
    {
      id: '8c11fa1e-21b1-45bc-9b22-4273ee131951',
      name: 'xyz',
      department: 'xyz',
      email: 'xyz',
      phone: 12345,
      salary: 12345,
    },
    {
      id: '99231190-c9e3-4e41-bde3-5952d7090ac3',
      name: 'xyz',
      department: 'xyz',
      email: 'xyz',
      phone: 12345,
      salary: 12345,
    },
    {
      id: '8c6cbe60-b156-4377-bda2-88bfefa393cc',
      name: 'xyz',
      department: 'xyz',
      email: 'xyz',
      phone: 12345,
      salary: 12345,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    });

    employeeService = TestBed.inject(EmployeeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get all employees', () => {
    // employeeService.getAllEmployees().subscribe((data : Employee[]) => {
    //   expect(data.length).toBe(3);
    // });

    let employeeRequest: TestRequest =
      httpTestingController.expectOne('/api/employees');
    
      expect(employeeRequest.request.method).toEqual('GET');
    employeeRequest.flush(employees);
    httpTestingController.verify();
  });
});
