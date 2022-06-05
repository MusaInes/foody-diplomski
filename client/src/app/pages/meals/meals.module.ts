import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyMealsComponent } from './my-meals/my-meals.component';
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    MyMealsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: MyMealsComponent },
    ])
  ]
})
export class MealsModule { }
