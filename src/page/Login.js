import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 
import cyberBeyond from '../assets/CyberBeyond.png'; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        const user = userCredential.user;
        navigate('/');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main className="login-main">
      <div className="login-content">
        <div className="login-image">
          <img src={cyberBeyond} alt="Login Graphic" />
        </div>
        <section className="container">
          <div>
            <h2>Log In</h2>
            <form onSubmit={onLogin}>
              <div className="form-group">
                <label htmlFor="email-address"></label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"></label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group remember-me">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember Me</label>
              </div>
              <div className="form-group button-container">
                <button type="submit">Login</button>
              </div>
            </form>
            <p className="nav-link">
              <NavLink to="/reset-password">Reset Password</NavLink>
            </p>
            <p className="nav-link">
              <NavLink to="/signup">Sign Up</NavLink>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
