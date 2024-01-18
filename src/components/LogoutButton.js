
import React from 'react';
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ setLoggedIn }) => {
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);

    navigate("/");
  };

  return (
    <button onClick={handleLogout}>Odjava</button>
  );
};

export default LogoutButton;
