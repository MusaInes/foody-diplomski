import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild([
      { path: '', component: AdminComponent },
    ])
  ]
})
export class AdminModule { }
