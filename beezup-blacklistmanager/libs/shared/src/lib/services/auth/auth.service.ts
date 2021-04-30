import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {map} from 'rxjs/internal/operators';
import {throttle} from 'lodash';
import {PermissionsService} from '../permissions/permissions.service';
import {toJS} from 'mobx';
import {TranslateService} from '@ngx-translate/core';
import {LoginModel} from "../../../../../../apps/beezup/src/app/login/services/login.service";

const MINUTE = 60 * 1000;
const MODULES_NAMES_MAP = {};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: any = new JwtHelperService();
  public logoutTimeout: any;
  private currentUser: string;
  private currentToken: string;
  public bindedHandleStorage: any;


  constructor(private login: LoginModel,
              private permissionsService: PermissionsService,
              private translateService: TranslateService,
              private router: Router) {
  }

  get token(): string {
    return localStorage.getItem('userToken');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = localStorage.getItem('userToken');
    if (!token) {
      return false;
    }
    // return a boolean reflecting
    // whether or not the token is expired
    const tokenExpired = this.jwtHelper.isTokenExpired(token);
    return !tokenExpired;
  }

  public refreshToken() {
    return this.login.refreshToken()
      .pipe(map((response) => {
        localStorage.setItem('userToken', response.token);
        return response.token;
      }));
  }


  public handleStorageChanges() {
    if (this.router.url.includes('login')) {
      return
    } else if (this.token && this.token !== this.currentToken) {

      const decodedToken = this.jwtHelper.decodeToken(this.token);
      if (decodedToken.sub !== this.currentUser) {
        this.updateUserDetails(decodedToken);
        this.updatePermissions();
      }
      this.currentUser = decodedToken.sub;
      this.currentToken = this.token;
    } else if (!this.token && !this.isAuthenticated()) {
      this.logout();
    }
  }

  private updatePermissions() {
    this.permissionsService.getPermissionModulesFromServer().subscribe((e) => {
    });
  }


  public logout(message?) {
    localStorage.clear();
    if (message) {
      localStorage.setItem('error-message', message);
    }
    this.currentUser = null;
    this.currentToken = null;
    clearTimeout(this.logoutTimeout);
    this.clear();
    console.log('login out')
    this.router.navigate(['/login']);
  }

  public navigateToDefaultRoute() {
    const route: any = this.permissionsService.defaultRoute;
    if (route.url === '/login') {
      const modulesList = toJS(this.permissionsService.permissionModules.url)
        .map(name => MODULES_NAMES_MAP[name])
        .join(', ');
      this.translateService.get('error_messages.no_permissions', {modulesList: modulesList}).subscribe((res: string) => {
        return res;
      });

    }

    setTimeout(() => {
      return this.router.navigate([route.url], {queryParams: route.queryParams})
    });
  }

  /**
   * Set to all user actions throttled (will work only ones per time we configured) function checkToken
   */
  public startActivityDetection() {
    const checkTokenThrottled = throttle(this.resetTimeouts.bind(this), 3 * MINUTE);

    window.addEventListener('click', checkTokenThrottled, {passive: true});
    window.addEventListener('wheel', checkTokenThrottled, {passive: true});
    window.addEventListener('mousemove', checkTokenThrottled, {passive: true});
    window.addEventListener('keypress', checkTokenThrottled, {passive: true});
    window.addEventListener('touchstart', checkTokenThrottled, {passive: true});
  }

  /**
   * If upload is in progress (will not logout until it finish) check recursively if token expired
   * or
   * sets timeout, that will perform logout after 30 minutes of inactivity
   * and refresh token if needed
   */
  private resetTimeouts() {
    clearTimeout(this.logoutTimeout);
    this.logoutTimeout = setTimeout(this.logout.bind(this), 30 * MINUTE);
    this.checkTokenExpiration(true);
  };

  private checkTokenExpiration(doLogout?) {
    const token = this.token;
    if (token) {
      const DELTA_SEC = 5 * MINUTE;
      const tokenExpiration = this.jwtHelper.getTokenExpirationDate(token).getTime();
      const currentDate = new Date().getTime();
      if (tokenExpiration < (currentDate + DELTA_SEC)) {
        this.refreshToken()
          .subscribe(() => {
            },
            () => {
              if (doLogout) {
                this.logout();
              }
            });
      }
    } else if (doLogout) {
      this.logout();
    }
  }

  clear() {
    this.permissionsService.clear();
  }

  public updateUserDetails(decodedToken: any) {
    const userToken = decodedToken.displayName.split(' ');
    const userDetails = {
      firstName: userToken[0],
      lastName: userToken[1],
      username: decodedToken.sub
    };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }
}
