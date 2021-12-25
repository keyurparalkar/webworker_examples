/**
 * 1. when socket is opened send the flag to socket.
 * 2. Send the data to the client for dsiabling the start connection worker via webworker. Do the same while closing the connection.
 */

// eslint-disable-next-line no-restricted-globals
self.onmessage = function (e) {
  console.log("Worker object present ", e);
  let socket = new WebSocket("ws://localhost:8080");

  //Started Socket code =====================================================
  socket.onopen = function (e) {
    console.log("[open] Connection established");
    socket.send({socketStatus: true});
    postMessage({disableStartButton: true});
  };

  socket.onmessage = function (event) {
    console.log(`[message] Data received from server: ${event.data}`);
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[close] Connection died');
    }
  };

  socket.onerror = function (error) {
    console.log(`[error] ${error.message}`);
    socket.close();
    console.log("Connection closed due to error");
  };
  //Socket code ends here =====================================================
}