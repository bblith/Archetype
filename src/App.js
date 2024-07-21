import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './page/Landing';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Home from './page/Home';
import PasswordReset from './components/PasswordReset';
import ProtectedRoute from './ProtectedRoute';
import Header from './components/Header';
import UserInfoForm from './page/UserInfoForm'; // Import the new UserInfoForm component

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="/user-info-form" element={<UserInfoForm />} /> {/* Add the new form route */}
      </Routes>
    </Router>
  );
};

export default App;
