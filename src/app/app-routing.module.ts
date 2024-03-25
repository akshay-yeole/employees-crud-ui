import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeEditComponent } from './employees/employee-list/employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './employees/employee-list/employee-add/employee-add.component';
import { EmployeeResolverService } from './core/services/employee-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    resolve: { resolvedEmployees: EmployeeResolverService },
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    resolve: { resolvedEmployees: EmployeeResolverService },
  },
  { path: 'employees/add-employee', component: EmployeeAddComponent },
  { path: 'employees/:id', component: EmployeeEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
