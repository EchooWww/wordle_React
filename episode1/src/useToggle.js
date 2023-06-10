import { useState } from "react";
import { set } from "react-hook-form";

export const useToggle = (initialVal = false) => {
  const [state, setState] = useState(initialVal);

  const toggle = () => {
    setState((prev) => !prev);
  };

  return [state, toggle];
};
