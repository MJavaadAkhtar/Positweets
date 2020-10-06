const express = require('express')
const app = express()
const port = 3000

const webSocketsServerPort = 5000;
const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort,() => {
    console.log(`Example app listening`)
  })
const wsServer = new webSocketServer({
  httpServer: server
});


var clients = {};
var clientList = [];
var datalst = [];



wsServer.on('request', function(request) {
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      msg = JSON.parse(message.utf8Data);
      switch (msg.msgType){
        case 'connection':
          if (!(msg.uname in clients)) {
            clients[msg.uname]=connection;
            clientList.push(msg.uname);
          }
          break;
        case 'msg':
          if (!(msg.uname in clients)) {
            clients[msg.uname]=connection;
            clientList.push(msg.uname);
          }
          const strData= "<div style='padding-bottom:3px;'> <p style='font-weight: 900;display: contents;'>" + msg.uname + "</p>" + ':' + msg.content + '\n'+"</div>"
    
          let dataJson ={
            type:'UserMsg',
            data: strData
          }
          for(let username of clientList){ 
            var ws = clients[username];
            console.log(username,dataJson);
            ws.send(JSON.stringify(dataJson)); 
          }
          break;
      }
    }
  }
  );
});

// function noop() {}

// function heartbeat() {
//   this.isAlive = true;
// }

// const interval = setInterval(function ping() {
//   clients.forEach(function each(ws) {
//     if (ws.isAlive === false) return ws.terminate();
//     ws.isAlive = false;
//     ws.ping(noop);
//   });
// }, 30000);

// wss.on('close', function close() {
//   clearInterval(interval);
// });