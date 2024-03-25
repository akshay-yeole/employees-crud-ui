import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeEditComponent } from './employees/employee-list/employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './employees/employee-list/employee-add/employee-add.component';
import { FormsModule } from '@angular/forms';
import { AddHeaderInterceptor } from './core/common/add-header.interceptor';
import { LogResponseInterceptor } from './core/common/log-response.interceptor';
import { CacheInterceptor } from './core/common/cache.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    EmployeeEditComponent,
    EmployeeAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS, useClass : AddHeaderInterceptor,multi:true
    },
    {
      provide : HTTP_INTERCEPTORS, useClass : LogResponseInterceptor,multi:true
    },
    {
      provide : HTTP_INTERCEPTORS, useClass : CacheInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
