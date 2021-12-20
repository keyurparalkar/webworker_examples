import { useState, useEffect } from "react";

const Multiplication = () => {
  const [res, setRes] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [worker, setWorker] = useState(null);

  /***
   * Create worker thread when mounts = DONE
   * Destory the worker thread when unmounts = DONE
   * Pass the value to the worker thread = DONE
   * Recieve the value from worker thread = DONE
   */
  useEffect(() => {
    const myWorker =  new Worker(new URL("../workers/main.worker.js", import.meta.url)); //NEW SYNTAX
    setWorker(myWorker);

    return () => {
      myWorker.terminate()
    };

  }, [])

  const onNum1Change = (e) => setNum1(e.target.value);
  const onNum2Change = (e) => setNum2(e.target.value);
  const multiply = (e) => {
    e.preventDefault();
    worker.postMessage([num1, num2]);
    worker.onmessage = (e) => {
      setRes(e.data);
    }
  };

  return (
    <>
      <h3>Multiply two numbers</h3>
      <form className="operands">
        <div className="op1">
          <label htmlFor="num1">Operand 1:</label>
          <input type="number" value={num1} id="num1" onChange={onNum1Change} />
        </div>
        <div className="op2">
          <label htmlFor="num2">Operand 2:</label>
          <input type="number" value={num2} id="num2" onChange={onNum2Change} />
        </div>
        <span id="res"> Result is: {res} </span>
        <button onClick={multiply}>Multiply</button>
      </form>
    </>
  );
};

export default Multiplication;
