import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db, storage } from '../firebase'; // Import your Firebase configuration and storage
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import ReactQuill from 'react-quill'; // Import Quill
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/SignUp.css'; // Import the CSS file

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
    occupation: '',
    fieldOfStudy: '',
    employerOrSchool: '',
    skills: '',
    previousExperience: '',
    teamName: '',
    teamMembers: '',
    role: '',
    projectIdea: '',
    preferredTrack: '',
    dietaryRestrictions: '',
    tShirtSize: '',
    accommodationNeeds: '',
    linkedIn: '',
    github: '',
    personalWebsite: '',
    resumeURL: '', // Add resume URL to userInfo state
    agreeToTerms: false,
    consentToRecording: false,
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

    // Basic validation for required fields
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
      'agreeToTerms',
      'consentToRecording',
    ];

    for (const field of requiredFields) {
      if (!userInfo[field]) {
        alert(`Please fill the required field: ${field}`);
        return;
      }
    }

    try {
      // Upload the resume and get the URL
      const resumeURL = await uploadResume();
      // Save user info to a new collection 'userAdditionalInfo' under the user's document
      await setDoc(doc(db, 'userAdditionalInfo', userId), { ...userInfo, resumeURL });
      // Redirect to home after submission
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
          <div className="container">
            <h2>Personal Information</h2>
            <form>
              <div className="form-group">
                <input type="text" id="full-name" name="fullName" value={userInfo.fullName} onChange={handleChange} placeholder="Full Name" required />
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} placeholder="Email" required />
              </div>
              <div className="form-group">
                <input type="tel" id="phone" name="phone" value={userInfo.phone} onChange={handleChange} placeholder="Phone Number" required />
              </div>
              <div className="form-group">
                <input type="date" id="date-of-birth" name="dateOfBirth" value={userInfo.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" required />
              </div>
              <div className="button-container">
                <button type="button" className="next-button" onClick={nextStep}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="container">
            <h2>Professional Information</h2>
            <form>
              <div className="form-group">
                <input type="text" id="occupation" name="occupation" value={userInfo.occupation} onChange={handleChange} placeholder="Occupation" required />
              </div>
              <div className="form-group">
                <input type="text" id="field-of-study" name="fieldOfStudy" value={userInfo.fieldOfStudy} onChange={handleChange} placeholder="Field of Study" required />
              </div>
              <div className="form-group">
                <input type="text" id="employer-or-school" name="employerOrSchool" value={userInfo.employerOrSchool} onChange={handleChange} placeholder="Employer or School" required />
              </div>
              <div className="form-group">
                <input type="text" id="skills" name="skills" value={userInfo.skills} onChange={handleChange} placeholder="Relevant Skills" required />
              </div>
              <div className="form-group">
                <ReactQuill
                  id="previous-experience"
                  value={userInfo.previousExperience}
                  onChange={(value) => handleRichTextChange('previousExperience', value)}
                  placeholder="Previous Hackathon Experience"
                />
              </div>
              <div className="button-container">
                <button type="button" className="prev-button" onClick={prevStep}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button type="button" className="next-button" onClick={nextStep}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="container">
            <h2>Team Information</h2>
            <form>
              <div className="form-group">
                <input type="text" id="team-name" name="teamName" value={userInfo.teamName} onChange={handleChange} placeholder="Team Name (If Applicable)" />
              </div>
              <div className="form-group">
                <ReactQuill
                  id="team-members"
                  value={userInfo.teamMembers}
                  onChange={(value) => handleRichTextChange('teamMembers', value)}
                  placeholder="Team Members (If Applicable)"
                />
              </div>
              <div className="form-group">
                <input type="text" id="role" name="role" value={userInfo.role} onChange={handleChange} placeholder="Role in Team" required />
              </div>
              <div className="button-container">
                <button type="button" className="prev-button" onClick={prevStep}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button type="button" className="next-button" onClick={nextStep}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </form>
          </div>
        );
      case 4:
        return (
          <div className="container">
            <h2>Project Information</h2>
            <form>
              <div className="form-group">
                <ReactQuill
                  id="project-idea"
                  value={userInfo.projectIdea}
                  onChange={(value) => handleRichTextChange('projectIdea', value)}
                  placeholder="Project Idea"
                />
              </div>
              <div className="form-group">
                <input type="text" id="preferred-track" name="preferredTrack" value={userInfo.preferredTrack} onChange={handleChange} placeholder="Preferred Track" />
              </div>
              <div className="button-container">
                <button type="button" className="prev-button" onClick={prevStep}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button type="button" className="next-button" onClick={nextStep}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </form>
          </div>
        );
      case 5:
        return (
          <div className="container">
            <h2>Additional Information</h2>
            <form>
              <div className="form-group">
                <input type="text" id="dietary-restrictions" name="dietaryRestrictions" value={userInfo.dietaryRestrictions} onChange={handleChange} placeholder="Dietary Restrictions" />
              </div>
              <div className="form-group">
                <input type="text" id="tshirt-size" name="tShirtSize" value={userInfo.tShirtSize} onChange={handleChange} placeholder="T-shirt Size" />
              </div>
              <div className="form-group">
                <input type="text" id="accommodation-needs" name="accommodationNeeds" value={userInfo.accommodationNeeds} onChange={handleChange} placeholder="Accommodation Needs" />
              </div>
              <div className="button-container">
                <button type="button" className="prev-button" onClick={prevStep}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button type="button" className="next-button" onClick={nextStep}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </form>
          </div>
        );
      case 6:
        return (
          <div className="container">
            <h2>Networking Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="url" id="linkedIn" name="linkedIn" value={userInfo.linkedIn} onChange={handleChange} placeholder="LinkedIn Profile" />
              </div>
              <div className="form-group">
                <input type="url" id="github" name="github" value={userInfo.github} onChange={handleChange} placeholder="GitHub Profile" />
              </div>
              <div className="form-group">
                <input type="url" id="personal-website" name="personalWebsite" value={userInfo.personalWebsite} onChange={handleChange} placeholder="Personal Website" />
              </div>
              <div className="form-group">
                <label htmlFor="resume-upload">Upload Resume:</label>
                <input type="file" id="resume-upload" name="resume" onChange={handleFileChange} />
              </div>
              <div className="form-group remember-me">
                <label>
                  <input type="checkbox" name="agreeToTerms" checked={userInfo.agreeToTerms} onChange={handleChange} required />
                  I agree to the terms and conditions
                </label>
              </div>
              <div className="form-group remember-me">
                <label>
                  <input type="checkbox" name="consentToRecording" checked={userInfo.consentToRecording} onChange={handleChange} required />
                  I consent to photography and video recording
                </label>
              </div>
              <div className="button-container">
                <button type="button" className="prev-button" onClick={prevStep}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button type="submit" className="submit-button">
                  Submit
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
    <main className="signup-main">
      <div className="signup-content">
        {renderStep()}
      </div>
    </main>
  );
};

export default UserInfoForm;
