import React from 'react';
import './GameBoard.css'; 
import circleIcon from '../assets/circle-svgrepo-com.png'; 
import crossIcon from '../assets/cross-svgrepo-com.png'; 

function Square({ value, onSquareClick }) {
    return (
      <button className='boxes' onClick={onSquareClick}>
        {value === 'X' ? <img src={crossIcon} alt="cross" /> : value === 'O' ? <img src={circleIcon} alt="circle" /> : null}
      </button>
    );
  }

  export default Square;
  