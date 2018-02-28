import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs/Observable";
import * as Rx from 'rxjs/Rx';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io();
    console.log(this.socket);
    /*this.receiveMessage('new_con').subscribe((data) => {
      console.log(data)
    });*/
  }

  sendMessage(socket, msg = null) {
    this.socket.emit(socket, msg)
  }

  receiveMessage(socket): Observable<any> {
    console.log(socket, ' is listening ')
    let self = this;
    return Rx.Observable.create(function (observer) {
      self.socket.on(socket, (data) => {
        console.log(data, 'in client');
        observer.next(data);
      });
    });
  }
}
