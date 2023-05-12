import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faUserGroup, faUsersRectangle, faChalkboardUser, faCalendarCheck, faGear, faCircleInfo, faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`sidebar ${showSidebar ? '' : 'hidden'}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <a className='logo'><i><h2>LOGO</h2></i></a>
      <div className={`links-container`}>
        <ul className='links-list'>
          <li>
            <a href="#"><FontAwesomeIcon className='big-icons' icon={faHome} /><label>{showSidebar ? 'Accueil' : null}</label></a>
          </li>
          <li>
            <a href="#"><FontAwesomeIcon className='big-icons' icon={faUserGroup} /><label>{showSidebar ? 'Stagiaires' : null}</label></a>
          </li>
          <li>
            <a href="#"><FontAwesomeIcon className='big-icons' icon={faUsersRectangle} /><label>{showSidebar ? 'Equipes' : null}</label></a>
          </li>
          <li>
            <a href="#"><FontAwesomeIcon className='big-icons' icon={faChalkboardUser} /><label>{showSidebar ? 'Encadrants' : null}</label></a>
          </li>
          <li>
            <a href="#"><FontAwesomeIcon className='small-icons' icon={faCalendarCheck}/><label>{showSidebar ? 'Abscence' : null}</label></a>
          </li>
          <li>
            <a href="#"><FontAwesomeIcon className='small-icons' icon={faGear}/><label>{showSidebar ? 'Paramètres' : null}</label></a>
          </li>
        </ul>
        <ul className='links-list'>
          <li>
            <a href="#"><FontAwesomeIcon className='small-icons' icon={faCircleInfo} /><label>{showSidebar ? 'Aide & information' : null}</label></a>
          </li>
          <li>
            <a href="#"><FontAwesomeIcon className='small-icons' icon={faArrowRightFromBracket} /><label>{showSidebar ? 'Se deconnecter' : null}</label></a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
