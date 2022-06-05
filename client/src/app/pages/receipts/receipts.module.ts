import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReceiptComponent } from './receipt/receipt.component';
import { AllReceiptsComponent } from './all-receipts/all-receipts.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';



@NgModule({
  declarations: [
    ReceiptComponent,
    AllReceiptsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardModule,
    RouterModule.forChild([
      { path: 'receipt/:id', component: ReceiptComponent },
      { path: 'all', component: AllReceiptsComponent }
    ])
  ]
})
export class ReceiptsModule { }
