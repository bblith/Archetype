import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink } from 'react-router-dom';
import '../styles/PasswordReset.css'; // Create this CSS file for styling

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('Check your email for further instructions.');
        setError('');
      })
      .catch((error) => {
        setError(error.message);
        setMessage('');
      });
  };

  return (
    <main className="password-reset-main">
      <section className="container">
        <h2>Password Reset</h2>
        <form onSubmit={handleReset}>
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
          <div className="form-group button-container">
            <button type="submit">Send Reset Email</button>
          </div>
        </form>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <p className="nav-link">
         <NavLink to="/login">Log In</NavLink>
        </p>
      </section>
    </main>
  );
};

export default PasswordReset;
