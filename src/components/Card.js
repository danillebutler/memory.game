import React from "react";
import "./Card.css";

export default function Card({ card, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="front">{card.emoji}</div>
        <div className="back" onClick={handleClick}></div>
      </div>
    </div>
  );
}

