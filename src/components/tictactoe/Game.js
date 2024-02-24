import React, { useState } from 'react';
import './GameBoard.css';
import Board from './Board'; 
import calculateWinner from './calculateWinner';
import drawImg from '../assets/Purple Simple Congratulations Card.png'
import congratulationGifUrl from '../assets/congrats.png'

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [xWins, setXWins] = useState(0);
    const [oWins, setOWins] = useState(0);
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [player1Symbol, setPlayer1Symbol] = useState('');
    const [player2Symbol, setPlayer2Symbol] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(null);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
  
    
    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
  
      const winner = calculateWinner(nextSquares);
    if (winner === player1Symbol || winner === player2Symbol) {
      setWinner(winner);
      if (winner === player1Symbol) {
        if (player1Symbol === 'O') {
          setOWins(oWins + 1);
        } else {
          setXWins(xWins + 1);
        }
      } else {
        if (player2Symbol === 'O') {
          setOWins(oWins + 1);
        } else {
          setXWins(xWins + 1);
        }
      }
    }
    else{
        setDraw(winner);
      }
    }
  
    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
      setWinner(null);
    }
  
    function handleNameInput(e) {
      if (e.target.name === 'player1') {
        setPlayer1Name(e.target.value);
      } else {
        setPlayer2Name(e.target.value);
      }
    }
  
    function handleSymbolChange(e) {
      if (!gameStarted) {
        const selectedSymbol = e.target.value;
        const isPlayer1 = e.target.name === 'player1Symbol';
    
        if (isPlayer1) {
          setPlayer1Symbol(selectedSymbol);
          setPlayer2Symbol(selectedSymbol === 'X' ? 'O' : 'X');
        } else {
          setPlayer2Symbol(selectedSymbol);
          setPlayer1Symbol(selectedSymbol === 'X' ? 'O' : 'X');
        }
      }
    }
    
  
    function startGame() {
      if (player1Name !== '' && player2Name !== '' && player1Symbol !== '' && player2Symbol !== '') {
        setPlayer1Name(player1Name);
        setPlayer2Name(player2Name);
        setGameStarted(true);
      } else {
        alert('Please fill in all fields before starting the game.');
      }
    }
  
    function resetBoard(){
       // Reset state variables related to the game board
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setWinner(null);
    setDraw(null);
    }
  
    const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });
  
    return (
      <div className="game">
        <div className='player-history'>
          <div className="game-info">
            <div>
              <label>Player 1 Name:</label>
              <input type="text" name="player1" value={player1Name} onChange={handleNameInput} />
              <label>Symbol:{player1Symbol}</label>
              {!gameStarted && (
              <select name="player1Symbol" value={player1Symbol} onChange={handleSymbolChange}>
                <option value="">Select Symbol</option>
                <option value="X">X</option>
                <option value="O">O</option>
              </select>
              )}
            </div>
            <div>
              <label>Player 2 Name:</label>
              <input type="text" name="player2" value={player2Name} onChange={handleNameInput} />
              <label>Symbol:{player2Symbol}</label>
             {!gameStarted &&(
              <select name="player2Symbol" value={player2Symbol} onChange={handleSymbolChange}>
                <option value="">Select Symbol</option>
                {player1Symbol === 'X' ? <option value="O">O</option> : <option value="X">X</option>}
              </select>
             )} 
            </div>
            <button style={{ marginTop:'10px'}} className='btn' onClick={startGame}>Start Game</button>
          </div>

            {gameStarted && player1Name && player2Name && player1Symbol && player2Symbol && (
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} player1Symbol={player1Symbol} player2Symbol={player2Symbol} />
          </div>
        )}
  
          {gameStarted && player1Name && player2Name && player1Symbol && player2Symbol && (
            <div>
              <div>Wins:</div>
              <div>{player1Name} ({player1Symbol}): {player1Symbol === 'X' ? xWins : oWins}</div>
              <div>{player2Name} ({player2Symbol}): {player2Symbol === 'O' ? oWins : xWins}</div>
              <ol>{moves}</ol>
            </div>
          )}
        </div>
  
      
        {winner && (
          <div className="congratulation">
            <img src={congratulationGifUrl} alt="Congratulations" />
            <button className='reset' onClick={resetBoard}>Reset Board</button>
          </div>
        )}
        {draw && (
          <div className="congratulation">
            <img src={drawImg} alt="Congratulations" />
            <button className='reset' onClick={resetBoard}>Reset Board</button>
          </div>
        )}
      </div>
    );
  }