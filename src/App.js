import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/SignUp';
import PasswordReset from './components/PasswordReset';
import ProtectedRoute from './ProtectedRoute';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Routes>
    </Router>
  );
};

export default App;
