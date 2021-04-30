import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersManagementRoutingModule } from './orders-management-routing.module';
import { OrdersManagementComponent } from './orders-management-container/orders-management.component';



@NgModule({
  declarations: [OrdersManagementComponent],
  imports: [
    CommonModule,
    OrdersManagementRoutingModule
  ],
  exports: [OrdersManagementComponent]
})
export class OrdersManagementModule { }
