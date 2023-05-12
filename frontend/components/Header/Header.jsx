import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faCircleUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function App() {
  return (
    <div className='header'>
      <div className='admin-container'>
        <FontAwesomeIcon className='admin-icon' icon={faCircleUser} />
        <div className='admin-info'>
          <label className='admin-name'>Nom Administrateur</label>
          <label className='admin-post'>Poste administrateur</label>
        </div>
        <div className='vertical-line'></div>
        <div className='today-container'>
          <FontAwesomeIcon className='calendar-icon' icon={faCalendarDays} />
          <label className='today-label'>23 fév</label>
        </div>
      </div>
      <div className='search-container'>
        <FontAwesomeIcon className='search-icon' icon={faSearch} />
        <input className='search-input' placeholder='Rechercher ...' type="text"/>
      </div>
    </div>
  );
}

export default App;
