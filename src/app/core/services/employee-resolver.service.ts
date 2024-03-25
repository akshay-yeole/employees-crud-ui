import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../models/employee.model';
import { ErrorInfo } from '../models/errorinfo.model';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeResolverService
  implements Resolve<Employee[] | ErrorInfo>
{
  constructor(private employeeService: EmployeeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | ErrorInfo> {
    return this.employeeService.getAllEmployees().pipe(
        catchError(err => of(err))
    );
  }
}
