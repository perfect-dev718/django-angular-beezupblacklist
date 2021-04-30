import {Injectable} from '@angular/core';
import {action, observable} from 'mobx-angular';
import {forEach, lowerCase, remove} from 'lodash';
import {MessageService} from 'primeng';


const MESSAGE_TYPE = {
  SUCCESS: {name: 'success', short: 'success', delay: 5000},
  ERROR: {name: 'error', short: 'error', delay: 9999999},
  WARNING: {name: 'warn', short: 'warning', delay: 9999999}
};

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  @observable delay: number;
  private messageType: string;
  public indexId: number = 0;

  constructor(private messageService: MessageService) {
  }

  @action
  setMessages(message) {
    const messageTypes = Object.keys(MESSAGE_TYPE);
    forEach(messageTypes, (type) => {
      if (message[lowerCase(type)]) {
        this.messageType = MESSAGE_TYPE[type].name;
        const messageShort = MESSAGE_TYPE[type].short;
        if (this.checkIfShowed(message[messageShort])) return;
        this.delay = MESSAGE_TYPE[type].delay;
        this.messageService.add({
          life: this.delay,
          severity: this.messageType,
          detail: message[messageShort],
          id: this.indexId
        });
        this.indexId += 1;
      }
    });
  }

  public clearAllToasters() {
    this.messageService.clear();
  }

  private checkIfShowed(text) {
    let result = false;
    Array.from(document.getElementsByClassName('ui-toast-message-text-content'))
      .forEach((item: any) => {
        if (item.innerText === text) result = true;
      });
    return result;
  }
}
