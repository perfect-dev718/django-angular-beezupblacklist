import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ControlCenterComponent } from './control-center-container/control-center.component';

export const routes: Routes = [
  {
    path: '',
    component: ControlCenterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlCenterRoutingModule {
}
