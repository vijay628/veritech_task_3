import React from 'react';
import './GameBoard.css'; 
import Square from './Square'; 
import calculateWinner from './calculateWinner';


function Board({ xIsNext, squares, onPlay, player1Symbol, player2Symbol }) {
    function handleClick(i) {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = player1Symbol;
      } else {
        nextSquares[i] = player2Symbol;
      }
      onPlay(nextSquares);
    }
  
    const winner = calculateWinner(squares);
    let status;
    if (winner === player1Symbol || winner === player2Symbol) {
      status = 'Winner: ' + winner;
    } else if (winner === 'draw') {
      status = 'Match Draw';
    } else {
      status = 'Next player: ' + (xIsNext ? player1Symbol : player2Symbol);
    }
  
    return (
      <>
        <div className='container'>
          <div className="status">{status}</div>
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
      </>
    );
  }

  export default Board;