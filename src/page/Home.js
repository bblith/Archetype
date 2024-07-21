import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import cyberBeyond from '../assets/CyberBeyond.png';
import button1 from '../assets/1.png';
import button2 from '../assets/2.png';
import button3 from '../assets/3.png';
import button4 from '../assets/4.png';
import frameA from '../assets/FrameA.png';
import frameB from '../assets/FrameB.png';


const Home = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);


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
  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleLogout}>Schedule</button>
        <button onClick={handleLogout}>Challenges</button>
      </nav>

      <div className="login-image">
          <img src={cyberBeyond} alt="Cyber Beyond Graphic" />

          {hoveredButton && (
            <div className={`frame ${hoveredButton === 'what' || hoveredButton === 'when' ? 'frame-left' : 'frame-right'}`}>
              <img src={hoveredButton === 'what' || hoveredButton === 'when' ? frameA : frameB} alt="Frame" />
              <p className="frame-text">
                {hoveredButton === 'what' && 'This is the what frame text'}
                {hoveredButton === 'when' && 'This is the when frame text'}
                {hoveredButton === 'where' && 'This is the where frame text'}
                {hoveredButton === 'how' && 'This is the how frame text'}
              </p>
            </div>
          )}
        </div>

    </div>
  );
};

export default Home;
