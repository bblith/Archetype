import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const Home = () => {
  const [metrics, setMetrics] = useState({
    waitingReview: 0,
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
        },
      ],
    },
    {
      title: 'Product Manager',
      candidatesNeeded: 5,
      candidates: [
        {
          name: 'Alice Johnson',
          age: 32,
          workExperience: '5 years in Product Management at InnovateTech',
          education: 'MBA',
          degree: 'MBA',
          skills: ['Leadership', 'Agile', 'Communication'],
        },
      ],
    },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (position) => {
    const firstCandidate = position.candidates[0];
    setSelectedCandidate(firstCandidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
    setIsModalOpen(false);
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="dashboard-container">
        <div className="metric-card">
          <div className="metric-value">{metrics.waitingReview}</div>
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
              <div className="position-metric">{position.candidatesNeeded}</div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
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
                <div className="detail-box">
                  <div className="detail-header">Work Experience</div>
                  <div className="detail-content">
                    {selectedCandidate?.workExperience}
                  </div>
                </div>
                <div className="detail-box">
                  <div className="detail-header">Education</div>
                  <div className="detail-content">
                    {selectedCandidate?.education}
                  </div>
                </div>
                <div className="detail-box">
                  <div className="detail-header">Degree</div>
                  <div className="detail-content">{selectedCandidate?.degree}</div>
                </div>
                <div className="detail-box">
                  <div className="detail-header">Skills</div>
                  <div className="detail-content">
                    {selectedCandidate?.skills.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
