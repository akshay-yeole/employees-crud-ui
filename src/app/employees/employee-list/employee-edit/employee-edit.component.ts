import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent {
  employee?: Employee = {
    id: '',
    name: '',
    department: '',
    email: '',
    phone: 0,
    salary: 0,
  };

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.employeeService
            .getEmployeeById(id)
            .subscribe((data) => (this.employee = data));
        }
      },
    });
  }

  saveEmployee() {
    if (this.employee !== undefined)
      this.employeeService
        .saveEmployee(this.employee.id, this.employee)
        .subscribe((data) => {
          if (data) {
            this.router.navigate(['employees']);
          }
        });
  }
}
