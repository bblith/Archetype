import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import Firebase auth
import Navbar from '../components/Navbar'; // Import the Navbar component
import { QRCode } from 'react-qrcode-logo'; // Import QRCode from react-qrcode-logo
import QRFrame from '../assets/QRFrame.png'; // Import the frame image
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [firstName, setFirstName] = useState(''); // State to store the user's name
    const [qrValue, setQrValue] = useState(''); // State to store the QR code value (e.g., user info)

    useEffect(() => {
        const user = auth.currentUser; // Get the current user from Firebase
        if (user) {
            const displayName = user.displayName; // Get the user's display name
            setFirstName(displayName); // Set the display name to state
            setQrValue(user.uid); // Set the user's unique ID or other user-related info as the QR value
        }
    }, []); // Empty dependency array to ensure it runs once when the component mounts

    return (
        <div className="dashboard-container">
            <Navbar />

            <div className="userinfo-container">
                <div className="userinfor-card card-1">
                    <div className="userinfo-header">Welcome, {firstName}!</div>
                </div>

                <div className="userinfor-card card-2">
                    
                    <div className="qr-code-wrapper"> 
                        <QRCode
                            value={qrValue} // The QR code value (user's unique ID)
                            size={200} // Size of the QR code
                            quietZone={10} // Space around the QR code
                            logoImage={QRFrame} // Image for the custom QR frame
                            logoWidth={250} // Width of the QR frame
                            logoHeight={250} // Height of the QR frame
                        />
                    </div>
                </div>

                <div className="userinfor-card card-3">
                    {/* Each header-content pair is wrapped in a userinfo-row */}
                    <div className="userinfo-row">
                        <div className="userinfo-header">Name</div>
                        <div className="userinfo-content">{firstName}</div>
                    </div>

                    <div className="userinfo-row">
                        <div className="userinfo-header">Role</div>
                        <div className="userinfo-content">Student</div>
                    </div>

                    <div className="userinfo-row">
                        <div className="userinfo-header">University</div>
                        <div className="userinfo-content">University Name</div>
                    </div>

                    <div className="userinfo-row">
                        <div className="userinfo-header">Major</div>
                        <div className="userinfo-content">Computer Science</div>
                    </div>

                    <div className="userinfo-row">
                        <div className="userinfo-header">Level</div>
                        <div className="userinfo-content">Senior</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
