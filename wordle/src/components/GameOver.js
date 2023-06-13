import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { gameOver, setGameOver, correctWord, currAttempt, resetGame } =
    useContext(AppContext);
  return (
    <div className="gameOver">
      <h3>
        {gameOver.guessedWord
          ? "You correctly guessed the word! Great job!"
          : "You failed"}
      </h3>
      <h1>The answer is: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You won in {currAttempt.attempt} attempts</h3>
      )}
      <button onClick={resetGame}>Reset</button>
    </div>
  );
}

export default GameOver;
