import './App.css';
import { useState } from 'react';

const initialBoard = Array(3).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [isXturn, setIsXturn] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXturn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXturn(!isXturn);
  };

  const renderSquare = (index) => (
    <button className='square' onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  let status;
  if(winner) {
    status = `Winner: ${winner}`;
  } else if (board.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${isXturn ? 'X' : 'O'}`;
  }
  
  return (
    <div className='game'>
      <h1>Tic-Tac-Toe</h1>
      <div className='status'>{status}</div>
      <div className='board'>
        {[0, 1, 2].map((value, index) => (
          <div key={index} className='board-row'>
            {renderSquare(value * 3)}
            {renderSquare(value * 3 + 1)}
            {renderSquare(value * 3 + 2)}
          </div>
        ))}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  
  return null;
}



export default App;
