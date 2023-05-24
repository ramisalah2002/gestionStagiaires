import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from '../../pages/LoginPage/LoginPage';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

import {
  faSearch,
  faCircleUser,
  faCalendarDays,
  faPen,
  faPlus,
  faStopwatch,
  faChevronRight,
  faDownload,
  faCloudDownloadAlt,
  faFileImport,
  faFileUpload,
  faMessage,
  faGraduationCap,
  faSchool,
  faUserTie,
  faMailReply,
  faPhoneAlt,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
  faUser,
  faRectangleList,
  faPlusSquare,
  faEye,
  faTrashAlt,
  faEnvelope,
  faCalendar,
} from '@fortawesome/free-regular-svg-icons';
import './Chat.css';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import { FaFileDownload, FaFileImport } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import readXlsxFile from 'read-excel-file';

function StagiaireProfile() {
  const [user, setUser] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      // User data not found, navigate to LoginPage
      navigateTo('/LoginPage');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigateTo]);

  const currentDate = new Date().toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });

  

  const getCurrentDate = () => {
    const todayDate = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = todayDate.toLocaleDateString('en-GB', options);
    return formattedDate.replace(/\//g, '_');
  };


   useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveProfile(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  
  const [activeProfile, setActiveProfile] = useState(null);

  const handleProfileClick = (profileId) => {
    setActiveProfile(profileId);
  };
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className='chat-container'>
            <div className="left-section">
                <div className="search-chat">
                  <FontAwesomeIcon className="search-icon" icon={faSearch} />
                  <input className="search-input" placeholder="Rechercher ..." type="text" />
                </div>
                <div className="profiles-container">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((profileId) => (
                    <div
                      key={profileId}
                      className={`profile-item ${activeProfile === profileId ? 'active-profile-item' : ''}`}
                      onClick={() => handleProfileClick(profileId)}
                    >
                      <div className="profile-img"></div>
                      <div className="profile-info">
                        <div className="profile-header">
                          <div className="profile-name">Rami salah-eddine</div>
                          <div className="profile-date">09:00</div>
                        </div>
                        <label className="last-message">Bonjour Salah-eddine</label>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
            <div className="right-section" style={{ backgroundColor: activeProfile ? '#d9dbe3' : '#fff' }}>
              {activeProfile ? (
                <div className="second-profile-section">
                  <div className="second-profile-img"></div>
                  <label className="second-profile-name">Boulaajoul anass</label>
                </div>
              ) : (
                <div className='default-message'>
                    <img src='../../images/test.jpg'></img>
                    <label className='menstage-label'>MENStage</label>
                    <label className='menstage-paragraph'>Échangez vos messages entre vous en toutes sécurité</label>
                </div>
              )}
            </div>
        </div>
      </main>
    </div>
  );
}

export default StagiaireProfile;
