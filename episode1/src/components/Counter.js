import { useCounter } from "../useCounter";
export const Counter = () => {
  const { number, increase, decrease, restart } = useCounter();
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <button onClick={restart}>Restart</button>
    </div>
  );
};
