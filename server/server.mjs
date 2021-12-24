import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  const iterativeFunc = () => {
    setInterval
  }
  setInterval(() => {
    ws.send(1)
  }, 1000);
  // ws.send('something');
});