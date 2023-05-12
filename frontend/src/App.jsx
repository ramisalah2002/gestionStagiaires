import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faCircleUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar/>
      <main className="main-content">
          <Header/>
          <div className='sections-container'>
            <div className='stagiaires-container'>
              
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

export default App;
