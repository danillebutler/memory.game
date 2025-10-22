import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";
import Confetti from "react-confetti";

const CARD_EMOJIS = ["🍎","🍌","🍇","🍓","🍒","🍍","🥑","🍉"];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const shuffleCards = () => {
    const duplicated = [...CARD_EMOJIS].slice(0, 8);
    const shuffled = [...duplicated, ...duplicated]
      .map((emoji) => ({ emoji, id: Math.random(), matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setMatches(0);
    setShowConfetti(false);
  };

  useEffect(() => {
    shuffleCards();

  }, []);

  const handleChoice = (card) => {
    if (disabled) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.emoji === choiceTwo.emoji) {
        // match
        setCards(prev =>
          prev.map(c => {
            if (c.emoji === choiceOne.emoji) return { ...c, matched: true };
            return c;
          })
        );
        setMatches(prev => prev + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1600);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 900);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  const isGameWon = matches === CARD_EMOJIS.length;

  return (
    <div className="app">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      <header className="header">
        <h1>Memory Game</h1>
        <div className="controls">
          <button onClick={shuffleCards}>New Game</button>
          <div className="stats">
            <span>Turns: {turns}</span>
            <span>Matches: {matches}</span>
          </div>
        </div>
      </header>

      <main className="main">
        <Board
          cards={cards}
          handleChoice={handleChoice}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          disabled={disabled}
        />
        {isGameWon && (
          <div className="win">
            <h2>You won! 🎉</h2>
            <p>Turns: {turns}</p>
            <button onClick={shuffleCards}>Play again</button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p> Developed by <a href="https://www.danievtler.com/" target="_blank" rel="noopener noreferrer">Danille Butler</a></p>
      </footer>
    </div>
  );
}

export default App;
