/**
 * 1. when socket is opened send the flag to socket.
 * 2. Send the data to the client for dsiabling the start connection worker via webworker. Do the same while closing the connection.
 */

let socketInstance = null;

function createSocketInstance() {
  let socket = new WebSocket("ws://localhost:8080");

  return socket;
}

function socketManagement() {
  if (socketInstance) {
    socketInstance.onopen = function (e) {
      console.log("[open] Connection established");
      postMessage("[SOCKET] Connection established");
      socketInstance.send(JSON.stringify({ socketStatus: true }));
      postMessage({ disableStartButton: true });
    };

    socketInstance.onmessage = function (event) {
      console.log(`[message] Data received from server: ${event.data}`);
      postMessage( event.data);
    };

    socketInstance.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code}`);
        postMessage(`[SOCKET] Connection closed cleanly, code=${event.code}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
        postMessage('[SOCKET] Connection died');
      }
      postMessage({ disableStartButton: false });
    };

    socketInstance.onerror = function (error) {
      console.log(`[error] ${error.message}`);
      postMessage(`[SOCKET] ${error.message}`);
      socketInstance.close();
    };
  }
}

//SWITCH CASE: SOCKET MANAGEMENT:
// eslint-disable-next-line no-restricted-globals
self.onmessage = function (e) {
  const workerData = e.data;
  postMessage("[WORKER] Web worker onmessage established");
  switch (workerData.connectionStatus) {
    case "init":
      socketInstance = createSocketInstance();
      socketManagement();
      break;

    case "stop":
      socketInstance.close();
      break;

    default:
      socketManagement();
  }
}