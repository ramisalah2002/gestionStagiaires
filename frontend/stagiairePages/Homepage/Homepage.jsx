import React, { useState, useRef, useEffect, useContext } from "react";
import StagiaireSidebar from "../../components/Sidebar/StagiaireSidebar";
import { Link, useNavigate } from "react-router-dom";
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
import MonthProgress from "../../charts/MonthProgress";
import WeekProgress from "../../charts/WeekProgress";
import Absence from "../../charts/Absence";
import AllTimeProgress from "../../charts/AllTimeProgress";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import axios from "axios";
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
  const [WeekProgressLink, setWeekProgressLink] = useState("Cette semaine");
  const [activeLink, setActiveLink] = useState(AllTimeProgressLink);
  const [lastFourAv, setLastFourAv] = useState([]);


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

  //getting last 4 avancements

  const fetchLastFourAvancements = (projetId) => {
    fetch(`http://127.0.0.1:8000/api/projet/${projetId}/avancements`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setLastFourAv(data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
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
      // stagiaireContext.setStagiaire(JSON.parse(stagiaireData));
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
        console.log(data);
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

  const [detailsEquipe, setDetailsEquipe] = useState({});

  useEffect(() => {
    const fetchEquipeDetails = async () => {
      try {
        const stagiaireData = localStorage.getItem("stagiaire");
        const { equipe_id } = JSON.parse(stagiaireData); // Use the id from the local storage
        const response = await fetch(
          `http://127.0.0.1:8000/api/equipes/${equipe_id}`
        );
        const data = await response.json();
        setDetailsEquipe(data);
      } catch (error) {
        console.error("Failed to fetch equipe details:", error);
      }
    };
    fetchEquipeDetails();
  }, []);


    const fetchAvData = async () => {
      try {
        // Check if stagiaire exists
        if (stagiaire) {
          const response = await axios.get(`http://127.0.0.1:8000/api/stagiaire/${stagiaire.id}/avancements`);
          setAvancements(response.data);
          fetchAvancement(response.data.projet_id);
          
        }
      } catch (error) {
        console.log(error);
      }
    };

  const [chartData, setChartData] = useState([]);
  const [allTimeChartData, setAllTimeChartData] = useState([]);

  const [avancements, setAvancements] = useState([]);
  const [avancementTypes, setAvancementTypes] = useState([]);

  const fetchAvancement = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/avancements/${id}`
      );
      const data = await response.json();
      setAvancementTypes(data);
    } catch (error) {
      console.error("Error fetching avancements:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if stagiaire exists
        if (stagiaire) {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/stagiaire/${stagiaire.id}/avancements`
          );
          setAvancements(response.data);
          fetchAvancement(response.data.projet_id);
          fetchWeekData(response.data.projet_id);
          fetchAllTimeData(response.data.projet_id);
          fetchLastFourAvancements(response.data.projet_id);
          console.log(lastFourAv);
          console.log(allTimeChartData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [stagiaire]); // Add stagiaire as a dependency

  const fetchWeekData = async (idProjet) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/projet/${idProjet}/avancements/this-week`
      );
      setChartData(response.data.avancementByTypeAndDay);
    } catch (error) {
      console.error("Error fetching avancements:", error);
    }
  };

  const fetchAllTimeData = async (idProjet) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/projet/${idProjet}/avancements/all-time`
      );
      setAllTimeChartData(response.data.avancementByTypeAndDay);
    } catch (error) {
      console.error("Error fetching avancements:", error);
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////// WEEK PROGRESS CHART ////////////////////////////////////////////////

  const categories = Object.keys(chartData); // Add a check for the existence of avancementByTypeAndDay
  const days = Object.keys(chartData.avancementByTypeAndDay || {}); // Add a check for the existence of avancementByTypeAndDay
  const allTimeCategories = Object.keys(allTimeChartData); // Add a check for the existence of avancementByTypeAndDay
  const allDays = Object.keys(allTimeChartData.avancementByTypeAndDay || {}); // Add a check for the existence of avancementByTypeAndDay

  const frontendData = [];
  const backendData = [];
  const conceptionData = [];

  const allTimeFrontendData = [];
  const allTimeBackendData = [];
  const allTimeConceptionData = [];

  Object.entries(chartData).forEach(([date, types]) => {
    frontendData.push(types.frontend.length > 0 ? types.frontend[0].valeur : 0);
    backendData.push(types.backend.length > 0 ? types.backend[0].valeur : 0);
    conceptionData.push(
      types.conception.length > 0 ? types.conception[0].valeur : 0
    );
  });

  Object.entries(allTimeChartData).forEach(([date, types]) => {
    allTimeFrontendData.push(
      types.frontend.length > 0 ? types.frontend[0].valeur : 0
    );
    allTimeBackendData.push(
      types.backend.length > 0 ? types.backend[0].valeur : 0
    );
    allTimeConceptionData.push(
      types.conception.length > 0 ? types.conception[0].valeur : 0
    );
  });

  const series = Object.keys(chartData).map((day) => {
    const data = Object.keys(chartData[day]).map((type) => ({
      name: type,
      y: chartData[day][type].length > 0 ? chartData[day][type][0].valeur : 0,
    }));

    return {
      name: day,
      data,
      type: "spline",
      marker: {
        symbol: "circle",
        radius: 4,
      },
    };
  });

  const allTimeSeries = Object.keys(allTimeChartData).map((day) => {
    const data = Object.keys(allTimeChartData[day]).map((type) => ({
      name: type,
      y:
        allTimeChartData[day][type].length > 0
          ? allTimeChartData[day][type][0].valeur
          : 0,
    }));

    return {
      name: day,
      data,
      type: "spline",
      marker: {
        symbol: "circle",
        radius: 4,
      },
    };
  });

  const splineChartOptions = {
    chart: {
      type: "spline",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categories,
      gridLineWidth: 0,
      lineWidth: 0,
      plotLines: categories.map((category, index) => ({
        value: index,
        color: "#ccc",
        width: 1,
        zIndex: 3,
      })),
      labels: {
        style: {
          fontWeight: "500",
          fontSize: 14,
          color: "#727b88",
        },
      },
    },
    yAxis: {
      title: {
        text: "Progrès (%)",
        enabled: false,
      },
      gridLineWidth: 0, // Hide y-axis grid lines
      lineWidth: 0, // Hide y-axis line
      labels: {
        format: "{value}%", // Format the labels as percentages
        style: {
          fontWeight: "600", // Make the labels bolder
          fontSize: 14,
          color: "#727b88",
        },
      },
    },
    plotOptions: {
      series: {
        showInLegend: false,
        lineWidth: 2, // Set the line width to 2px
        marker: {
          enabled: false, // Disable markers by default
          states: {
            hover: {
              enabled: true, // Enable markers on hover
              fillColor: "#000", // Marker color on hover
              lineWidth: 2, // Marker border width on hover
              lineColor: "#fff", // Marker border color on hover
            },
          },
        },
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color};fontWeight:bold">{series.name}</span>: <b>{point.y}%</b><br/>', // Format tooltip with percentage value
    },
    series: [
      {
        name: "Conception",
        data: conceptionData,
        type: "spline",
        color: "#2dad73", // Color for Conception line
        marker: {
          symbol: "circle", // Rounded marker shape
          radius: 4, // Adjust the radius for marker size
        },
      },
      {
        name: "Frontend",
        data: frontendData,
        type: "spline",
        color: "#fcc93e", // Color for Frontend line
        marker: {
          symbol: "circle", // Rounded marker shape
          radius: 4, // Adjust the radius for marker size
        },
      },
      {
        name: "Backend",
        data: backendData,
        type: "spline",
        color: "#3077ed", // Color for Backend line
        marker: {
          symbol: "circle", // Rounded marker shape
          radius: 4, // Adjust the radius for marker size
        },
      },
    ],
    lang: {
      decimalPoint: ",",
      thousandsSep: " ",
      loading: "Chargement...",
      noData: "Aucune donnée à afficher",
      contextButtonTitle: "Menu",
      downloadJPEG: "Télécharger en JPEG",
      downloadPDF: "Télécharger en PDF",
      downloadPNG: "Télécharger en PNG",
      downloadSVG: "Télécharger en SVG",
      printChart: "Imprimer le graphique",
      resetZoom: "Réinitialiser le zoom",
      resetZoomTitle: "Réinitialiser le zoom à l'échelle 1:1",
      thousandsSep: " ",
      decimalPoint: ",",
      viewFullscreen: "Afficher en plein écran",
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
            "viewFullscreen",
          ],
        },
      },
    },
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////// ALL TIME PROGRESS CHART ////////////////////////////////////////////////

  const allTimeSplineChartOptions = {
    chart: {
      type: "spline",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: allTimeCategories,
      gridLineWidth: 0,
      lineWidth: 0,
      plotLines: allTimeCategories.map((category, index) => ({
        value: index,
        color: "#ccc",
        width: 1,
        zIndex: 3,
      })),
      labels: {
        style: {
          fontWeight: "500",
          fontSize: 14,
          color: "#727b88",
        },
      },
    },
    yAxis: {
      title: {
        text: "Progrès (%)",
        enabled: false,
      },
      gridLineWidth: 0, // Hide y-axis grid lines
      lineWidth: 0, // Hide y-axis line
      labels: {
        format: "{value}%", // Format the labels as percentages
        style: {
          fontWeight: "600", // Make the labels bolder
          fontSize: 14,
          color: "#727b88",
        },
      },
    },
    plotOptions: {
      series: {
        showInLegend: false,
        lineWidth: 2, // Set the line width to 2px
        marker: {
          enabled: false, // Disable markers by default
          states: {
            hover: {
              enabled: true, // Enable markers on hover
              fillColor: "#000", // Marker color on hover
              lineWidth: 2, // Marker border width on hover
              lineColor: "#fff", // Marker border color on hover
            },
          },
        },
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color};fontWeight:bold">{series.name}</span>: <b>{point.y}%</b><br/>', // Format tooltip with percentage value
    },
    series: [
      {
        name: "Conception",
        data: allTimeConceptionData,
        type: "spline",
        color: "#2dad73", // Color for Conception line
        marker: {
          symbol: "circle", // Rounded marker shape
          radius: 4, // Adjust the radius for marker size
        },
      },
      {
        name: "Frontend",
        data: allTimeFrontendData,
        type: "spline",
        color: "#fcc93e", // Color for Frontend line
        marker: {
          symbol: "circle", // Rounded marker shape
          radius: 4, // Adjust the radius for marker size
        },
      },
      {
        name: "Backend",
        data: allTimeBackendData,
        type: "spline",
        color: "#3077ed", // Color for Backend line
        marker: {
          symbol: "circle", // Rounded marker shape
          radius: 4, // Adjust the radius for marker size
        },
      },
    ],
    lang: {
      decimalPoint: ",",
      thousandsSep: " ",
      loading: "Chargement...",
      noData: "Aucune donnée à afficher",
      contextButtonTitle: "Menu",
      downloadJPEG: "Télécharger en JPEG",
      downloadPDF: "Télécharger en PDF",
      downloadPNG: "Télécharger en PNG",
      downloadSVG: "Télécharger en SVG",
      printChart: "Imprimer le graphique",
      resetZoom: "Réinitialiser le zoom",
      resetZoomTitle: "Réinitialiser le zoom à l'échelle 1:1",
      thousandsSep: " ",
      decimalPoint: ",",
      viewFullscreen: "Afficher en plein écran",
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            "downloadPNG",
            "downloadJPEG",
            "downloadPDF",
            "downloadSVG",
            "viewFullscreen",
          ],
        },
      },
    },
  };
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
                  {detailsEquipe &&
                    detailsEquipe.stagiaires &&
                    detailsEquipe.stagiaires.length > 0 &&
                    detailsEquipe.stagiaires[0].stage && (
                      <div className="bas-profile-droit-date">
                        <div className="bas-profile-droit-dateDebut">
                          <FontAwesomeIcon
                            className="debutIcon"
                            icon={faCalendarCheck}
                          />
                          <div className="bas-profile-droit-dateDebut-txt">
                            <div className="top">Debut Stage</div>
                            <div className="date">
                              {detailsEquipe.stagiaires[0].stage.date_Debut}
                            </div>
                          </div>
                        </div>
                        <div className="bas-profile-droit-dateFin">
                          <FontAwesomeIcon
                            className="finIcon"
                            icon={faCalendarAlt}
                          />
                          <div className="bas-profile-droit-dateFin-txt">
                            <div className="top">Fin Stage</div>
                            <div className="date">
                              {detailsEquipe.stagiaires[0].stage.date_Fin}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
                      {/* <Link
                        className={`change-link`}
                        onClick={() => handleLinkClick(MonthProgressLink)}
                      >
                        {MonthProgressLink}
                      </Link> */}
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
              {activeLink === WeekProgressLink && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={splineChartOptions}
                  containerProps={{ style: { width: "100%" } }}
                />
              )}
              {activeLink === AllTimeProgressLink && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={allTimeSplineChartOptions}
                  containerProps={{ style: { width: "100%" } }}
                />
              )}
            </div>
            <div className="reunion-projet">
              <div className="projet">
                <div className="haut-projet">
                  <div className="haut-projet-gauche">
                    <div className="projetBackGround">
                      <div className="projetBackGround-img" />
                    </div>
                  </div>
                  {( data && data.equipe && data.equipe.projet &&
                  <div className="haut-projet-droit">
                    <div className="nomApplication">{data.equipe.projet.sujet}</div>
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
                          <div style={{ backgroundImage: `url(${data.equipe.projet.image})` }} className="projet-img" />
                          <div className="under-logo">
                            <div className="nomProjet">{data.equipe.projet.sujet}</div>
                            <div className="typeProjet">{data.equipe.projet.type}</div>
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
