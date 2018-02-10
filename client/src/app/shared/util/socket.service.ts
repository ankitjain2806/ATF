import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs/Observable";
import * as Rx from 'rxjs/Rx';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io();
  }

  // Consume: on gist saved
  receiveSocket(socket): Observable<any> {
    let self = this;
    return Rx.Observable.create(function (observer) {
      self.socket.on(socket, (data) => {
        observer.next(data);
      });
    });
  }
}
