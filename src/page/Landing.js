import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';
import cyberBeyond from '../assets/CyberBeyond.png';
import button1 from '../assets/1.png';
import button2 from '../assets/2.png';
import button3 from '../assets/3.png';
import button4 from '../assets/4.png';
import frameA from '../assets/FrameA.png';
import frameB from '../assets/FrameB.png';

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
          <img src={cyberBeyond} alt="Archetype Python" />
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
