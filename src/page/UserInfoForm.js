import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/UserInfoForm.module.css';

const UserInfoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, email, firstName, lastName } = location.state || {};

  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    fullName: `${firstName} ${lastName}`,
    email: email,
    phone: '',
    dateOfBirth: '',
    fieldOfStudy: '',
    employerOrSchool: '',
    skills: '',
    previousExperience: '',
    linkedIn: '',
    personalWebsite: '',
    resumeURL: '',
  });
  const [resumeFile, setResumeFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleRichTextChange = (name, value) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const uploadResume = async () => {
    if (resumeFile) {
      const storageRef = ref(storage, `resumes/${userId}/${resumeFile.name}`);
      const snapshot = await uploadBytes(storageRef, resumeFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['fullName', 'email', 'phone', 'dateOfBirth'];

    for (const field of requiredFields) {
      if (!userInfo[field]) {
        alert(`Please complete the required field: ${field}`);
        return;
      }
    }

    try {
      const resumeURL = await uploadResume();
      await setDoc(doc(db, 'userAdditionalInfo', userId), { ...userInfo, resumeURL });
      navigate('/home');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.container}>
            <h2>Registration</h2>
            <form>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={userInfo.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.buttonContainer}>
                <button
                  type="button"
                  className={styles.nextButton}
                  onClick={() => setStep(2)}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div className={styles.container}>
            <h2>Registration</h2>
            <form>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={userInfo.fieldOfStudy}
                  onChange={handleChange}
                  placeholder="Degree"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="employerOrSchool"
                  value={userInfo.employerOrSchool}
                  onChange={handleChange}
                  placeholder="Institution"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="skills"
                  value={userInfo.skills}
                  onChange={handleChange}
                  placeholder="Skills"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <ReactQuill
                  value={userInfo.previousExperience}
                  onChange={(value) =>
                    handleRichTextChange('previousExperience', value)
                  }
                  placeholder="Work Experience"
                  className={styles.qlContainer}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button
                  type="button"
                  className={styles.prevButton}
                  onClick={() => setStep(1)}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  type="button"
                  className={styles.nextButton}
                  onClick={() => setStep(3)}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </form>
          </div>
        );
        case 3:
          return (
            <div className={styles.container}>
              <h2>Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <input
                    type="url"
                    name="linkedIn"
                    value={userInfo.linkedIn}
                    onChange={handleChange}
                    placeholder="LinkedIn Profile"
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="url"
                    name="personalWebsite"
                    value={userInfo.personalWebsite}
                    onChange={handleChange}
                    placeholder="Personal Website"
                  />
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    type="button"
                    className={styles.prevButton}
                    onClick={() => setStep(2)}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </form>
            </div>
          );
        
      default:
        return null;
    }
  };

  return (
    <main className={styles.signupMain}>
      <div className={styles.signupContent}>{renderStep()}</div>
    </main>
  );
};

export default UserInfoForm;
