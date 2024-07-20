import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import cyberBeyond from '../assets/CyberBeyond.png';
import button1 from '../assets/1.png';
import button2 from '../assets/2.png';
import button3 from '../assets/3.png';
import button4 from '../assets/4.png';

const Home = () => {
  const navigate = useNavigate();

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

  return (
    <div className="home-container">
      <nav className="home-nav">
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="home-content">
        <div className="login-image">
          <img src={cyberBeyond} alt="Cyber Beyond Graphic" />
        </div>
      </div>
      <div className="buttons-container">
        <img src={button1} alt="Button 1" className="circle-button" />
        <img src={button2} alt="Button 2" className="circle-button" />
        <img src={button3} alt="Button 3" className="circle-button" />
        <img src={button4} alt="Button 4" className="circle-button" />
      </div>
    </div>
  );
};

export default Home;
