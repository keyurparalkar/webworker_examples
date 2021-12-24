// import axios from "axios";
// eslint-disable-next-line no-restricted-globals
self.onmessage = function(e){
    console.log("Worker object present ", e);
    // const res = e.data[0] * e.data[1];
    postMessage({isLoading: true, data: null});
    // const _ = (async () => {
    //     const temp = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    //     const { data } = await temp;
    //     setTimeout(() => {
    //         postMessage({isLoading: false, data});
    //     }, 2000);
    // })();
    let socket = new WebSocket("ws://localhost:8080");

socket.onopen = function(e) {
  console.log("[open] Connection established");
  console.log("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

socket.onerror = function(error) {
  console.log(`[error] ${error.message}`);
};
}