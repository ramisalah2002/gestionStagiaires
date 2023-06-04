import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faClose,
  faCalendarDays,
  faLocationDot,
  faPaperclip,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import "./Reunion.css";
import { faClock } from "@fortawesome/free-regular-svg-icons";

function Reunion() {

  

    const [isModalOpen, setModalOpen] = useState(false);

    const handleReunionInfoClick = () => {
      setModalOpen(true);
    };
  const navigateTo = useNavigate();
  const { admin, loading } = useContext(AdminContext);
  const adminContext = useContext(AdminContext);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData && !loading) {
      // Admin data doesn't exist in localStorage, redirect to LoginPage
      navigateTo("/encadrant/login");
    } else if (adminData && !admin) {
      // Admin data exists in localStorage but not in context, set the admin context
      adminContext.setAdmin(JSON.parse(adminData));
    }
  }, [admin, loading, navigateTo, adminContext]);

  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className="header">
          <div className="admin-container">
            <FontAwesomeIcon className="admin-icon" icon={faCircleUser} />
            <div className="admin-info">
              {admin && (
                <>
                  <label className="admin-name">
                    {admin.nom} {admin.prenom}
                  </label>
                  <label className="admin-post">{admin.fonction}</label>
                </>
              )}
            </div>
            <div className="vertical-line"></div>
            <div className="today-container">
              <FontAwesomeIcon
                className="calendar-icon"
                icon={faCalendarDays}
              />
              <label className="today-label">{currentDate}</label>
            </div>
          </div>
          <div className="search-container">
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input
              className="search-input"
              placeholder="Rechercher ..."
              type="text"
            />
          </div>
        </div>
        <div className="sections-container-reunion">
            <div className="reunion-rows">
                <div className="reunion-row">
                    <div className="reunion-header">
                        <label className="reunion-nbr">01</label>
                        <label className="reunion-day">Lun</label>
                        <div className="horizontal-divider"></div>
                    </div>
                    <div className="reunions-container">
                        <div className="reunion-container">
                            <div className="left-line-reunion"></div>
                            <div onClick={handleReunionInfoClick} className="reunion-info">
                                <label className="reunion-objet">
                                    Discussion conception
                                </label>
                                <label className="reunion-heure">
                                    10:00
                                </label>
                                <label className="reunion-lieu">
                                    bureau Mr. Toufik
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="reunion-row">
                    <div className="reunion-header">
                        <label className="reunion-nbr">02</label>
                        <label className="reunion-day">Mar</label>
                        <div className="horizontal-divider"></div>
                    </div>
                    <div className="reunions-container">
                        <div className="reunion-container">
                            <div className="left-line-reunion"></div>
                            <div onClick={()=>navigateTo('/test')} className="reunion-info">
                                <label className="reunion-objet">
                                    Discussion conception
                                </label>
                                <label className="reunion-heure">
                                    10:00
                                </label>
                                <label className="reunion-lieu">
                                    bureau Mr. Toufik
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="reunion-row">
                    <div className="reunion-header">
                        <label className="reunion-nbr">03</label>
                        <label className="reunion-day">Mer</label>
                        <div className="horizontal-divider"></div>
                    </div>
                    <div className="reunions-container">
                        <div className="reunion-container">
                            <div className="left-line-reunion"></div>
                            <div onClick={()=>navigateTo('/test')} className="reunion-info">
                                <label className="reunion-objet">
                                    Discussion conception
                                </label>
                                <label className="reunion-heure">
                                    10:00
                                </label>
                                <label className="reunion-lieu">
                                    bureau Mr. Toufik
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="reunion-row">
                    <div className="reunion-header">
                        <label className="reunion-nbr">04</label>
                        <label className="reunion-day">Jeu</label>
                        <div className="horizontal-divider"></div>
                    </div>
                    <div className="reunions-container">
                        <div className="reunion-container">
                            <div className="left-line-reunion"></div>
                            <div onClick={()=>navigateTo('/test')} className="reunion-info">
                                <label className="reunion-objet">
                                    Discussion conception
                                </label>
                                <label className="reunion-heure">
                                    10:00
                                </label>
                                <label className="reunion-lieu">
                                    bureau Mr. Toufik
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="reunion-row">
                    <div className="reunion-header">
                        <label className="reunion-nbr">05</label>
                        <label className="reunion-day">Ven</label>
                        <div className="horizontal-divider"></div>
                    </div>
                    <div className="reunions-container">
                        
                        <div className="reunion-container reunion-container-green">
                            <div className="left-line-reunion-green"></div>
                            <div onClick={()=>navigateTo('/test')} className="reunion-info">
                                <label className="reunion-objet">
                                    Discussion conception
                                </label>
                                <label className="reunion-heure">
                                    10:00
                                </label>
                                <label className="reunion-lieu">
                                    bureau Mr. Toufik
                                </label>
                            </div>
                        </div>
                        <div className="reunion-container reunion-container-green">
                            <div className="left-line-reunion-green"></div>
                            <div onClick={()=>navigateTo('/test')} className="reunion-info">
                                <label className="reunion-objet">
                                    Discussion conception
                                </label>
                                <label className="reunion-heure">
                                    10:00
                                </label>
                                <label className="reunion-lieu">
                                    bureau Mr. Toufik
                                </label>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className={`modal-container ${isModalOpen ? 'open' : ''}`}>
                    <label onClick={()=>setModalOpen(false)} className="close-reunion-label">
                        <FontAwesomeIcon className="close-reunion-icon" icon={faClose} />
                    </label>
                    <div className="modal">
                        <div className="modal-header">
                            <div className="reunion-img"></div>
                        </div>
                        <label className="reunion-label">Réunion</label>

                        <div className="reunion-section">
                            <div className="reunion-section-left-4">
                                <FontAwesomeIcon className="reunion-section-icon-4" icon={faCalendarDays} />
                            </div>
                            <div className="reunion-section-right">
                                <label className="reunion-section-title">Date</label>
                                <label className="reunion-section-paragraph">13-06-2023</label>
                            </div>
                        </div>
                        <div className="reunion-section">
                            <div className="reunion-section-left">
                                <FontAwesomeIcon className="reunion-section-icon" icon={faLocationDot} />
                            </div>
                            <div className="reunion-section-right">
                                <label className="reunion-section-title">Lieu</label>
                                <label className="reunion-section-paragraph">Bureau Mr. Toufik Fouad</label>
                            </div>
                        </div>
                        <div className="reunion-section">
                            <div className="reunion-section-left-2">
                                <FontAwesomeIcon className="reunion-section-icon-2" icon={faClock} />
                            </div>
                            <div className="reunion-section-right">
                                <label className="reunion-section-title">Heure</label>
                                <label className="reunion-section-paragraph">09:30</label>
                            </div>
                        </div>
                        <div className="reunion-section">
                            <div className="reunion-section-left-3">
                                <FontAwesomeIcon className="reunion-section-icon-3" icon={faPaperclip} />
                            </div>
                            <div className="reunion-section-right">
                                <label className="reunion-section-title">Sujet</label>
                                <label className="reunion-section-paragraph">Discussion sur la conception</label>
                            </div>
                        </div>
                        <div className="reunion-section">
                            <div className="reunion-section-left-5">
                                <FontAwesomeIcon className="reunion-section-icon-5" icon={faUsers} />
                            </div>
                            <div className="reunion-section-right">
                                <label className="reunion-section-title">Personnes</label>
                                <label className="reunion-section-paragraph">Mr. Toufik</label>
                                <label className="reunion-section-paragraph">RAMI Salah-eddine/BOULAAJOUL Anass</label>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
        </div>
      </main>
    </div>
  );
}

export default Reunion;
