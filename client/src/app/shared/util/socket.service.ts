import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io

  // Constructor with an injection of ToastService
  constructor() {
    this.socket = io();
  }

  // Consume: on gist saved
  receiveSocket(socket){
    var self = this;
    this.socket.on(socket, (data) => {
      console.log(data)
    });
  }

  // Consume on gist updated
  consumeEvenOnGistUpdated(){
    var self = this;
    this.socket.on('gistUpdated', () => {

    });
  }
}
