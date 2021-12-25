import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    const rcvData = JSON.parse(data.toString());
    if (rcvData.socketStatus) {
      setInterval(() => {
        ws.send(1)
      }, 1000);
    }
  });


  // ws.send('something');
});