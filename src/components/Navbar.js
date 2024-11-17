import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.error('Sign out error', error);
      });
  };

  return (
    <nav className="home-nav">
      <button onClick={() => navigate('/Home')}>Home</button>
      <button onClick={() => navigate('/TypeMatches')}>Type Matches</button>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
