import React, { useState, useRef, useEffect, useContext } from "react";
import StagiaireSidebar from "../../components/Sidebar/StagiaireSidebar";
import { AdminContext } from "../../Contexts/AdminContext";
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
  faCalendarPlus,
  faDownload,
  faCalendarTimes,
  faCalendarWeek,
  faCalendarCheck,
  faFlushed,
  faArrowAltCircleDown,
  faArrowRight,
  faUserAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import "../Homepage/Homepage.css";
import profileBoxImage from "../../images/profile-img.png";
import imgProfile from "../../images/user.jpg";
import projetImage from "../../images/projetImage.jpg";
import projetBackGround from "../../images/projetBackground.png";
import MonthProgress from "../../charts/MonthProgress";
import WeekProgress from "../../charts/WeekProgress";
import Absence from "../../charts/Absence";
import AllTimeProgress from "../../charts/AllTimeProgress";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";
import { StagiaireContext } from "../../Contexts/StagiaireContext";

// Initialize exporting and exportData modules
exporting(Highcharts);
exportData(Highcharts);

function StagiaireHomepage() {
  const [searchResults, setSearchResults] = useState([]); // New state for the search results
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState("");
  const [showLinks, setShowLinks] = useState(false);
  const containerRef = useRef(null);
  const [AllTimeProgressLink, setAllTimeLink] = useState("Tout le temps");
  const [MonthProgressLink, setMonthProgressLink] = useState("Ce mois-ci");
  const [WeekProgressLink, setWeekProgressLink] = useState("Cette semaine");
  const [activeLink, setActiveLink] = useState(AllTimeProgressLink);

  const absence_data = [
    { nom: "Absences justifiées", nbr_jours: 10, color: "#3176ed" },
    { nom: "Absences non justifiées", nbr_jours: 20, color: "#544fc5" },
    { nom: "Présences", nbr_jours: 30, color: "#00de70" },
    { nom: "Jours restants", nbr_jours: 40, color: "#fcc93e" },
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowLinks(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  const handleLinkClick = (link) => {
    setActiveLink(link);
    toggleLinks();
  };

  const handleSearchTermChange = (searchTerm) => {
    // Filter the stagiaires array when the search term changes
    const results = stagiaires.filter((stagiaire) =>
      stagiaire.nom.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(searchTerm !== "");
    setSearchingText(searchTerm !== "" ? "Résultat de la recherche" : "");
  };

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

  const [projets, setProjets] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projets/details")
      .then((response) => response.json())
      .then((data) => setProjets(data))
      .catch((error) => console.error("Erreur:", error));
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
                  <label className="admin-post">{stagiaire.formarion}</label>
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
              onChange={(event) => handleSearchTermChange(event.target.value)}
            />
          </div>
        </div>
        <div className="body">
          <div className="profile-absence">
            <div className="profile">
              <div className="haut-profile">
                <div className="bienvenue">
                  {stagiaire && (
                    <div className="haut-bienvenue">
                      {stagiaire.nom} {stagiaire.prenom}
                    </div>
                  )}
                  <div className="bas-bienvenue">
                    Bienvenue dans votre espace de stage
                  </div>
                </div>
                <div className="image-haut-profile">
                  <img
                    className="image-box"
                    src={profileBoxImage}
                    alt="profileBoxImage"
                  />
                </div>
              </div>
              <div className="bas-profile">
                {stagiaire && (
                  <div className="bas-profile-gauche">
                    <div
                      style={{ backgroundImage: `url(${stagiaire.image})` }}
                      className="img-profile"
                    />
                    <div className="bas-profile-gauche-text">
                      <div className="nomStagiare">
                        {stagiaire.nom} {stagiaire.prenom}
                      </div>
                      <div className="formation">{stagiaire.formation}</div>
                    </div>
                  </div>
                )}

                <div className="bas-profile-droit">
                  <div className="bas-profile-droit-date">
                    <div className="bas-profile-droit-dateDebut">
                      <FontAwesomeIcon
                        className="debutIcon"
                        icon={faCalendarCheck}
                      />
                      <div className="bas-profile-droit-dateDebut-txt">
                        <div className="top">Debut Stage</div>
                        <div className="date">27 avril 2023</div>
                      </div>
                    </div>
                    <div className="bas-profile-droit-dateFin">
                      <FontAwesomeIcon
                        className="finIcon"
                        icon={faCalendarAlt}
                      />
                      <div className="bas-profile-droit-dateFin-txt">
                        <div className="top">Fin Stage</div>
                        <div className="date">30 juin 2023</div>
                      </div>
                    </div>
                  </div>
                  <div className="bas-profile-droit-viewProfile">
                    <Link className="viewButton" to="/stagiaire/mon-profile">
                      <div className="txtViewPofile">voir profile</div>
                      <FontAwesomeIcon
                        className="flecheDroit"
                        icon={faArrowRight}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absence">
              <div className="absence-chart-header">
                <label className="absence-chart-title">Absences</label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div className="circle-chart-absence">
                  <label className="label-1">12 jours</label>
                  <label className="label-2">Total Abs.</label>
                </div>
                <Absence />
              </div>
              <div className="absence-chart-bottom">
                <div className="abscence-chart-div">
                  <div className="point-name-container">
                    <div
                      style={{ background: absence_data[0].color }}
                      className="point-circle"
                    ></div>
                    <label>{absence_data[0].nom}</label>
                  </div>
                  <div>{absence_data[0].nbr_jours}</div>
                </div>
                <div className="abscence-chart-div">
                  <div className="point-name-container">
                    <div
                      style={{ background: absence_data[1].color }}
                      className="point-circle"
                    ></div>
                    <label>{absence_data[1].nom}</label>
                  </div>
                  <div>{absence_data[1].nbr_jours}</div>
                </div>
                <div className="abscence-chart-div">
                  <div className="point-name-container">
                    <div
                      style={{ background: absence_data[2].color }}
                      className="point-circle"
                    ></div>
                    <label>{absence_data[2].nom}</label>
                  </div>
                  <div>{absence_data[2].nbr_jours}</div>
                </div>
                <div className="abscence-chart-div">
                  <div className="point-name-container">
                    <div
                      style={{ background: absence_data[3].color }}
                      className="point-circle"
                    ></div>
                    <label>{absence_data[3].nom}</label>
                  </div>
                  <div>{absence_data[3].nbr_jours}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="progression-reunion-projet">
            <div className="progression">
              <div className="absence-chart-header">
                <label className="absence-chart-title">Progrès du projet</label>
                <div className="change-filter-wrapper" ref={containerRef}>
                  <Link
                    className={`change-filter-link`}
                    onClick={() => toggleLinks()}
                  >
                    {activeLink}
                  </Link>
                  {showLinks && (
                    <div className="change-links-container">
                      <Link
                        className={`change-link`}
                        onClick={() => handleLinkClick(AllTimeProgressLink)}
                      >
                        {AllTimeProgressLink}
                      </Link>
                      <Link
                        className={`change-link`}
                        onClick={() => handleLinkClick(MonthProgressLink)}
                      >
                        {MonthProgressLink}
                      </Link>
                      <Link
                        className={`change-link`}
                        onClick={() => handleLinkClick(WeekProgressLink)}
                      >
                        {WeekProgressLink}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              {/* filter */}
              <div className="indicators-conteiner">
                <div className="indicator-container">
                  <div
                    style={{ background: "#2dad73" }}
                    className="point-circle"
                  />
                  <label>Conception</label>
                </div>
                <div className="indicator-container">
                  <div
                    style={{ background: "#fcc93e" }}
                    className="point-circle"
                  />
                  <label>Frontend</label>
                </div>
                <div className="indicator-container">
                  <div
                    style={{ background: "#3077ed" }}
                    className="point-circle"
                  />
                  <label>Backend</label>
                </div>
              </div>
              {activeLink === MonthProgressLink && <MonthProgress />}
              {activeLink === WeekProgressLink && <WeekProgress />}
              {activeLink === AllTimeProgressLink && <AllTimeProgress />}
            </div>
            <div className="reunion-projet">
              <div className="projet">
                <div className="haut-projet">
                  <div className="haut-projet-gauche">
                    <div className="projetBackGround">
                      <div className="projetBackGround-img" />
                    </div>
                  </div>
                  {data && data.equipe && data.equipe.projet && (
                    <div className="haut-projet-droit">
                      <div className="nomApplication">
                        {data.equipe.projet.sujet}
                      </div>
                      <div className="descriptionApplication">
                        {data.equipe.projet.description}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bas-projet">
                  <div className="bas-projet-gauche">
                    <div className="infoEncadrant">
                      <div className="entete-image">
                        <div className="entete">Encadrant</div>
                        {data && data.equipe && data.equipe.encadrant && (
                          <div
                            style={{
                              backgroundImage: `url(${data.equipe.encadrant.image})`,
                            }}
                            className="imgEncadrant"
                          />
                        )}
                      </div>
                      {data && data.equipe && data.equipe.encadrant && (
                        <div className="nomEncadrant-fonction">
                          <div className="nomEncadrant">
                            {data.equipe.encadrant.nom}{" "}
                            {data.equipe.encadrant.prenom}
                          </div>
                          <div className="fonction">
                            {data.equipe.encadrant.fonction}
                          </div>
                        </div>
                      )}
                    </div>
                    <Link className="linkEncadrant" to="#">
                      <div className="linkTxt">Encadrant Profile</div>
                      <FontAwesomeIcon
                        className="flecheDroit"
                        icon={faArrowRight}
                      />
                    </Link>
                  </div>
                  {stagiaire && data && data.equipe && data.equipe.projet && (
                    <div className="bas-projet-droit">
                      <div
                        style={{
                          backgroundImage: `url(${data.equipe.projet.image})`,
                        }}
                        className="projet-img"
                      />
                      <div className="under-logo">
                        <div className="nomProjet">
                          {data.equipe.projet.sujet}
                        </div>
                        <div className="typeProjet">
                          {data.equipe.projet.type}
                        </div>
                        <Link className="viewProjetButton" to="#">
                          <div className="voirDetailsProjet">voir details</div>
                          <FontAwesomeIcon
                            className="flecheDroit"
                            icon={faArrowRight}
                          />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="reunion-logo">
                <div className="reunion">
                  <div className="reunion-info">
                    <div className="nomEncadrant-reunion">
                      <FontAwesomeIcon
                        className="icon-info-reunion"
                        icon={faUserAlt}
                      />
                      <div className="txt-info-reunion">Mr. Fouad Toufik</div>
                    </div>
                    <div className="dateReunion">
                      <FontAwesomeIcon
                        className="icon-info-reunion"
                        icon={faCalendarWeek}
                      />
                      <div className="txt-info-reunion">20 juin 2023</div>
                    </div>
                    <div className="lieuReunion">
                      <FontAwesomeIcon
                        className="icon-info-reunion"
                        icon={faMapMarkerAlt}
                      />
                      <div className="txt-info-reunion">Bureau Mr. Toufik</div>
                    </div>
                  </div>
                  <div className="bas-reunion">
                    <div className="bas-reunion-txt">REUNION</div>
                    <div className="bas-reunion-backgound" />
                  </div>
                </div>
                <div className="logo-under">
                  <div className="logo-background" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StagiaireHomepage;
