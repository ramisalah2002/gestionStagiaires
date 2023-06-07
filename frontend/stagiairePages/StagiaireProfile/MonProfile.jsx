import React, { useEffect, useState, useRef, useContext } from 'react';
import { StagiaireContext } from '../../Contexts/StagiaireContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

function MonProfile() {
  const navigateTo = useNavigate();
  const { stagiaire } = useContext(StagiaireContext);
  const stagiaireContext = useContext(StagiaireContext);

  useEffect(() => {
    const stagiaireData = localStorage.getItem("stagiaire");
    if (!stagiaireData) {
      // Admin data doesn't exist in localStorage, redirect to LoginPage
      navigateTo("/stagiaire/login");
    } else if (stagiaireData && !stagiaire) {
      // Admin data exists in localStorage but not in context, set the admin context
      stagiaireContext.setStagiaire(JSON.parse(stagiaireData));
    }
  }, [stagiaire, navigateTo, stagiaireContext]);

  

  

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

  
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImageChosen, setIsImageChosen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      setSelectedFile(file);
      setIsImageChosen(true);
    };
  
    reader.readAsDataURL(file);
  };
  
  const handleUpdateImage = () => {
    const stagiaireData = localStorage.getItem("stagiaire");
              const { id } = JSON.parse(stagiaireData);
    if (selectedFile) {
      const reader = new FileReader();
      
  
      reader.onloadend = () => {
        const base64Image = reader.result;
        const payload = {
          couverture: base64Image,
        };
  
        fetch(`http://127.0.0.1:8000/api/stagiaire/${id}/update-couverture`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            if (response.ok) {
              const link = "/profile-stagiaire/"+id;
              navigateTo(link);
              console.log('Couverture image updated successfully');
              // Handle any additional actions after updating the image
            } else {
              console.error('Failed to update couverture image');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
  
      reader.readAsDataURL(selectedFile);
    }
  };

  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStagiaireData = async () => {
            try {
              const stagiaireData = localStorage.getItem("stagiaire");
              const { id } = JSON.parse(stagiaireData);
                const response = await fetch(`http://127.0.0.1:8000/api/stagiaire/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setData(data); // This will contain updated data from server
                console.log(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchStagiaireData();
    }, []);
  
  
  

  
  

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
      <div className='top-img-container'>
      {(stagiaire &&

      <img src={selectedImage || stagiaire.couverture} alt='pas de couverture' />
      )}
      {isImageChosen ? (
        <label className='change-cover-link' onClick={handleUpdateImage}>
          Appliquer les modifications
        </label>
      ) : (
        <label className='change-cover-link'>
          Changer la photo de couverture
          <input type='file' accept='image/*' onChange={handleImageChange} style={{ display: 'none' }} />
        </label>
      )}
    </div>
        <div className='user-container'>
          {(stagiaire &&
            <div className='user-content'>
                <div style={{ backgroundImage: `url(${stagiaire.image})` }} className='user-img-div'></div>
                <div className='user-name-formation'>
                    <label className='user-name'>{stagiaire.nom} {stagiaire.prenom}</label>
                    <label className='user-formation'>{stagiaire.formation}</label>
                </div>
            </div>
          )}
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
                    {(stagiaire &&
                      <label>{stagiaire.formation}</label>
                    )}
                </div>
                <div className='formation-container'>
                    <div className='formation-header'>
                        <FontAwesomeIcon className='formation-icon' icon={faSchool} />
                        Établissement
                    </div>
                    {data && data.etablissement && (
                      <label>{data.etablissement.nom_etablissement}</label>
                    )}



                    
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
                    {stagiaire && (
                      <label>{stagiaire.email}</label>
                    )}
                </div>
                <div className='cordonnees-container'>
                    <div className='cordonnees-header'>
                        <FontAwesomeIcon className='cordonnees-icon' icon={faPhone} />
                        Téléphone
                    </div>
                    {stagiaire && (
                    <label>{stagiaire.telephone}</label>
                    )}
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

export default MonProfile;
