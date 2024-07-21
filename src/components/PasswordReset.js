import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink } from 'react-router-dom';
import styles from '../styles/PasswordReset.module.css'; // Import the CSS module

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
    <main className={styles.passwordResetMain}>
      <section className={styles.container}>
        <h2>Password Reset</h2>
        <form onSubmit={handleReset}>
          <div className={styles.formGroup}>
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
          <div className={`${styles.formGroup} ${styles.buttonContainer}`}>
            <button className={styles.buttonAuth} type="submit">Send Reset Email</button>
          </div>
        </form>
        {message && <p className={styles.message}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.navLink}>
          <NavLink to="/login">Log In</NavLink>
        </p>
      </section>
    </main>
  );
};

export default PasswordReset;
