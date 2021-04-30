import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { RepricerComponent } from './repricer-container/repricer.component';

export const routes: Routes = [
  {
    path: '',
    component: RepricerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepricerRoutingModule {
}
