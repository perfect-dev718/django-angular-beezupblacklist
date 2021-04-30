import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AutobuyContainerComponent } from './autobuy-container/autobuy-container.component';
import {OrderInfoComponent} from "./components/order-info/order-info.component";
import {AutobuyComponent} from "./components/autobuy-table/autobuy.component";

export const routes: Routes = [
  {
    path: '',
    component: AutobuyContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'order-info'
      },
      {
        path: 'order-info',
        component: AutobuyComponent
      },
      {
        path: 'order-info/:orderId',
        component: OrderInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutobuyRoutingModule {
}
