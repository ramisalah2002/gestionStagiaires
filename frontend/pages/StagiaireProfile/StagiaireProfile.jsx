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
import './StagiaireProfile.css';
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

  

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className='top-img-container'>
            <img src='../../images/logoMen.png'/>
        </div>
        <div className='user-container'>
            <div className='user-content'>
                <div className='user-img-div'></div>
                <div className='user-name-formation'>
                    <label className='user-name'>RAMI Salah-eddine</label>
                    <label className='user-formation'>2ème année génie logiciel</label>
                </div>
            </div>
            <Link className='message-link'>
                <FontAwesomeIcon className='message-icon' icon={faMessage} />
                Message
            </Link>
        </div>
        <div className='stagiaire-info-container'>
            <div className='left-info-container'>
                <div className='formation-container'>
                    <div className='formation-header'>
                        <FontAwesomeIcon className='formation-icon' icon={faGraduationCap} />
                        Formation
                    </div>
                    <label>2ème année génie logiciel</label>
                </div>
                <div className='formation-container'>
                    <div className='formation-header'>
                        <FontAwesomeIcon className='formation-icon' icon={faSchool} />
                        Établissement
                    </div>
                    <label>École supérieure de technologie - Salé</label>
                </div>
                <div className='formation-container'>
                    <div className='formation-header'>
                        <FontAwesomeIcon className='encadrant-icon' icon={faUserTie} />
                        Encadrant
                    </div>
                    <label>BOULAAJOUL Anass</label>
                </div>
            </div>
            <div className='right-info-container'>
                <div className='cordonnees-container'>
                    <div className='cordonnees-header'>
                        <FontAwesomeIcon className='cordonnees-icon' icon={faEnvelope} />
                        Email
                    </div>
                    <label>ramisalaheddine1@gmail.com</label>
                </div>
                <div className='cordonnees-container'>
                    <div className='cordonnees-header'>
                        <FontAwesomeIcon className='cordonnees-icon' icon={faPhone} />
                        Téléphone
                    </div>
                    <label>+212 641442579</label>
                </div>
                <div className='cordonnees-container'>
                    <div className='cordonnees-header'>
                        <FontAwesomeIcon className='calendar-icon' icon={faCalendar} />
                        Date de naissance
                    </div>
                    <label>22-12-1900</label>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

export default StagiaireProfile;
