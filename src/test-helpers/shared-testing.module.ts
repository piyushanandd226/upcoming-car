import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    RouterTestingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientTestingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    RouterTestingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientTestingModule,
    BrowserAnimationsModule,
    BsDatepickerModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedTestingModule {}
