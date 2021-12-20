// eslint-disable-next-line no-restricted-globals
self.onmessage = function(e){
    console.log("Worker object present ", e);
    const res = e.data[0] * e.data[1];

    postMessage(res);
}