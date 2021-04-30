import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { BlackListComponent } from './black-list-container/black-list.component';

export const routes: Routes = [
  {
    path: '',
    component: BlackListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlackListRoutingModule {
}
