import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { OrdersManagementComponent } from './orders-management-container/orders-management.component';

export const routes: Routes = [
  {
    path: '',
    component: OrdersManagementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersManagementRoutingModule {
}
