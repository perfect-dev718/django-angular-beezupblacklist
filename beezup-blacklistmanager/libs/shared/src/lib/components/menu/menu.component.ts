import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {findIndex} from 'lodash';
import { MENU } from './constants/menu.constant';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../services/auth/auth.service";

export interface MenuItem {
  name: string;
  tooltip?: string;
  icon?: IconDefinition;
  url?: string;
  action?: string;
}
@Component({
  selector: 'beezup-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public faBars = faBars;
  public menu: MenuItem[] = MENU;
  public selectedItem: number;
  private showMenu: boolean;
  @Output() menuState: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.setActiveRoute();
  }

  private setActiveRoute(): number {
    const index = findIndex(this.menu, {url: this.router.url.substring(10)});
    return this.selectedItem = index;
  }

  public selectItem(item: MenuItem,index?: number): void {
    this.selectedItem = index;
    if (item.url) {
      this.router.navigate([`${item?.url}`]);
    }
    if (item.action === 'logout') this.auth.logout();
  }

  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
    this.menuState.emit(this.showMenu);
  }

}
