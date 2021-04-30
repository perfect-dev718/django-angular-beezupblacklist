import {Injectable} from '@angular/core';
import {action, observable} from 'mobx';
import {cloneDeep, forEach, includes} from 'lodash';

import {map} from 'rxjs/internal/operators';
import {ServerApiService} from "../server-api/server-api.service";
import {ACTIONS} from "../../models/constants/permissions.constants";

const BASE_URL = 'permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  @observable modulePermissions: any; // permission actions for current module
  @observable permissionModules: any; // allowed modules
  public defaultRoute: any;

  constructor(public serverApi: ServerApiService) {
  }

  @action
  getPermissionsByModuleFromServer(module) {
    return this.serverApi.get(`${BASE_URL}/${module}`)
      .pipe(map((response) => {
        this.modulePermissions = response;
        return response;
      }));
  }

  @action
  getPermissionModulesFromServer() {
    return this.serverApi.get(`${BASE_URL}/modules`)
      .pipe(map((response) => {
        this.permissionModules = response;
        this.getDefaultRouteByPermissions();
        return response;
      }));
  }

  public isModulePermitted(module: string): boolean {
    return includes(this.permissionModules, module);
  }

  @action
  public clear() {
    this.modulePermissions = null;
    this.permissionModules = null;
    this.defaultRoute = '';
  }


  getPermissionsByComponent(module, component, child = null) {
    const filteredPermissions: any = {};
    const ALL_ACTIONS = cloneDeep(ACTIONS);
    if ((!this.modulePermissions && !this.modulePermissions[module].read || !this.modulePermissions[module].read[component]) &&
      (!this.modulePermissions[module].write || !this.modulePermissions[module].write[component])) {
      return {};
    }
    const componentKeys = Object.keys(ALL_ACTIONS[module][component]);
    forEach(componentKeys, (key) => {
      filteredPermissions[key] = [];
      const actions = child ? ALL_ACTIONS[module][component][key] : ALL_ACTIONS[module][component][key];
      this.filterActions(actions, module, component, key, filteredPermissions);
    });
    return filteredPermissions;
  }


  filterActions(actionsList, module, component, key, filteredPermissions) {
    forEach(actionsList, (item) => {
      if ((this.modulePermissions[module].read &&
        this.modulePermissions[module].read[component] &&
        includes(this.modulePermissions[module].read[component], item.action || item.value.action)) ||
        (this.modulePermissions[module].write &&
          this.modulePermissions[module].write[component] &&
          includes(this.modulePermissions[module].write[component], item.action || item.value.action))
      ) {
        filteredPermissions[key].push(item);
      }
    })
  }

  public getDefaultRouteByPermissions(): string {
    if (includes(this.permissionModules, 'detectionCenter')) {
      this.defaultRoute = {url: `/detection-center/results-dashboard`};
    } else if (includes(this.permissionModules, 'configurationCenter')) {
      this.defaultRoute = {url: `/configuration-center/dashboard`};
    } else if (includes(this.permissionModules, `monitoringCenter`)) {
      this.defaultRoute = {url: `monitoring-center`};
    }  else if (includes(this.permissionModules, `settings`)) {
      this.defaultRoute = {url: `/user-management/system-users`};
    } else {
      this.defaultRoute = {url: '/login'};
    }
    return this.defaultRoute;
  }
}
