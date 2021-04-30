import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AccountabilityComponent } from './accountability-container/accountability.component';

export const routes: Routes = [
  {
    path: '',
    component: AccountabilityComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountabilityRoutingModule {
}
