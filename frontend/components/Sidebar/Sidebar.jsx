import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faHome,
  faUserGroup,
  faUsersRectangle,
  faChalkboardUser,
  faCalendarCheck,
  faGear,
  faCircleInfo,
  faArrowRightFromBracket,
  faBars,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (linkText) => {
    setActiveLink(linkText);
  };

  return (
    <div className={`sidebar ${showSidebar ? '' : 'hidden'}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <Link to="/" className="logo">
        <h2>LOGO</h2>
      </Link>
      <div className={`links-container`}>
        <ul className='links-list'>
          <li className={activeLink === 'link1' ? 'active-link' : 'link'}>
            <Link
              onClick={() => handleLinkClick('link1')}
              to="/Homepage"
            >
              <FontAwesomeIcon className='big-icons' icon={faHome} />
              <label>{showSidebar ? 'Accueil' : null}</label>
            </Link>
          </li>
          <li className={activeLink === 'link2' ? 'active-link' : 'link'}>
            <Link
              onClick={() => handleLinkClick('link2')}
              to="/stagiaires"
            >
              <FontAwesomeIcon className='big-icons' icon={faUserGroup} />
              <label>{showSidebar ? 'Stagiaires' : null}</label>
            </Link>
            <Link className='plus-container'>
              <FontAwesomeIcon className='plus-icon' icon={faPlus} />
            </Link>
          </li>
          <li className={activeLink === 'link3' ? 'active-link' : 'link'}>
            <Link
              onClick={() => handleLinkClick('link3')}
              to="/equipes"
            >
              <FontAwesomeIcon className='big-icons' icon={faUsersRectangle} />
              <label>{showSidebar ? 'Equipes' : null}</label>
            </Link>
            <Link className='plus-container'>
              <FontAwesomeIcon className='plus-icon' icon={faPlus} />
            </Link>
          </li>
          <li className={activeLink === 'link4' ? 'active-link' : 'link'}>
            <Link
              onClick={() => handleLinkClick('link4')}
              to="/encadrants"
            >
              <FontAwesomeIcon className='big-icons' icon={faChalkboardUser} />
              <label>{showSidebar ? 'Encadrants' : null}</label>
            </Link>
            <Link className='plus-container'>
              <FontAwesomeIcon className='plus-icon' icon={faPlus} />
            </Link>
          </li>
          <li className={activeLink === 'link5' ? 'active-link' : 'link'}>
            <Link
              onClick={() => handleLinkClick('link5')}
              to="/abscence"
            >
              <FontAwesomeIcon className='small-icons' icon={faCalendarCheck} />
              <label>{showSidebar ? 'Abscence' : null}</label>
            </Link>
          </li>
          <li className={activeLink === 'link6' ? 'active-link' : 'link'}>
            <Link
              onClick={() => handleLinkClick('link6')}
              to="/parametres"
              className={activeLink === 'link6' ? 'active-link' : 'link'}
            >
              <FontAwesomeIcon className='small-icons' icon={faGear} />
              <label>{showSidebar ? 'Paramètres' : null}</label>
            </Link>
          </li>
        </ul>
        <ul className='links-list'>
          <li className={activeLink === 'link7' ? 'active-link' : 'link'}>
            <Link
              onClick={() => handleLinkClick('link7')}
              to="/aide"
              className={activeLink === 'link7' ? 'active-link' : 'link'}
            >
              <FontAwesomeIcon className='small-icons' icon={faCircleInfo} />
              <label>{showSidebar ? 'Aide & information' : null}</label>
            </Link>
          </li>
          <li>
            <Link href="#">
              <FontAwesomeIcon className='small-icons' icon={faArrowRightFromBracket} />
              <label>{showSidebar ? 'Se deconnecter' : null}</label>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;