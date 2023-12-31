import React from "react";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";

export function Letter({ letterPos, attemptVal }) {
  const {
    board,
    setBoard,
    correctWord,
    currAttempt,
    disabledLetters,
    setDisabledLetters,
  } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const correct = correctWord[letterPos] === letter;
  const almost = correctWord.includes(letter) && !correct;
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
