import { useState } from "react";
export const useCounter = () => {
  const [number, setNumber] = useState(0);
  const increase = () => {
    setNumber(number + 1);
  };
  const decrease = () => {
    setNumber(number - 1);
  };
  const restart = () => {
    setNumber(0);
  };
  return { number, increase, decrease, restart };
};
