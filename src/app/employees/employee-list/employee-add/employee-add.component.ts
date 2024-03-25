import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent {
  employee: Employee = {
    id: '',
    name: '',
    department: '',
    email: '',
    phone: 0,
    salary: 0,
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  addProduct() {
    this.employee.id = this.generateGuid();
    this.employeeService.addEmployee(this.employee).subscribe((res) => {
      this.router.navigateByUrl('/employees');
    });
  }

  generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
