import { useState, useEffect } from "react";

/**
 * 1. postMessage payload = {<Field>: ...}
 */
const Homepage = () => {
  const [worker, setWorker] = useState(null);
  const [res, setRes] = useState(null);

  const hanldeStartConnection = () => {
    /**
     * 1. Send the message to the worker [postMessage]
     */

    const data = {
      connectionStatus: true,
    };
    worker.postMessage({ ...data });
  };

  useEffect(() => {
    const myWorker = new Worker(
      new URL("../workers/main.worker.js", import.meta.url)
    ); //NEW SYNTAX
    setWorker(myWorker);

    return () => {
      myWorker.terminate();
    };
  }, []);

  useEffect(() => {
    if (worker) {
      worker.onmessage = function (e) {
        setRes(e.data);
      };
    }
  }, [worker]);

  return (
    <>
      <h3>WebWorker Websocket example</h3>
      <button
        id="start-connection"
        onClick={hanldeStartConnection}
        disabled={!worker || res?.disableStartButton}
      >
        Start Connection
      </button>
      <button id="stop-connection">Stop Connection</button>
      <div className="state">{JSON.stringify(res)}</div>
    </>
  );
};

export default Homepage;
