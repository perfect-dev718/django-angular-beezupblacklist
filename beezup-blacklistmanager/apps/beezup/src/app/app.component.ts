import { Component, ViewEncapsulation } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../../../libs/shared/src/lib/services/auth/auth.service";
import {PermissionsService} from "../../../../libs/shared/src/lib/services/permissions/permissions.service";
import {reaction} from "mobx";
import {isUndefined} from "lodash";
import {Subscription} from "rxjs";

@Component({
  selector: 'beezup-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private unsubRouter: Subscription;
  public showMenu: boolean;
  constructor(private translate: TranslateService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private permissionsService: PermissionsService,
              private auth: AuthService,) {
    translate.addLangs(['en']);
    translate.setDefaultLang('en');
  }

  /**
   * If we don't have permissions we call it and run events Handlers
   */
  ngOnInit(): void {
    this.eventHandler();
    this.removeTokenOnFirstInit();
    // this.auth.handleStorageChanges();
  }

  /**
   * Remove token from localStorage on first app initialization
   */
  private removeTokenOnFirstInit() {
    if (!this.auth.isAuthenticated()) {
      localStorage.removeItem('userToken');
    }
  }

  private eventHandler() {
    /**
     * check if we re logged in to show menu
     */
    this.unsubRouter = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !event.url.includes('login');
      }
    });
    /**
     * When we get the Permissions we're checking if investigation center is includes
     * and we set the routerUrl to the layout store
     */
    reaction(() => this.permissionsService.permissionModules, () => {
      if (isUndefined(this.auth.logoutTimeout)) {
        this.auth.startActivityDetection();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.unsubRouter) {
      this.unsubRouter.unsubscribe();
    }
  }


}
