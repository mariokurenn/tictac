import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthTabs from './components/Auth/AuthTabs';
import Dashboard from './components/Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      
 <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<AuthTabs setLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard setLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
    </div>
   
  );
};

export default App;
