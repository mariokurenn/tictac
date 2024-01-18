import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import AuthTabs from './AuthTabs';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import TicTacToeGame from './TicTacToeGame'; // Import the TicTacToeGame component

const Dashboard = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showGame, setShowGame] = useState(false); // State to toggle showing the TicTacToeGame

  useEffect(() => {
    // Provjeri je li korisnik ulogiran
    const token = localStorage.getItem('token');
    if (!token) {
      // Ako nije, preusmjeri ga na stranicu za prijavu ili AuthTabs
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  };

  const handleNewGame = () => {
    // Set the state to show the TicTacToeGame component
    setShowGame(true);
  };

  // Dodaj deklaraciju tokena ovdje kako bi bio dostupan u JSX-u
  const token = localStorage.getItem('token');

  return (
    <div style={{ padding: theme.spacing(3) }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6}>
          <Avatar alt="User Avatar" src="https://i.pravatar.cc/300/300" />
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <FormControlLabel
            control={<Switch />}
            label="Dark Theme"
          />
          {token ? <LogoutButton setLoggedIn={setLoggedIn} /> : <AuthTabs />}
        </Grid>
      </Grid>

      <h1>Welcome to the Dashboard!</h1>

      <button onClick={handleNewGame}>Nova igra</button>

      {/* Conditionally render the TicTacToeGame component */}
      {showGame && <TicTacToeGame token={token} />}
    </div>
  );
};

export default Dashboard;
