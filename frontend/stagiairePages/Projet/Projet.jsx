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
  faSpaghettiMonsterFlying,
  faGear,
  faChartSimple,
  faArrowRight,
  faCalendarCheck,
  faCalendarAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./Projet.css";
import userImage from "../../images/user.jpg";
import projetImage from "../../images/projetImage.jpg";
import ReactNativeImage from "../../images/React.png";
import LaravelImage from "../../images/Laravel.png";

function Projet() {
  const [currentTechnologie, setCurrentTechnologie] = useState(0);

  const technologies = [
    {
      nom: "React Native",
      image: ReactNativeImage,
    },
    {
      nom: "Laravel",
      image: LaravelImage,
    },
    {
      nom: "React Native",
      image: ReactNativeImage,
    },
    {
      nom: "Laravel",
      image: LaravelImage,
    },
    // Ajoutez d'autres technologies ici
  ];

  const nextTechnologie = () => {
    setCurrentTechnologie((currentTechnologie + 1) % technologies.length);
  };

  const prevTechnologie = () => {
    setCurrentTechnologie(
      (currentTechnologie - 1 + technologies.length) % technologies.length
    );
  };

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
        <div className="header-projet">
          <div className="header-projet-txt">Présentation du projet</div>
          <div className="header-projet-container">
            <div className="projetInformations">
              <div className="sideInformations">Projet</div>
              <img
                src={projetImage}
                className="projetImage"
                alt="projetImage"
              />
              <div className="projetText">
                <div className="header-nom">JEXAMEN</div>
                <div className="header-type">Mobile</div>
              </div>
            </div>
            <div class="vertical-line" />
            <div className="encadrantInformations">
              <div className="sideInformations">Encadrant</div>
              <img
                src={userImage}
                className="encadrantImage"
                alt="encadrantImage"
              />
              <div className="encadrantText">
                <div className="header-nom">Mr. Fouad Toufik</div>
                <div className="header-fonction">Enseignant</div>
              </div>
            </div>
            <div class="vertical-line" />
            <div className="equipeInformations">
              <div className="sideInformations">Stagiaires</div>
              <div className="membreInformations">
                <img
                  src={userImage}
                  className="stagiaireImage"
                  alt="stagiaireImage"
                />
                <div className="stagiaireText">
                  <div className="header-nom">Rami Salah-Eddine</div>
                  <div className="header-formation">Génie Logiciel</div>
                </div>
              </div>
              <div className="membreInformations">
                <img
                  src={userImage}
                  className="stagiaireImage"
                  alt="stagiaireImage"
                />
                <div className="stagiaireText">
                  <div className="header-nom">Boulaajoul Anass</div>
                  <div className="header-formation">Génie Logiciel</div>
                </div>
              </div>
            </div>
            <div class="vertical-line" />
            <Link
              className="parametresProjet"
              to="#"
              title="Modifier les paramètres du projet"
            >
              <FontAwesomeIcon className="parametresIcon" icon={faGear} />
            </Link>
          </div>
        </div>
        <div className="body-projet">
          <div className="progres-progresGenerale">
            <div className="progres-projet">
              <div className="entete">Progression du projet</div>
              <div className="progressionGenerale">
                <FontAwesomeIcon
                  className="parametresIcon"
                  icon={faChartSimple}
                />
                <div className="pourcentageProgressionGenerale">75%</div>
                <div className="underTextProgressionGenerale">
                  Vous avez presque terminer votre projet !
                </div>
              </div>
              <table className="progressionsProjet">
                <tr className="progressionConception">
                  <td className="progressionText">Conception</td>
                  <td className="progressionPourcentage">43%</td>
                  <td className="progressionBar">
                    <div
                      className="progressionConceptionBar"
                      style={{ width: `${175 * 0.43}px` }}
                    />
                  </td>
                </tr>
                <tr className="progressionFontEnd">
                  <td className="progressionText">FrontEnd</td>
                  <td className="progressionPourcentage">80%</td>
                  <td className="progressionBar">
                    <div
                      className="progressionFontEndBar"
                      style={{ width: `${175 * 0.8}px` }}
                    />
                  </td>
                </tr>
                <tr className="progressionBackEnd">
                  <td className="progressionText">BackEnd</td>
                  <td className="progressionPourcentage">90%</td>
                  <td className="progressionBar">
                    <div
                      className="progressionBackEndBar"
                      style={{ width: `${175 * 0.9}px` }}
                    />
                  </td>
                </tr>
              </table>
            </div>
            <div className="progresGenerale-projet">
              <div className="entete">Activitées récentes</div>
              <div className="verticalLine-activityContainer">
                <table className="activityContainer">
                  <tr className="activity">
                    <td>
                      <FontAwesomeIcon
                        className="flechRightIcon"
                        icon={faArrowRight}
                      />
                    </td>
                    <td className="dateAtctivity">22 Nov</td>
                    <td className="contenuActivity">
                      Responded to need “Volunteer Activities
                    </td>
                  </tr>
                  <tr className="activity">
                    <td>
                      <FontAwesomeIcon
                        className="flechRightIcon"
                        icon={faArrowRight}
                      />
                    </td>
                    <td className="dateAtctivity">22 Nov</td>
                    <td className="contenuActivity">
                      Everyone realizes why a new common language would be
                      desirable...Read More
                    </td>
                  </tr>
                  <tr className="activity">
                    <td>
                      <FontAwesomeIcon
                        className="flechRightIcon"
                        icon={faArrowRight}
                      />
                    </td>
                    <td className="dateAtctivity">22 Nov</td>
                    <td className="contenuActivity">
                      Responded to need “Volunteer Activities
                    </td>
                  </tr>
                  <tr className="activity">
                    <td>
                      <FontAwesomeIcon
                        className="flechRightIcon"
                        icon={faArrowRight}
                      />
                    </td>
                    <td className="dateAtctivity">22 Nov</td>
                    <td className="contenuActivity">
                      Everyone realizes why a new common language would be
                      desirable...Read More
                    </td>
                  </tr>
                </table>
              </div>
              <Link className="buttonVoirPlus" to="#">
                <div className="button">
                  <div className="txt">Voir plus</div>
                  <FontAwesomeIcon className="flechIcon" icon={faArrowRight} />
                </div>
              </Link>
            </div>
          </div>
          <div className="grapheGenerale-descriptif-equipe">
            <div className="descriptif-technologie">
              <div className="descriptif">
                <div className="haut-projet-p">
                  <div className="haut-projet-gauche-p">
                    <div className="projetBackGround-p">
                      <div className="projetBackGround-img-p" />
                    </div>
                  </div>
                  <div className="haut-projet-droit-p">
                    <div className="nomApplication-p">JEXAMEN</div>
                    <div className="descriptionApplication-p">
                      Une application de passage des examens en ligne
                    </div>
                  </div>
                </div>
                <div className="bas-projet-p">
                  <div className="bas-projet-gauche-p">
                    <div className="bas-profile-droit-dateDebut-p">
                      <FontAwesomeIcon
                        className="debutIcon-p"
                        icon={faCalendarCheck}
                      />
                      <div className="bas-profile-droit-dateDebut-txt-p">
                        <div className="top-p">Debut Stage</div>
                        <div className="date-p">27 avril 2023</div>
                      </div>
                    </div>
                    <div className="bas-profile-droit-dateFin-p">
                      <FontAwesomeIcon
                        className="finIcon-p"
                        icon={faCalendarAlt}
                      />
                      <div className="bas-profile-droit-dateFin-txt-p">
                        <div className="top-p">Fin Stage</div>
                        <div className="date-p">30 juin 2023</div>
                      </div>
                    </div>
                  </div>
                  <div className="bas-projet-droit-p">
                    <div className="projet-img-p" />
                    <div className="under-logo-p">
                      <div className="nomProjet-p">JEXAMEN</div>
                      <div className="typeProjet-p">Mobile</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="technologie-p">
                <div className="entete">Technologies Utilisées</div>
                <div className="technologies-p">
                  <div className="technologieonContainer-p">
                    <img
                      src={technologies[currentTechnologie].image}
                      alt="Technologie Image"
                      className="technologieImage-p"
                    />
                    <div className="horizantaleLine-p" />
                    <div className="nomTechnologie-p">
                      {technologies[currentTechnologie].nom}
                    </div>
                  </div>
                  <div className="buttonsContainer">
                    {" "}
                    {currentTechnologie > 0 && (
                      <button onClick={prevTechnologie} className="suivant">
                        <FontAwesomeIcon
                          className="precedentIcon-p"
                          icon={faArrowLeft}
                        />
                      </button>
                    )}
                    {currentTechnologie < technologies.length - 1 && (
                      <button onClick={nextTechnologie} className="precedent">
                        <FontAwesomeIcon
                          className="suivantIcon-p"
                          icon={faArrowRight}
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grapheGenerale"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Projet;
