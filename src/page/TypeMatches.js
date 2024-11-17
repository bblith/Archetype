import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const TypeMatches = () => {
  const [metrics, setMetrics] = useState({
    reviewed: 0,
    typeMatches: 0,
    recirculated: 0,
  });

  const [positions, setPositions] = useState([
    {
      title: 'Software Engineer',
      candidatesNeeded: 10,
      candidates: [
        {
          name: 'John Doe',
          age: 28,
          workExperience: '3 years at TechCorp',
          education: 'Bachelor of Computer Science',
          degree: 'B.Sc.',
          skills: ['JavaScript', 'React', 'Node.js'],
          approvals: {
            workExperience: false,
            education: false,
            degree: false,
            skills: false,
          },
        },
        {
          name: 'Alice Smith',
          age: 26,
          workExperience: '2 years at Web Solutions',
          education: 'Bachelor of Software Engineering',
          degree: 'B.Sc.',
          skills: ['HTML', 'CSS', 'Angular'],
          approvals: {
            workExperience: false,
            education: false,
            degree: false,
            skills: false,
          },
        },
      ],
    },
    {
      title: 'Data Scientist',
      candidatesNeeded: 5,
      candidates: [
        {
          name: 'Jane Doe',
          age: 30,
          workExperience: '5 years at DataCorp',
          education: 'Master of Data Science',
          degree: 'M.Sc.',
          skills: ['Python', 'Machine Learning', 'SQL'],
          approvals: {
            workExperience: false,
            education: false,
            degree: false,
            skills: false,
          },
        },
      ],
    },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPending = positions.reduce(
    (total, position) => total + position.candidates.length,
    0
  );

  const openModal = (position) => {
    const firstCandidate = position.candidates[0];
    setSelectedCandidate(firstCandidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
    setIsModalOpen(false);
  };

  const toggleApproval = (attribute) => {
    setSelectedCandidate((prevCandidate) => ({
      ...prevCandidate,
      approvals: {
        ...prevCandidate.approvals,
        [attribute]: !prevCandidate.approvals[attribute],
      },
    }));
  };

  const handleSubmit = () => {
    const allApproved = Object.values(selectedCandidate.approvals).every(
      (approved) => approved
    );

    if (allApproved) {
      // If all attributes are approved, the candidate is a type match
      setMetrics((prevMetrics) => ({
        ...prevMetrics,
        typeMatches: prevMetrics.typeMatches + 1,
        reviewed: prevMetrics.reviewed + 1,
      }));
    } else {
      // If not a type match, the candidate is recirculated
      setMetrics((prevMetrics) => ({
        ...prevMetrics,
        recirculated: prevMetrics.recirculated + 1,
        reviewed: prevMetrics.reviewed + 1,
      }));
    }

    // Remove the current candidate and load the next one
    setPositions((prevPositions) =>
      prevPositions.map((position) => ({
        ...position,
        candidates: position.candidates.filter(
          (candidate) => candidate.name !== selectedCandidate.name
        ),
      }))
    );

    const nextCandidate = positions[0]?.candidates[1]; // Load next candidate if available
    if (nextCandidate) {
      setSelectedCandidate(nextCandidate);
    } else {
      closeModal(); // Close modal if no more candidates
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="dashboard-container">
        <div className="metric-card">
          <div className="metric-value">{totalPending}</div>
          <div className="metric-label">PENDING</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{metrics.reviewed}</div>
          <div className="metric-label">REVIEWED</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{metrics.recirculated}</div>
          <div className="metric-label">RECIRCULATED</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{metrics.typeMatches}</div>
          <div className="metric-label">TYPE MATCHES</div>
        </div>
      </div>
      <div className="positions-container">
        <div className="positions-header">OPEN POSITIONS</div>
        <div className="positions-list">
          {positions.map((position, index) => (
            <div
              className="position-card"
              key={index}
              onClick={() => openModal(position)}
            >
              <div className="position-title">{position.title}</div>
              <div className="position-metric">{position.candidates.length}</div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedCandidate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-header">
              {selectedCandidate?.name}, {selectedCandidate?.age}
            </div>
            <div className="modal-body">
              <div className="candidate-details">
                <div
                  className={`detail-box ${
                    selectedCandidate?.approvals.workExperience
                      ? 'approved'
                      : ''
                  }`}
                  onClick={() => toggleApproval('workExperience')}
                >
                  <div className="detail-header">Work Experience</div>
                  <div className="detail-content">
                    {selectedCandidate?.workExperience}
                  </div>
                </div>
                <div
                  className={`detail-box ${
                    selectedCandidate?.approvals.education ? 'approved' : ''
                  }`}
                  onClick={() => toggleApproval('education')}
                >
                  <div className="detail-header">Education</div>
                  <div className="detail-content">
                    {selectedCandidate?.education}
                  </div>
                </div>
                <div
                  className={`detail-box ${
                    selectedCandidate?.approvals.degree ? 'approved' : ''
                  }`}
                  onClick={() => toggleApproval('degree')}
                >
                  <div className="detail-header">Degree</div>
                  <div className="detail-content">
                    {selectedCandidate?.degree}
                  </div>
                </div>
                <div
                  className={`detail-box ${
                    selectedCandidate?.approvals.skills ? 'approved' : ''
                  }`}
                  onClick={() => toggleApproval('skills')}
                >
                  <div className="detail-header">Skills</div>
                  <div className="detail-content">
                    {selectedCandidate?.skills.join(', ')}
                  </div>
                </div>
              </div>
            </div>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeMatches;