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
    age: '',
    education: '',
    skills: '',
    workExperience: '',
  });
  
  const [resumeFile, setResumeFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRichTextChange = (name, value) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
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

    const requiredFields = [
      'fullName',
      'email',
      'phone',
      'dateOfBirth',
      'occupation',
      'fieldOfStudy',
      'employerOrSchool',
      'skills',
      'role',
    ];

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
      console.error("Error adding document: ", error);
    }
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
  return (
    <div className={styles.container}>
      <h2>Basic Information</h2>
      <form>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="full-name"
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
            id="email"
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
            id="phone"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="number"
            id="age"
            name="age"
            value={userInfo.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.nextButton}
            onClick={nextStep}
          >
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
      <div className={styles.signupContent}>
        {renderStep()}
      </div>
    </main>
  );
};

export default UserInfoForm;
