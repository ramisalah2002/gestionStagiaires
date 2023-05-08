import React from 'react';
import './Dashboard.css';

function test1() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to the Dashboard</h1>
        <p>Here's some important information about your account</p>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Account Information</h2>
          <ul>
            <li>Username: JohnDoe123</li>
            <li>Email: john.doe@gmail.com</li>
            <li>Account Type: Standard</li>
          </ul>
        </div>
        <div className="dashboard-card">
          <h2>Recent Activity</h2>
          <ul>
            <li>Viewed Dashboard</li>
            <li>Updated Profile Information</li>
            <li>Downloaded Report</li>
          </ul>
        </div>
        <div className="dashboard-card">
          <h2>Upcoming Events</h2>
          <ul>
            <li>Webinar on Digital Marketing</li>
            <li>Company Meeting</li>
            <li>Networking Event</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default test1;
