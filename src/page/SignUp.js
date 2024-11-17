import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import styles from '../styles/SignUp.module.css'; // Import the CSS module

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // Instead of setting the user data here, we will navigate to the multi-step form
      navigate('/user-info-form', { state: { userId: user.uid, email: user.email, firstName, lastName } });
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
      console.log(errorMessage);
    }
  };

  return (
    <main className={styles.signupMain}>
      <div className={styles.signupContent}>
        <section className={styles.container}>
          <div>
            <h2 className={styles.heading}>CREATE AN ACCOUNT</h2>
            <form onSubmit={onSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="first-name"></label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  required
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="last-name"></label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
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
              <div className={styles.formGroup}>
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
              <div className={styles.formGroup}>
                <label htmlFor="confirm-password"></label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <div className={styles.formGroup}>
                <button type="submit" className={styles.submitButton}>SIGN UP</button>
              </div>
            </form>
            <p className={styles.navLink}>
              <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;
