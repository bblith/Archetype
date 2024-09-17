
import React from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import CyberBeyondLine from '../assets/CyberBeyondLine.png';
import button1 from '../assets/1.png';
import button2 from '../assets/2.png';
import button3 from '../assets/3.png';
import button4 from '../assets/4.png';
import frameA from '../assets/FrameA.png';
import frameB from '../assets/FrameB.png';
import Navbar from '../components/Navbar'; // Import the Navbar component

const Dashboard = () => {
    return (
        <div className="home-container">
          <Navbar />
    
            
          <div className="login-image">
              <img src={CyberBeyondLine}  />
    
    
            </div>
    
        </div>
      );
    };


export default Dashboard;
