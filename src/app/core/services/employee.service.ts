import { HttpClient, HttpContext, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorInfo } from '../models/errorinfo.model';
import { CONTENT_TYPE } from '../common/add-header.interceptor';
import { CACHEABLE } from '../common/cache.interceptor';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{
  apiUrl: string = 'https://localhost:7242/api';

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[] | ErrorInfo> {
    return this.http
      .get<Employee[]>(`${this.apiUrl}/employees`)
      .pipe(catchError((err) => this.httpErrorHanlder(err)));
  }

  getAllEmployees3(): Observable<Employee[] | ErrorInfo> {
    return this.http
      .get<Employee[]>(`${this.apiUrl}/employees`,{
        context : new HttpContext().set(CACHEABLE, true)
      })
      .pipe(catchError((err) => this.httpErrorHanlder(err)));
  }

  getAllEmployees2(): Observable<Employee[] | ErrorInfo> {
    return this.http
      .get<Employee[]>(`${this.apiUrl}/employees`,{
        context : new HttpContext().set(CONTENT_TYPE, 'application/xml')
      })
      .pipe(catchError((err) => this.httpErrorHanlder(err)));
  }

  getEmployeeById(id: string) : Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employees`, employee);
  }

  saveEmployee(id:string, employee : Employee) :Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}/employees/${id}`, employee);
  }

  deleteEmployee(id : string) : Observable<boolean>{
    return this.http.delete<boolean>(`${this.apiUrl}/employees/${id}`);
  }

  private httpErrorHanlder(error: HttpErrorResponse): Observable<ErrorInfo> {
    let err = new ErrorInfo();
    err.friendlyMessage = 'An error occurred during retreving data';
    err.message = error.message;
    err.statusCode = error.status;
    err.url = error?.url ?? '';
    return throwError(err);
  }
}
