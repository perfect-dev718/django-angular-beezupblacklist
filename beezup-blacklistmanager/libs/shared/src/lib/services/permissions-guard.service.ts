import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {PermissionsService} from './permissions/permissions.service';
import {forkJoin} from 'rxjs';
import {camelCase, find, indexOf} from 'lodash';
import {map} from 'rxjs/internal/operators';
import {AuthService} from "./auth/auth.service";


@Injectable()
export class PermissionsGuardService implements CanActivate {

  constructor(private permissions: PermissionsService,
              private auth: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    // todo change when it will be on BE
    debugger
    if (camelCase(route.url[0].path) === 'icConfigurations') {
      return true;
    }

    if (!localStorage.getItem('userToken')) {
      this.auth.logout();
      return;
    }



    let module = camelCase(route.url[0].path);
    if (module === 'userManagement') {
      module = 'settings';
    } else if (module.includes('trIcfe')) {
      module = 'investigationCenter';
    }

    return forkJoin(
      [this.permissions.getPermissionModulesFromServer(),
        this.permissions.getPermissionsByModuleFromServer(module)
      ]
    ).pipe(map((resp) => {
        const r1 = resp[0];
        if (r1 && (indexOf(r1, module) > -1)) {
          find(this.router.config, {pathMatch: 'full'}).redirectTo = this.permissions.defaultRoute;
          return true;
        }
        this.auth.logout();
        return false;
      }
    ));
  }

}
