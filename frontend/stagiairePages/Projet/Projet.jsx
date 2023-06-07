import React, { useState, useRef, useEffect, useContext } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { StagiaireContext } from "../../Contexts/StagiaireContext";
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

function ProjetStagiaire() {
  const [currentTechnologie, setCurrentTechnologie] = useState(0);
  const navigateTo = useNavigate();

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

  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });


  const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStagiaireData = async () => {
            try {
                const stagiaireData = localStorage.getItem("stagiaire");
                const { id } = JSON.parse(stagiaireData);  // Use the id from the local storage
                const response = await fetch(`http://127.0.0.1:8000/api/stagiaire/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setData(data); // This will contain updated data from server
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchStagiaireData();
    }, []);

    
  const [equipe, setEquipe] = useState([]);
  const [loadingEquipe, setLoadingEquipe] = useState(true);
  const [errorEquipe, setErrorEquipe] = useState(null);

  useEffect(() => {
    const fetchStagiaires = async () => {
      try {
        const stagiaireData = localStorage.getItem("stagiaire");
        const { equipe_id } = JSON.parse(stagiaireData);
        const response = await fetch(`http://127.0.0.1:8000/api/equipe/${equipe_id}/stagiaires`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEquipe(data);
        setLoadingEquipe(false);
      } catch (error) {
        setErrorEquipe(error);
        setLoadingEquipe(false);
      }
    };

    fetchStagiaires();
  }, []);


  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className="header">
          <div className="admin-container">
            <FontAwesomeIcon className="admin-icon" icon={faCircleUser} />
            <div className="admin-info">
              {stagiaire && (
                <>
                  <label className="admin-name">
                    {stagiaire.nom} {stagiaire.prenom}
                  </label>
                  <label className="admin-post">{stagiaire.formation}</label>
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
          {data && data.equipe && data.equipe.projet &&(
            <div className="projetInformations">
              <div className="sideInformations">Projet</div>
              <img
                src={data.equipe.projet.image}
                className="projetImage"
                alt="projetImage"
              />
              <div className="projetText">
                <div className="header-nom">{data.equipe.projet.sujet}</div>
                <div className="header-type">{data.equipe.projet.type}</div>
              </div>
            </div>
          )}
            <div className="vertical-line" />
              {data && data.equipe && data.equipe.encadrant &&(
              <div className="encadrantInformations">
                <div className="sideInformations">Encadrant</div>
                <img
                  src={data.equipe.encadrant.image}
                  className="encadrantImage"
                  alt="encadrantImage"
                />
  
                <div className="encadrantText">
                  <div className="header-nom">{data.equipe.encadrant.nom} {data.equipe.encadrant.prenom}</div>
                  <div className="header-fonction">{data.equipe.encadrant.fonction}</div>
                </div>
              </div>
              )}
            <div className="vertical-line" />
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
            <div className="vertical-line" />
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

export default ProjetStagiaire;
