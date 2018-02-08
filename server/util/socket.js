var socketObj;
var socket = {
  setSocket: function (io) {
    io.on('connection', function (socket) {
      socketObj = socket
    });
  },
  init: function (io) {
/*    io.on('connection', function (socket) {
      socket.on('testConnection', function (data) {
        socket.broadcast.emit('testConnectionServer', data);
      })
    });*/
  },
  send: function (instance, data) {
    socketObj.emit(instance, data);
  }
};

module.exports = socket;
