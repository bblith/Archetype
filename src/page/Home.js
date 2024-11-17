import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import CyberBeyond from '../assets/CyberBeyond.png';
import Navbar from '../components/Navbar'; // Import the Navbar component


const Home = () => {
 

  return (
    <div className="home-container">
      <Navbar />

      <div className="login-image">
          <img src={CyberBeyond}  />


        </div>

    </div>
  );
};

export default Home;
