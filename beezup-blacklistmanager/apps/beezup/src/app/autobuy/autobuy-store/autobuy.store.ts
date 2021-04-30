import {Injectable} from '@angular/core';
import {action, observable} from "mobx";
import {AutoBuyModel, mockOrder, OrderInfo} from "../constants/autobuy.constant";
import {WebSocketService} from "../../../../../../libs/shared/src/lib/services/web-socket/web-socket.service";
import {Observable} from "rxjs";

const NC_URL_SOCKET = 'orders';

@Injectable({providedIn: "root"})
export class AutobuyStore {
  @observable currentOrder: OrderInfo = mockOrder;
  @observable orders: AutoBuyModel[];

  public socketService: WebSocketService;
  constructor() {
  }

  // @action
  // public getRowsData(skip, limit, filter = {}): Observable<Notification[]> {
  //   this.getOrdersMessages();
  //   return this.notificationCenterModel.getRowsData({skip, limit}, filter);
  // }
  //
  // public getSocketStatus() {
  //   return this.socketService.failedConnectToSocket;
  // }
  //
  // /**
  //  * send message to server, if the socket is not connected it will be sent
  //  * as soon as the connection becomes available thanks to QueueingSubject
  //  */
  // public getOrdersMessages() {
  //     const message: INotificationsMessage = {type: 'Notifications'};
  //     const filtersFromLS: INotificationFilters = this.localStorageService.getItem('notifications-center');
  //     if (filtersFromLS) {
  //       const date = new Date();
  //       if (filtersFromLS.date) {
  //         switch (filtersFromLS.date.selectedOption) {
  //           case 'last_24':
  //             date.setDate(date.getDate() - 1);
  //             set(message, 'notificationFilter.date.after', +date);
  //             break;
  //           case 'custom':
  //             date.setDate(date.getDate() - filtersFromLS.date.lastTimePeriod);
  //             set(message, 'notificationFilter.date.after', +date);
  //             break;
  //         }
  //       }
  //       set(message, 'notificationFilter.user', filtersFromLS.user);
  //     } else {
  //       const date = new Date();
  //       date.setDate(date.getDate() - 1);
  //       message.notificationFilter = {
  //         user: user,
  //         date: {
  //           after: +date
  //         }
  //       };
  //     }
  //
  //     this.socketService.send(message);
  //     return this.socketService.stream;
  // }
  //
  // public closeSocket(closeOnDemand= false) {
  //   this.socketService.disconnect(closeOnDemand);
  // }
  //
  // public openOrdersStream() {
  //   this.socketService = new WebSocketService();
  //   return this.socketService.connect(NC_URL_SOCKET, '/');
  // }


}
