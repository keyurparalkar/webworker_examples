/**
 * 1. when socket is opened send the flag to socket.
 * 2. Send the data to the client for dsiabling the start connection worker via webworker. Do the same while closing the connection.
 */

let socketInstance = null;

function createInstance() {
  let socket = new WebSocket("ws://localhost:8080");

  return socket;
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = function (e) {
  console.log("Worker object present ", e);
  // let socketInstances = [];

  //Started Socket code =====================================================
  // let socket = new WebSocket("ws://localhost:8080");
  // postMessage({ socket: JSON.stringify(socket) });
  // socketInstances.push(socket);
  if(e.data.connectionStatus === "init"){
    socketInstance = createInstance();
  }

  if(e.data.connectionStatus === "stop") {
    socketInstance.close();
  }

  if(socketInstance){
    socketInstance.onopen = function (e) {
      console.log("[open] Connection established");
      socketInstance.send(JSON.stringify({ socketStatus: true }));
      postMessage({ disableStartButton: true});
    };

    socketInstance.onmessage = function (event) {
      console.log(`[message] Data received from server: ${event.data}`);
    };

    socketInstance.onclose = function (event) {
      console.log("ON CLOSE = ", event);
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
      }
    };

    socketInstance.onerror = function (error) {
      console.log(`[error] ${error.message}`);
      socketInstance.close();
      console.log("Connection closed due to error");
    };
    //Socket code ends here =====================================================
  }


  // const workerData = e.data;
  // // console.log("SOCKET INSTANCESs = ", socketInstances);
  // if (workerData?.connectionStatus === false) {
  //   socketInstances[0].close();
  //   // postMessage({ disableStopButton: true });
  // }
}