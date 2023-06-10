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
import StagiaireSidebar from "../../components/Sidebar/StagiaireSidebar";

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
        const { id } = JSON.parse(stagiaireData); // Use the id from the local storage
        const response = await fetch(
          `http://127.0.0.1:8000/api/stagiaire/${id}`
        );
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
    const fetchEquipe = async () => {
      try {
        const stagiaireData = localStorage.getItem("stagiaire");
        const { equipe_id } = JSON.parse(stagiaireData);
        const response = await fetch(
          `http://127.0.0.1:8000/api/equipe/${equipe_id}/stagiaires`
        );
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

    fetchEquipe();
  }, []);



  ///fetch les details de l'equipe : 
  const [detailsEquipe, setDetailsEquipe] = useState({});

  useEffect(() => {
    const fetchEquipeDetails = async () => {
      try {
        const stagiaireData = localStorage.getItem("stagiaire");
        const { equipe_id } = JSON.parse(stagiaireData);  // Use the id from the local storage
        const response = await fetch(`http://127.0.0.1:8000/api/equipes/${equipe_id}`);
        const data = await response.json();
        setDetailsEquipe(data);
      } catch (error) {
        console.error('Failed to fetch equipe details:', error);
      }
    };

    fetchEquipeDetails();
  }, []);

  return (
    <div className="app">
      <StagiaireSidebar />
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
            {data && data.equipe && data.equipe.projets && (
              <div className="projetInformations">
                <div className="sideInformations">Projet</div>
                <img
                  src={data.equipe.projets[0].image}
                  className="projetImage"
                  alt="projetImage"
                />
                <div className="projetText">
                  <div className="header-nom">{data.equipe.projets[0].sujet}</div>
                  <div className="header-type">{data.equipe.projets[0].type}</div>
                </div>
              </div>
            )}
            <div className="vertical-line" />
            {data && data.equipe && data.equipe.encadrant && (
              <div className="encadrantInformations">
                <div className="sideInformations">Encadrant</div>
                <img
                  src={data.equipe.encadrant.image}
                  className="encadrantImage"
                  alt="encadrantImage"
                />

                <div className="encadrantText">
                  <div className="header-nom">
                    {data.equipe.encadrant.nom} {data.equipe.encadrant.prenom}
                  </div>
                  <div className="header-fonction">
                    {data.equipe.encadrant.fonction}
                  </div>
                </div>
              </div>
            )}
            <div className="vertical-line" />
            <div className="equipeInformations">
              <div className="sideInformations">Stagiaires</div>
              {equipe.map((stagiaire) => (
                <div key={stagiaire.id} className="membreInformations">
                  <img src={stagiaire.image} className="stagiaireImage" alt="stagiaireImage" />
                  <div className="stagiaireText">
                    <div className="header-nom">{stagiaire.nom} {stagiaire.prenom}</div>
                    <div className="header-formation">{stagiaire.formation}</div>
                  </div>
                </div>
              ))}
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
              {detailsEquipe && detailsEquipe.progres_total && (
                <div className="progressionGenerale">
                  <FontAwesomeIcon
                    className="parametresIcon"
                    icon={faChartSimple}
                  />
                  <div className="pourcentageProgressionGenerale">{detailsEquipe.progres_total.toFixed(2)}%</div>
                  <div className="underTextProgressionGenerale">
                    {detailsEquipe.progres_total < 25 && "Vous êtes encore au début de votre projet."}
                    {detailsEquipe.progres_total >= 25 && detailsEquipe.progres_total < 50 && "Vous avez fait des progrès, continuez !"}
                    {detailsEquipe.progres_total >= 50 && detailsEquipe.progres_total < 75 && "Vous êtes à mi-chemin vers la fin du projet !"}
                    {detailsEquipe.progres_total >= 75 && detailsEquipe.progres_total < 100 && "Vous êtes presque là, ne relâchez pas vos efforts !"}
                    {detailsEquipe.progres_total === 100 && "Félicitations, vous avez terminé votre projet !"}
                  </div>
                </div>
              )}


              {detailsEquipe && detailsEquipe.avancements_types &&(
                <table className="progressionsProjet">
                  <tr className="progressionConception">
                    <td className="progressionText">{detailsEquipe.avancements_types[0].type}</td>
                    <td className="progressionPourcentage">{detailsEquipe.avancements_types[0].progres_type}%</td>
                    <td className="progressionBar">
                      <div
                        className="progressionConceptionBar"
                        style={{ width: `${1.75 * detailsEquipe.avancements_types[0].progres_type}px` }}
                      />
                    </td>
                  </tr>
                  <tr className="progressionFontEnd">
                    <td className="progressionText">FrontEnd</td>
                    <td className="progressionPourcentage">{detailsEquipe.avancements_types[1].progres_type}%</td>
                    <td className="progressionBar">
                      <div
                        className="progressionFontEndBar"
                        style={{ width: `${1.75 * detailsEquipe.avancements_types[1].progres_type}px` }}
                      />
                    </td>
                  </tr>
                  <tr className="progressionBackEnd">
                    <td className="progressionText">BackEnd</td>
                    <td className="progressionPourcentage">{detailsEquipe.avancements_types[2].progres_type}%</td>
                    <td className="progressionBar">
                      <div
                        className="progressionBackEndBar"
                        style={{ width: `${1.75 * detailsEquipe.avancements_types[2].progres_type}px` }}
                      />
                    </td>
                  </tr>
                </table>
              )}
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
              <Link className="buttonVoirPlus" to="/stagiaire/activités">
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
              {( data && data.equipe && data.equipe.projets && data.equipe.projets.length > 0 &&
                <div className="haut-projet-p">
                  <div className="haut-projet-gauche-p">
                    <div className="projetBackGround-p">
                      <div className="projetBackGround-img-p" />
                    </div>
                  </div>
                  <div className="haut-projet-droit-p">
                    <div className="nomApplication-p">{data.equipe.projets[0].sujet}</div>
                    <div className="descriptionApplication-p">
                    {data.equipe.projets[0].description}
                    </div>
                  </div>
                </div>
              )}
                {detailsEquipe && detailsEquipe.stagiaires && detailsEquipe.stagiaires.length > 0 && detailsEquipe.stagiaires[0].stage &&(
                  <div className="bas-projet-p">
                    <div className="bas-projet-gauche-p">
                      <div className="bas-profile-droit-dateDebut-p">
                        <FontAwesomeIcon
                          className="debutIcon-p"
                          icon={faCalendarCheck}
                        />
                        <div className="bas-profile-droit-dateDebut-txt-p">
                          <div className="top-p">Debut Stage</div>
                          <div className="date-p">{detailsEquipe.stagiaires[0].stage.date_Debut}</div>
                        </div>
                      </div>
                      <div className="bas-profile-droit-dateFin-p">
                        <FontAwesomeIcon
                          className="finIcon-p"
                          icon={faCalendarAlt}
                        />
                        <div className="bas-profile-droit-dateFin-txt-p">
                          <div className="top-p">Fin Stage</div>
                          <div className="date-p">{detailsEquipe.stagiaires[0].stage.date_Fin}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bas-projet-droit-p">
                      <div style={{ backgroundImage: `url(${data.equipe.projets[0].image})` }} className="projet-img-p" />
                      <div className="under-logo-p">
                        <div className="nomProjet-p">{data.equipe.projets[0].sujet}</div>
                        <div className="typeProjet-p">{data.equipe.projets[0].type}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="technologie-p">
                <div className="entete">Technologies Utilisées</div>
                <div className="technologies-p">
                  {detailsEquipe &&
                    detailsEquipe.projets &&
                    detailsEquipe.projets.length > 0 &&
                    detailsEquipe.projets[0].technologies &&
                    detailsEquipe.projets[0].technologies.length > 0 && (
                      <div>
                        <div className="technologieonContainer-p" key={currentTechnologie}>
                          <img
                            src={detailsEquipe.projets[0].technologies[currentTechnologie].image}
                            alt="Technologie Image"
                            className="technologieImage-p"
                          />
                          <div className="horizantaleLine-p" />
                          <div className="nomTechnologie-p">
                            {detailsEquipe.projets[0].technologies[currentTechnologie].nom_technologie}
                          </div>
                        </div>
                    
                        <div className="buttonsContainer">
                          {currentTechnologie > 0 && (
                            <button onClick={prevTechnologie} className="suivant">
                              <FontAwesomeIcon className="precedentIcon-p" icon={faArrowLeft} />
                            </button>
                          )}
                          {currentTechnologie < detailsEquipe.projets[0].technologies.length - 1 && (
                            <button onClick={nextTechnologie} className="precedent">
                              <FontAwesomeIcon className="suivantIcon-p" icon={faArrowRight} />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
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
