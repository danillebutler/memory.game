import React from "react";
import Card from "./Card";
import "./Board.css";

const Board = ({ cards, handleChoice, choiceOne, choiceTwo, disabled }) => {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default Board;
