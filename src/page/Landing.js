import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';
import cyberBeyond from '../assets/CyberBeyond.png';


const Landing = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.error('Sign out error', error);
      });
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="login-image">
          <img src={cyberBeyond} alt="Archetype" />

          <div className="buttons">
            <button onClick={handleRegister}>REGISTER</button>
            <button onClick={handleLogin}>LOGIN</button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Landing;
