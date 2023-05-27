import React, { useState, useEffect } from "react";
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
  faCalendarDays,
  faCalendarAlt,
  faCalendarCheck,
  faArrowRight,
  faArrowPointer,
  faTriangleCircleSquare,
  faTriangleExclamation,
  faPlay,
  faPeopleGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-regular-svg-icons";
import "./Projet.css";
import projetImage from "./../../images/user.jpg";
import technologieImage1 from "./../../images/React.png";
import technologieImage2 from "./../../images/Laravel.png";
function Projet() {
  const [user, setUser] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      // User data not found, navigate to LoginPage
      navigateTo("/LoginPage");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigateTo]);

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
              {user && (
                <>
                  <label className="admin-name">
                    {user.nom} {user.prenom}
                  </label>
                  <label className="admin-post">{user.fonction}</label>
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
        <div className="sections-container-p">
          <div className="projet-containert-collaborators">
            <div className="projet-container">
              <div className="projet-header">
                <img
                  className="projet-picture"
                  src={projetImage}
                  alt="Profile"
                />
                <div className="projet-titles">
                  <label className="projet-title">Gestion des examens</label>
                  <p className="projet-under-title">
                    Une application Mobile de gestion et passage des examend en
                    ligne.
                  </p>
                </div>
              </div>
              <div className="projet-body">
                <div className="projet-body-details">
                  <h4>Technologies utilisées :</h4>
                  <div className="technologies">
                    <div className="technologie">
                      <FontAwesomeIcon className="tech-icon" icon={faPlay} />
                      <img
                        className="technologie-picture"
                        src={technologieImage1}
                        alt="technologieImage1"
                      />
                      <label>React Native</label>
                    </div>
                    <div className="technologie">
                      <FontAwesomeIcon className="tech-icon" icon={faPlay} />
                      <img
                        className="technologie-picture"
                        src={technologieImage2}
                        alt="technologieImage2"
                      />
                      <label>Laravel</label>
                    </div>
                  </div>
                </div>
                <div className="projet-body-date">
                  <div className="projet-body-date-debut">
                    <FontAwesomeIcon className="icon" icon={faCalendarAlt} />
                    <span>Date debut</span>
                    <p>08 Sept, 2019</p>
                  </div>
                  <div className="projet-body-date-fin">
                    <FontAwesomeIcon className="icon" icon={faCalendarCheck} />
                    <span>Date Fin</span>
                    <p>12 Oct, 2019</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="projet-collaborators">
              <div className="collaborators-header">
                <FontAwesomeIcon className="team-icon" icon={faPeopleGroup} />
                <p>Membres d'éqipe</p>
              </div>
              <div className="collaborators-body">
                <div className="collaboratores-body-encadrant">
                  <div className="header-collaboratores-body">
                    <FontAwesomeIcon className="header-icon" icon={faUser} />
                    <label>Encadrant :</label>
                  </div>
                  <div className="collaboratores-body-encadrant-imageName">
                    <img
                      className="encadrant-image"
                      src={projetImage}
                      alt="encadrantImage"
                    />
                    <div className="encadrant-fonction">
                      <label className="nomEnacrant">Mr. Fouad Toufik</label>
                      <label className="fonction">Enseignant</label>
                    </div>
                  </div>
                </div>
                <div className="collaboratores-body-equipes">
                  <div className="header-collaboratores-equipes">
                    <FontAwesomeIcon className="header-icon" icon={faUser} />
                    <label>Stagiaires :</label>
                  </div>
                  <div className="collaboratores-body-stagiaire">
                    <div className="collaboratores-body-stagiaire-imageName">
                      <img
                        className="stagiaire-image"
                        src={projetImage}
                        alt="stagiaireImage"
                      />
                      <div className="stagiaire-formation">
                        <label className="nomStagiaire">
                          Rami Salah-eddine
                        </label>
                        <label className="formation">Génie Logiciel</label>
                      </div>
                    </div>
                  </div>
                  <div className="collaboratores-body-stagiaire">
                    <div className="collaboratores-body-stagiaire-imageName">
                      <img
                        className="stagiaire-image"
                        src={projetImage}
                        alt="stagiaireImage"
                      />
                      <div className="stagiaire-formation">
                        <label className="nomStagiaire">Boulaajoul Anass</label>
                        <label className="formation">Génie Logiciel</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-abscence-section">
            <div className="project-container">
              <div className="stagiaires-header">
                <label className="stagiaires-title">Projets</label>
                <Link to="./other" className="stagiaires-count">
                  <FontAwesomeIcon icon={faRectangleList} /> 66
                </Link>
              </div>
              <div className="stagiaires-content">
                <div className="stagiaire">
                  <div className="project-info">
                    <div className="stagiaire-nom-formation">
                      <label className="stagiaire-nom">Theme projet 1</label>
                      <label className="stagiaire-formation">
                        équipe: Stagiaire1 et Stagiaire2
                      </label>
                    </div>
                  </div>
                  <div className="project-status-yellow">En cours</div>
                </div>
                <div className="stagiaire">
                  <div className="project-info">
                    <div className="stagiaire-nom-formation">
                      <label className="stagiaire-nom">Theme projet 2</label>
                      <label className="stagiaire-formation">
                        équipe: Stagiaire3 et Stagiaire4
                      </label>
                    </div>
                  </div>
                  <div className="project-status-green">Terminé</div>
                </div>
                <div className="stagiaire">
                  <div className="project-info">
                    <div className="stagiaire-nom-formation">
                      <label className="stagiaire-nom">Theme projet 2</label>
                      <label className="stagiaire-formation">
                        équipe: Stagiaire3 et Stagiaire4
                      </label>
                    </div>
                  </div>
                  <div className="project-status-green">Terminé</div>
                </div>
              </div>
            </div>
            <div className="abscence-container-a">
              <div className="stagiaires-header">
                <div className="today-abscence-a">
                  <label className="stagiaires-title">Abscence</label>
                  <div className="today-abscence-container-a">
                    <label className="today-abscence-day">Aujourd'hui</label>
                  </div>
                </div>
                <Link to="../example" className="see-more-abscence">
                  voir plus
                </Link>
              </div>
              <div className="abscence-content-a">
                <div className="abscence">
                  <div className="abscence-info">
                    <div className="red-line"></div>
                    <div className="stagiaire-nom-formation">
                      <label className="stagiaire-nom">RAMI Salah-eddine</label>
                      <label className="stagiaire-formation">
                        justification: certificat medical
                      </label>
                    </div>
                  </div>
                </div>
                <div className="abscence">
                  <div className="abscence-info">
                    <div className="red-line"></div>
                    <div className="stagiaire-nom-formation">
                      <label className="stagiaire-nom">BOULAAJOUL Anass</label>
                      <label className="stagiaire-formation">
                        justification: certificat medical
                      </label>
                    </div>
                  </div>
                </div>
                <div className="abscence">
                  <div className="abscence-info">
                    <div className="red-line"></div>
                    <div className="stagiaire-nom-formation">
                      <label className="stagiaire-nom">BOULAAJOUL Anass</label>
                      <label className="stagiaire-formation">
                        justification: certificat medical
                      </label>
                    </div>
                  </div>
                </div>
                <div className="abscence">
                  <div className="abscence-info">
                    <div className="red-line"></div>
                    <div className="stagiaire-nom-formation">
                      <label className="stagiaire-nom">BOULAAJOUL Anass</label>
                      <label className="stagiaire-formation">
                        justification: certificat medical
                      </label>
                    </div>
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

export default Projet;
