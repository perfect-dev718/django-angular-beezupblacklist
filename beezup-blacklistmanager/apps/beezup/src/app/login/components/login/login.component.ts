import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../classes/user';
import {IReactionDisposer, reaction} from 'mobx';
import {LoginStoreService} from '../../stores/login-store.service';
import {ToasterService} from "../../../../../../../libs/shared/src/lib/services/toaster/toaster.service";


@Component({
  selector: 'tr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: User = {
    username: '',
    password: ''
  };
  public errorMessage: string;
  private errorMessageReaction: IReactionDisposer;

  constructor(private loginStoreService: LoginStoreService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.expiredMessage();
    this.errorMessageReaction = reaction(() => this.loginStoreService.errorMessage,
      () => {
        if (this.loginStoreService.errorMessage) {
          this.errorMessage = this.loginStoreService.errorMessage;
        }
      })
  }

  private expiredMessage() {
    const error = localStorage.getItem('error-message');
    if (error) {
      this.toasterService.setMessages({
        error
      });
      localStorage.removeItem('error-message');
    }
  }

  login() {
    this.errorMessage = null;
    this.loginStoreService.errorMessage = null;
    this.loginStoreService.login(this.user);
  }

  ngOnDestroy() {
    this.errorMessage = null;
    this.loginStoreService.errorMessage = null;
    this.errorMessageReaction();
  }

}
