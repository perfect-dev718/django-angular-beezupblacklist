import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {observable} from 'mobx-angular';
import {LoginModel} from "../services/login.service";
import {AuthService} from "../../../../../../libs/shared/src/lib/services/auth/auth.service";
import {ToasterService} from "../../../../../../libs/shared/src/lib/services/toaster/toaster.service";
import {PermissionsService} from "../../../../../../libs/shared/src/lib/services/permissions/permissions.service";
import {JwtHelperService} from '@auth0/angular-jwt';



@Injectable()
export class LoginStoreService {

  private jwtHelper: any = new JwtHelperService();
  @observable errorMessage;

  constructor(private loginModel: LoginModel,
              private permissionsService: PermissionsService,
              private toasterService: ToasterService,
              private router: Router,
              private auth: AuthService) {
  }

  login(user) {
    return this.loginModel.login(user).subscribe((response: any) => {
      const jwtDecode = this.jwtHelper.decodeToken(response.token);
      localStorage.setItem('userToken', response.token);
      this.toasterService.clearAllToasters();
      if (response.firstLogin && jwtDecode.sub === 'admin') {
        this.router.navigate(['/admin-info']);
        return;
      }

      this.errorMessage = this.getPermissionsAndDefaultRoute();
      this.auth.updateUserDetails(jwtDecode);
    }, (e) => {
      if ((e.error && e.error.inline)) {
        this.errorMessage = e.error.inline;
        return;
      }
    });
  }

  public logout(message?) {
    this.auth.logout(message);
  }

  public getPermissionsAndDefaultRoute() {
    this.permissionsService.getPermissionModulesFromServer()
      .subscribe(() => {
        this.auth.navigateToDefaultRoute();
      });
  }

  updateAdminInfo(admin) {
    const userDetails = {
      firstName: admin.firstName,
      lastName: admin.lastName,
      username: admin.username
    };
    this.loginModel.updateAdminInfo(admin).subscribe(() => {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      this.router.navigate([`/user-management/system-users`]);
    }, (e) => {
      const message = {
        error: e.error.MESSAGE
      };
      this.toasterService.setMessages(message);
    });
  }
}
