import React from "react";
import { useState,useRef } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { FaTrash } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faCalendarDays,
  faChevronRight,
  faPlus,
  faListCheck,
  faTimeline,
  faClock,
  faStopwatch
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faRectangleList, faClockFour } from "@fortawesome/free-regular-svg-icons";
import "./Equipes.css";

function Parametres() {
  

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="teams-container">
            <div className="teams-header">
                <h2>Équipes</h2>
                <Link className="new-team-link">
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Ajouter équipe
                </Link>
            </div>
            <div className="teams-content">
                <div className="team-card">
                    <div className="link-header">
                        <div className="days-left">
                            <FontAwesomeIcon className="days-left-icon" icon={faStopwatch}></FontAwesomeIcon>
                            <label>24 jours</label>
                        </div>
                        <Link className="link">
                            <FontAwesomeIcon className="icon-chevron" icon={faChevronRight} />
                        </Link>
                    </div>
                    <div className="team-card-header">
                        <label className="language-label">
                            [React+Laravel]
                        </label>
                        <label className="project-label">
                            Site web de gestion des stagiaires
                        </label>
                    </div>
                    <div className="progress-container">
                        <div className="progress-title">
                            <FontAwesomeIcon icon={faListCheck} />
                            <label>Progrès</label>
                        </div>
                        <label className="progress-nbr">75%</label>
                    </div>
                    <div className="progress-line-container">
                        <div className="progress-line"></div>
                    </div>
                    <div className="team-card-footer">
                        <div className="team-card-footer-left">
                            <img className="member-img" src="../../images/user.jpg"></img>
                            <img className="member-img" src="../../images/user.jpg"></img>
                            <img className="member-img" src="../../images/user.jpg"></img>
                        </div>
                        <div className="team-card-footer-right">
                            <FontAwesomeIcon className="icon" icon={faCalendarDays} />
                            <label>Délai: </label>
                            <p>24 Jui 2023</p>
                        </div>
                    </div>
                </div>
                <div className="team-card">
                    <div className="link-header">
                        <div className="days-left">
                            <FontAwesomeIcon className="days-left-icon" icon={faStopwatch}></FontAwesomeIcon>
                            <label>24 jours</label>
                        </div>
                        <Link className="link">
                            <FontAwesomeIcon className="icon-chevron" icon={faChevronRight} />
                        </Link>
                    </div>
                    <div className="team-card-header">
                        <label className="language-label">
                            [React+Laravel]
                        </label>
                        <label className="project-label">
                            Site web de gestion des stagiaires
                        </label>
                    </div>
                    <div className="progress-container">
                        <div className="progress-title">
                            <FontAwesomeIcon icon={faListCheck} />
                            <label>Progrès</label>
                        </div>
                        <label className="progress-nbr">75%</label>
                    </div>
                    <div className="progress-line-container">
                        <div className="progress-line"></div>
                    </div>
                    <div className="team-card-footer">
                        <div className="team-card-footer-left">
                            <img className="member-img" src="../../images/user.jpg"></img>
                            <img className="member-img" src="../../images/user.jpg"></img>
                            <img className="member-img" src="../../images/user.jpg"></img>
                        </div>
                        <div className="team-card-footer-right">
                            <FontAwesomeIcon className="icon" icon={faCalendarDays} />
                            <label>Délai: </label>
                            <p>24 Jui 2023</p>
                        </div>
                    </div>
                </div>
                <div className="team-card">
                    <div className="link-header">
                        <div className="days-left">
                            <FontAwesomeIcon className="days-left-icon" icon={faStopwatch}></FontAwesomeIcon>
                            <label>24 jours</label>
                        </div>
                        <Link className="link">
                            <FontAwesomeIcon className="icon-chevron" icon={faChevronRight} />
                        </Link>
                    </div>
                    <div className="team-card-header">
                        <label className="language-label">
                            [React+Laravel]
                        </label>
                        <label className="project-label">
                            Site web de gestion des stagiaires
                        </label>
                    </div>
                    <div className="progress-container">
                        <div className="progress-title">
                            <FontAwesomeIcon icon={faListCheck} />
                            <label>Progrès</label>
                        </div>
                        <label className="progress-nbr">75%</label>
                    </div>
                    <div className="progress-line-container">
                        <div className="progress-line"></div>
                    </div>
                    <div className="team-card-footer">
                        <div className="team-card-footer-left">
                            <img className="member-img" src="../../images/user.jpg"></img>
                            <img className="member-img" src="../../images/user.jpg"></img>
                            <img className="member-img" src="../../images/user.jpg"></img>
                        </div>
                        <div className="team-card-footer-right">
                            <FontAwesomeIcon className="icon" icon={faCalendarDays} />
                            <label>Délai: </label>
                            <p>24 Jui 2023</p>
                        </div>
                    </div>
                </div>
                <div className="team-card">
                    <div className="link-header">
                        <div className="days-left">
                            <FontAwesomeIcon className="days-left-icon" icon={faStopwatch}></FontAwesomeIcon>
                            <label>24 jours</label>
                        </div>
                        <Link className="link">
                            <FontAwesomeIcon className="icon-chevron" icon={faChevronRight} />
                        </Link>
                    </div>
                    <div className="team-card-header">
                        <label className="language-label">
                            [React+Laravel]
                        </label>
                        <label className="project-label">
                            Site web de gestion des stagiaires
                        </label>
                    </div>
                    <div className="progress-container">
                        <div className="progress-title">
                            <FontAwesomeIcon icon={faListCheck} />
                            <label>Progrès</label>
                        </div>
                        <label className="progress-nbr">75%</label>
                    </div>
                    <div className="progress-line-container">
                        <div className="progress-line"></div>
                    </div>
                    <div className="team-card-footer">
                        <div className="team-card-footer-left">
                            <img className="member-img" src="../../images/user.jpg"></img>
                            <img className="member-img" src="../../images/user.jpg"></img>
                            <img className="member-img" src="../../images/user.jpg"></img>
                        </div>
                        <div className="team-card-footer-right">
                            <FontAwesomeIcon className="icon" icon={faCalendarDays} />
                            <label>Délai: </label>
                            <p>24 Jui 2023</p>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
      </main>
    </div>
  );
}

export default Parametres;