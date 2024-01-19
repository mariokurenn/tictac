import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Function to create a new Tic Tac Toe game
const createGame = async (userId, username) => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch('https://tictactoe.aboutdream.io/games/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          first_player: {
            id: userId,
            username: username,
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create a new game');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating a new game:', error);
      throw error;
    }
  };

const TicTacToeGame = ({ userId }) => {
  const [gameData, setGameData] = useState({
    id: null,
    board: [],
    winner: null,
    status: 'open',
  });

  const [turn, setTurn] = useState(1);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData.id) {
      return;
    }

    const fetchData = async () => {
      try {
        const data = await createGame(userId, username);
        setGameData(data);
      } catch (error) {
        // Handle the error, e.g., display a message to the user
        console.error('Error creating a new game:', error);
      }
    };

    fetchData();
  }, [userId, username, gameData.id]);
  

  const handleClick = (cellIndex) => {
    if (gameData.winner || gameData.status !== 'open') {
      return;
    }

    const cell = gameData.board[cellIndex];

    if (cell === 0) {
      setGameData({
        ...gameData,
        board: [...gameData.board.slice(0, cellIndex), turn, ...gameData.board.slice(cellIndex + 1)],
        turn: turn === 1 ? 2 : 1,
      });

      checkForWinner();
    }
  };

  const checkForWinner = () => {
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

    for (const line of lines) {
      const [a, b, c] = line;

      if (gameData.board[a] === gameData.board[b] && gameData.board[b] === gameData.board[c] && gameData.board[a] !== 0) {
        setGameData({
          ...gameData,
          winner: {
            id: gameData.board[a] === 1 ? userId : userId === 1 ? 2 : userId,
            username: gameData.board[a] === 1 ? username : gameData.board[a] === 2 ? userId : username,
          },
          status: 'finished',
        });

        return;
      }
    }

    if (gameData.board.every((cell) => cell !== 0)) {
      setGameData({
        ...gameData,
        status: 'finished',
      });
    }
  };

  const handleRestart = () => {
    setGameData({
      id: null,
      board: [],
      winner: null,
    });
  };

  return (
    <div>
      <h1>Tic Tac Toe Game</h1>

      {gameData.status === 'finished' && (
        <div>
          <h2>Game finished</h2>
          <p>Winner: {gameData.winner.username}</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}

      {gameData.status !== 'finished' && (
        <div>
          <table>
            <tbody>
              {gameData.board.map((cell, rowIndex) => (
                <tr key={rowIndex}>
                  {gameData.board[rowIndex].map((cell, colIndex) => (
                    <td key={colIndex} onClick={() => handleClick(rowIndex * 3 + colIndex)}>
                      {cell === 0 ? '-' : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
};


  export default TicTacToeGame;