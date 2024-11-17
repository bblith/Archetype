import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../firebase'; // Firebase auth
import '../styles/Dashboard.css';

const attributeTitles = {
  workExperience: 'Work Experience',
  education: 'Education',
  degree: 'Degree',
  skills: 'Skills',
};

const Home = () => {
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
        {
          name: 'Mike Johnson',
          age: 30,
          workExperience: '4 years at DevCorp',
          education: 'Master of Computer Science',
          degree: 'M.Sc.',
          skills: ['C++', 'Python', 'Docker'],
          approvals: {
            workExperience: false,
            education: false,
            degree: false,
            skills: false,
          },
        },
        {
          name: 'Emma Wilson',
          age: 27,
          workExperience: '3 years at Cloud Solutions',
          education: 'Bachelor of Information Systems',
          degree: 'B.Sc.',
          skills: ['AWS', 'Azure', 'Kubernetes'],
          approvals: {
            workExperience: false,
            education: false,
            degree: false,
            skills: false,
          },
        },
        {
          name: 'Sarah Lee',
          age: 25,
          workExperience: '1 year at StartTech',
          education: 'Bachelor of Computer Engineering',
          degree: 'B.Sc.',
          skills: ['Java', 'Spring Boot', 'Hibernate'],
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
        {
          name: 'Chris Evans',
          age: 29,
          workExperience: '4 years at InsightAI',
          education: 'Bachelor of Mathematics',
          degree: 'B.Sc.',
          skills: ['R', 'TensorFlow', 'Tableau'],
          approvals: {
            workExperience: false,
            education: false,
            degree: false,
            skills: false,
          },
        },
        {
          name: 'Sophia Taylor',
          age: 31,
          workExperience: '6 years at Predictive Analytics Ltd.',
          education: 'PhD in Statistics',
          degree: 'PhD',
          skills: ['Deep Learning', 'SAS', 'SQL'],
          approvals: {
            workExperience: false,
            education: false,
            degree: false,
            skills: false,
          },
        },
        {
          name: 'Daniel Brown',
          age: 27,
          workExperience: '2 years at DataBridge',
          education: 'Bachelor of Data Analytics',
          degree: 'B.Sc.',
          skills: ['Pandas', 'NumPy', 'Power BI'],
          approvals: {
            workExperience: false,
            education: false,
            degree: false,
            skills: false,
          },
        },
        {
          name: 'Rachel Green',
          age: 34,
          workExperience: '7 years at AI Insight',
          education: 'Master of Computer Science',
          degree: 'M.Sc.',
          skills: ['NLP', 'Transformers', 'AWS Sagemaker'],
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
  

  const [loggedInUser, setLoggedInUser] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [archetypes, setArchetypes] = useState([]); // Store archetypes (type-matched profiles)

  useEffect(() => {
    const fetchUser = () => {
      const user = auth.currentUser;
      if (user) {
        setLoggedInUser(user.displayName || user.email || 'User');
      } else {
        setLoggedInUser('Guest');
      }
    };

    fetchUser();
  }, []);

  const totalPending = positions.reduce(
    (total, position) => total + position.candidates.length,
    0
  );

  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
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
      setMetrics((prevMetrics) => ({
        ...prevMetrics,
        typeMatches: prevMetrics.typeMatches + 1,
        reviewed: prevMetrics.reviewed + 1,
      }));

      // Add to Archetypes
      setArchetypes((prevArchetypes) => [...prevArchetypes, selectedCandidate]);
    } else {
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

    const nextCandidate = positions[0]?.candidates[1];
    if (nextCandidate) {
      setSelectedCandidate(nextCandidate);
    } else {
      closeModal();
    }
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="welcome-message">Welcome, {loggedInUser}!</div>
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
          <div className="metric-label">ARCHETYPES</div>
        </div>
      </div>

      {/* Open Positions Section */}
      <div className="positions-container">
        <div className="positions-header">OPEN POSITIONS</div>
        <div className="positions-list">
          {positions.map((position, index) => (
            <div
              className="position-card"
              key={index}
              onClick={() => openModal(position.candidates[0])}
            >
              <div className="position-title">{position.title}</div>
              <div className="position-metric">{position.candidates.length}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Archetypes Section */}
      <div className="positions-container">
        <div className="positions-header">ARCHETYPES</div>
        <div className="positions-list">
          {archetypes.map((candidate, index) => (
            <div
              className="position-card"
              key={index}
              onClick={() => openModal(candidate)}
            >
              <div className="position-title">{candidate.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
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
                {Object.keys(selectedCandidate.approvals).map((attribute) => (
                  <div
                    key={attribute}
                    className={`detail-box ${
                      selectedCandidate.approvals[attribute] ? 'approved' : ''
                    }`}
                    onClick={() => toggleApproval(attribute)}
                  >
                    <div className="detail-header">{attributeTitles[attribute]}</div>
                    <div className="detail-content">
                      {selectedCandidate[attribute] || 'Not Available'}
                    </div>
                  </div>
                ))}
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

export default Home;
