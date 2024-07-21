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
          <img src={cyberBeyond} alt="Cyber Beyond Graphic" />
          <div className="buttons">
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
          </div>
          {hoveredButton && (
            <div className={`frame ${hoveredButton === 'what' || hoveredButton === 'when' ? 'frame-left' : 'frame-right'}`}>
              <img src={hoveredButton === 'what' || hoveredButton === 'when' ? frameA : frameB} alt="Frame" />
              <p className="frame-text">
              {hoveredButton === 'what' && (
                 <>
                    WHAT<br />
                     <br />
                    Texas A&M University<br />
                    San Antonio<br />
                    Business Library Hall
                </>
                )}
                {hoveredButton === 'when' && (
                 <>
                 WHEN<br />
                 <br />
                    October X - X<br />
                    [TIME]<br />
                    
                </>
                )}
                {hoveredButton === 'where' && (
                 <>
                 WHERE<br />
                 <br />
                    Texas A&M University<br />
                    San Antonio<br />
                    Business Library Hall
                </>
                )}
                {hoveredButton === 'how' && (
                <>
                JOIN US!<br />
                <br />
                    Register to<br />
                    create an account<br />
                    and apply to<br />
                    participate.
                    
                </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="buttons-container">
        <div
          className="button-item"
          onMouseEnter={() => setHoveredButton('what')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <img src={button1} alt="Button 1" className="circle-button" />
          <p className="button-text">what</p>
        </div>
        <div
          className="button-item"
          onMouseEnter={() => setHoveredButton('when')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <img src={button2} alt="Button 2" className="circle-button" />
          <p className="button-text">when</p>
        </div>
        <div
          className="button-item"
          onMouseEnter={() => setHoveredButton('where')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <img src={button3} alt="Button 3" className="circle-button" />
          <p className="button-text">where</p>
        </div>
        <div
          className="button-item"
          onMouseEnter={() => setHoveredButton('how')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <img src={button4} alt="Button 4" className="circle-button" />
          <p className="button-text">how to join</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
