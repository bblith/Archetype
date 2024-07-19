import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/SignUp';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
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
    </Routes>
  );
};

export default App;
