import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/core/models/employee.model';
import { ErrorInfo } from 'src/app/core/models/errorinfo.model';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private route : ActivatedRoute) {}
  
  ngOnInit(): void {
    this.getAllEmployeesUsingResolver();
    //this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (res: Employee[] | ErrorInfo) => {
        this.employees = <Employee[]>res;
      },
      (err: ErrorInfo) => {
        console.log(err.friendlyMessage);
      }
    );
  }
  
  getAllEmployeesUsingResolver(){
    let resolvedData : Employee[] | ErrorInfo=this.route.snapshot.data['resolvedEmployees'];
    if(resolvedData instanceof ErrorInfo){
      console.log(`Error ${resolvedData.friendlyMessage}`);
    }else{
      this.employees =resolvedData;
    }
  }

  deleteEmployee(){}

}
