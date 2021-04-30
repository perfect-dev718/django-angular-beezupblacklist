import {Injectable} from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {environment} from '@env/environment';
import {observable} from "mobx";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class WebSocketService {

  readonly stayAliveInterval: number;
  readonly socketUrl: string;

  private baseUrl: string;
  private urlWithToken: string;
  private reconnectAttempts: number;
  private killStayAliveInterval;
  private _stream: WebSocketSubject<{}>;
  private replayStream = new ReplaySubject(1);
  private message = new Subject();
  private messageStream: Observable<{}>;
  private closeOnDemand = false;

  public failedConnectToSocket: boolean;
  public lastMsgSent: string;
  public lastMsgReceived: string;
  private currentUrl: string;
  @observable reconnect;

  constructor(private auth: AuthService) {
    this.socketUrl = environment.SOCKET_URL;
    this.baseUrl = '';
    this.stayAliveInterval = 40000;
    this.reconnectAttempts = 10;
    this.failedConnectToSocket = false;
    this.messageStream = this.message.asObservable();
  }

  /**
   * receive the source url and concat it with the base url and with the token.
   * @param {string} url
   */
  private async generateUrl(url?: string, reconnect?) {
    if (url) {
      this.currentUrl = url;
    }
    return this.urlWithToken = `${this.socketUrl.replace('http', 'ws')}${this.baseUrl}${this.currentUrl}?jwt=${this.auth.token}`;
  }

  /**
   * in case of connection established successfully print to console success message from backend
   */
  private onSuccess(msg) {
    this.lastMsgReceived = msg;
    this.reconnectAttempts = 10;
    this.closeOnDemand = false;
  }

  /**
   * initilaize socket connection and assign observable to stream field
   * in case of connection is fails try to reconnect, after number of {reconnectAttempts}
   * stop try to reconnect and set the failedConnectToSocket field to true
   */

  async establishConnection(reconnect = false) {
    this.generateUrl(null, reconnect).then((url) => {
      this._stream = webSocket(url);
      this.replayStream.next(this._stream);
      this._stream.subscribe(
        (msg) => {
          this.onSuccess(msg);
          this.message.next(msg);
        },
        (err) => {
          if (!this.closeOnDemand) {
            this.reconnect = false;
            if (this.reconnectAttempts) {
              this.reconnectAttempts--;
              this.establishConnection(true);
              this.reconnect = true;
            } else {
              clearInterval(this.killStayAliveInterval);
              this._stream.unsubscribe();
              this.closeOnDemand = false;
              this.failedConnectToSocket = true;
            }
          }
        },
        () => {
          this.message.complete();
        });
    });
  }

  get url(): string {
    return this.urlWithToken;
  }

  get stream() {
    return this.messageStream;
  }

  public isCloseOnDemand(): boolean {
    return this.closeOnDemand;
  }

  /**
   * @param url
   * Using share() causes a single websocket to be created when the first observer subscribes.
   * This socket is shared with subsequent observers and closed when the observer count falls to zero.
   * @param baseUrl
   */

  public async connect(url: string, baseUrl?: string) {
    this.currentUrl = url;
    if (baseUrl) {
      this.baseUrl = baseUrl;
    }
    this.establishConnection();
    this.killStayAliveInterval = setInterval(() => {
      this.healthCheck();
    }, this.stayAliveInterval);
  }

  public disconnect(closeOnDemand = false): void {
    this.closeOnDemand = closeOnDemand;
    clearInterval(this.killStayAliveInterval);
    if (this._stream) {
      this._stream.unsubscribe();
    }
  }

  /**
   * send ping to server, if the socket was disconnected it will reconnect automatically
   */
  public healthCheck(): void {
    this._stream.next({
      'type': 'Ping'
    });
  }

  /**
   * If the websocket is not connected then the QueueingSubject will ensure that messages are
   * queued and delivered when the websocket reconnects.
   * A regular Subject can be used to discard messages sent when the websocket is disconnected.
   * @param msg
   */
  public send(msg): void {
    this.replayStream.subscribe(stream => {
      this.lastMsgSent = msg;
      this._stream.next(msg);
    });
  }

}
