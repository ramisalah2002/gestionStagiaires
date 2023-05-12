import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faCircleUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import './Homepage.css';

function Homepage() {
  return (
    <div className="app">
      <Sidebar/>
      <main className="main-content">
          <Header/>
          <div className='sections-container'>
            <div className='stagiaires-container'>
              <div className='stagiaires-header'>
                <label className='stagiaires-title'>Stagiaires</label>
                <div></div>
              </div>
            </div>
            <div className='project-abscence-section'>
              <div className='project-container'></div>
              <div className='abscence-container'></div>
            </div>
          </div>
      </main>
    </div>
  );
}

export default Homepage;
