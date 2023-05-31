import React, { useState, useEffect, useRef} from "react";
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
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

// Initialize exporting and exportData modules
exporting(Highcharts);
exportData(Highcharts);

function Homepage() {
  const [searchResults, setSearchResults] = useState([]); // New state for the search results
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState("");
  const [showLinks, setShowLinks] = useState(false);
  const containerRef = useRef(null);

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
  
  const handleSearchTermChange = (searchTerm) => {
    // Filter the stagiaires array when the search term changes
    const results = stagiaires.filter((stagiaire) =>
      stagiaire.nom.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(searchTerm !== "");
    setSearchingText(searchTerm !== "" ? "Résultat de la recherche" : "");
  };

  const stagiaires = [
    {
      id: 1,
      nom: "Rami Salah-eddine",
      email: "ramisalah2002@gmail.com",
      status: "Actif",
      joursStage: "4 jours",
    },
    {
      id: 2,
      nom: "John Doe",
      email: "johndoe@example.com",
      status: "Terminé",
      joursStage: "10 jours",
    },
    {
      id: 3,
      nom: "Rami Salah-eddine",
      email: "ramisalah2002@gmail.com",
      status: "Actif",
      joursStage: "4 jours",
    },
    {
      id: 4,
      nom: "John Doe",
      email: "johndoe@example.com",
      status: "Terminé",
      joursStage: "10 jours",
    },
    {
      id: 5,
      nom: "John Doe",
      email: "johndoe@example.com",
      status: "Terminé",
      joursStage: "10 jours",
    },
    {
      id: 6,
      nom: "Rami Salah-eddine",
      email: "ramisalah2002@gmail.com",
      status: "Actif",
      joursStage: "4 jours",
    },
    {
      id: 7,
      nom: "John Doe",
      email: "johndoe@example.com",
      status: "Terminé",
      joursStage: "10 jours",
    },
  ];

  const [user, setUser] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      // User data not found, navigate to LoginPage
      navigateTo("/encadrant/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigateTo]);

  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });



  //absence chart
  const pieChartOptions = {
    chart: {
      type: 'pie',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      spacing: [0, 0, 0, 0],
      backgroundColor: '#fff',
    },
    title: {
      text: 'Absences',
      y: 20,
      style: {
        fontSize: '18px'
      }
    },
    subtitle: {
      text: '<b>Absence</b><br>120 heures',
      align: 'center',
      verticalAlign: 'middle',
      y: -5,
      style: {
        fontSize: '16px'
      }
    },
    plotOptions: {
      pie: {
        innerSize: '60%',
        dataLabels: {
          enabled: false,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        },
        showInLegend: true
      }
    },
    series: [{
      name: '',
      colorByPoint: true,
      data: [{
        name: 'Absences justifiées',
        y: 50
      }, {
        name: 'Absences non justifiées',
        y: 25
      }, {
        name: 'Présences',
        y: 25
      }, {
        name: 'Jours restants',
        y: 25
      },
    ]
    }],
    lang: {
      decimalPoint: ',',
      thousandsSep: ' ',
      loading: 'Chargement...',
      noData: 'Aucune donnée à afficher',
      contextButtonTitle: 'Menu',
      downloadJPEG: 'Télécharger en JPEG',
      downloadPDF: 'Télécharger en PDF',
      downloadPNG: 'Télécharger en PNG',
      downloadSVG: 'Télécharger en SVG',
      printChart: 'Imprimer le graphique',
      resetZoom: 'Réinitialiser le zoom',
      resetZoomTitle: 'Réinitialiser le zoom à l\'échelle 1:1',
      thousandsSep: ' ',
      decimalPoint: ',',
      viewFullscreen: 'Afficher en plein écran'
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG', 'viewFullscreen']
        }
      }
    }
  };

  //line chart
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const splineChartOptions = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Projects Progress'
    },
    xAxis: {
      categories: categories,
      gridLineWidth: 0, // Hide x-axis grid lines
      lineWidth: 0, // Hide x-axis line
      plotLines: categories.map((category, index) => ({
        value: index, // Position the plot line between each category
        color: '#ccc', // Color of the vertical line
        width: 1, // Width of the vertical line
        zIndex: 3 // Set a higher z-index to make sure it's displayed above the series
      })),
      labels: {
        style: {
          fontWeight: '500', // Make the labels bolder
          fontSize: 14,
          color: "#727b88"
        }
      }
    },
    yAxis: {
      title: {
        text: 'Progrès (%)',
        enabled: false,
      },
      gridLineWidth: 0, // Hide y-axis grid lines
      lineWidth: 0, // Hide y-axis line
      labels: {
        format: '{value}%', // Format the labels as percentages
        style: {
          fontWeight: '600', // Make the labels bolder
          fontSize: 14,
          color: "#727b88"
        }
      }
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
              fillColor: '#000', // Marker color on hover
              lineWidth: 2, // Marker border width on hover
              lineColor: '#fff' // Marker border color on hover
            }
          }
        }
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color};fontWeight:bold">{series.name}</span>: <b>{point.y}%</b><br/>', // Format tooltip with percentage value
    },
    series: [
      {
        name: 'Conception',
        data: [5, 2, 6, 1, 5, 3],
        type: 'spline',
        color: '#2dad73', // Color for Conception line
        marker: {
          symbol: 'circle', // Rounded marker shape
          radius: 4 // Adjust the radius for marker size
        }
      },
      {
        name: 'Frontend',
        data: [0, 5, 1, 6, 4, 1],
        type: 'spline',
        color: '#fcc93e', // Color for Frontend line
        marker: {
          symbol: 'circle', // Rounded marker shape
          radius: 4 // Adjust the radius for marker size
        }
      },
      {
        name: 'Backend',
        data: [1, 7, 4, 5, 3, 6],
        type: 'spline',
        color: '#3077ed', // Color for Backend line
        marker: {
          symbol: 'circle', // Rounded marker shape
          radius: 4 // Adjust the radius for marker size
        }
      }
    ],
    lang: {
      decimalPoint: ',',
      thousandsSep: ' ',
      loading: 'Chargement...',
      noData: 'Aucune donnée à afficher',
      contextButtonTitle: 'Menu',
      downloadJPEG: 'Télécharger en JPEG',
      downloadPDF: 'Télécharger en PDF',
      downloadPNG: 'Télécharger en PNG',
      downloadSVG: 'Télécharger en SVG',
      printChart: 'Imprimer le graphique',
      resetZoom: 'Réinitialiser le zoom',
      resetZoomTitle: 'Réinitialiser le zoom à l\'échelle 1:1',
      thousandsSep: ' ',
      decimalPoint: ',',
      viewFullscreen: 'Afficher en plein écran'
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG', 'viewFullscreen']
        }
      }
    }
  };
  
  
  
  

  

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
              onChange={(event) => handleSearchTermChange(event.target.value)}
            />
          </div>
        </div>
        <div className="body">
          <div className="profile-absence">
            <div className="profile">
              <div className="haut-profile">
                <div className="bienvenue">
                  <div className="haut-bienvenue">Bienvenue Salah-eddine !</div>
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
                <div className="bas-profile-gauche">
                  <div className="img-profile" />
                  <div className="bas-profile-gauche-text">
                    <div className="nomStagiare">Rami Salah-eddine</div>
                    <div className="formation">Génie Logiciel</div>
                  </div>
                </div>
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
                    <Link className="viewButton" to="#">
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
              <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
            </div>
          </div>
          <div className="progression-reunion-projet">
            <div className="progression">
              <HighchartsReact highcharts={Highcharts} options={splineChartOptions} />
            </div>
            <div className="reunion-projet">
              <div className="projet">
                <div className="haut-projet">
                  <div className="haut-projet-gauche">
                    <div className="projetBackGround">
                      <div className="projetBackGround-img" />
                    </div>
                  </div>
                  <div className="haut-projet-droit">
                    <div className="nomApplication">JEXAMEN</div>
                    <div className="descriptionApplication">
                      Une application de passage des examens en ligne
                    </div>
                  </div>
                </div>

                <div className="bas-projet">
                  <div className="bas-projet-gauche">
                    <div className="infoEncadrant">
                      <div className="entete-image">
                        <div className="entete">Encadrant</div>
                        <div className="imgEncadrant" />
                      </div>
                      <div className="nomEncadrant-fonction">
                        <div className="nomEncadrant">Mr. Fouad Toufik</div>
                        <div className="fonction">Enseignant</div>
                      </div>
                    </div>
                    <Link className="linkEncadrant" to="#">
                      <div className="linkTxt">Encadrant Profile</div>
                      <FontAwesomeIcon
                        className="flecheDroit"
                        icon={faArrowRight}
                      />
                    </Link>
                  </div>
                  <div className="bas-projet-droit">
                    <div className="projet-img" />
                    <div className="under-logo">
                      <div className="nomProjet">JEXAMEN</div>
                      <div className="typeProjet">Mobile</div>
                      <Link className="viewProjetButton" to="#">
                        <div className="voirDetailsProjet">voir details</div>
                        <FontAwesomeIcon
                          className="flecheDroit"
                          icon={faArrowRight}
                        />
                      </Link>
                    </div>
                  </div>
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

export default Homepage;
