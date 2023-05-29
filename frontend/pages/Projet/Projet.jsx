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
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

// Initialize exporting and exportData modules
exporting(Highcharts);
exportData(Highcharts);

function getRandomData() {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push(Math.floor(Math.random() * 100));
  }
  return data;
}

function Projet() {

  const projectProgressOptions = {
    chart: {
      type: 'column',
      width: '650'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      title: {
        text: 'Semaines'
      }
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Progrès (%)'
      }
    },
    plotOptions: {
      column: {
        groupPadding: 0.1,
        pointPadding: 0.05
      }
    },
    series: [{
      name: 'Progrès du projet',
      data: [20, 40, 60, 80, 90, 100],
      // Set the width of the bars
      pointWidth: 50,
      showInLegend: false
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
    // Add exporting options
    exporting: {
      buttons: {
        contextButton: {
          align: 'right',
          x: 14,
          y: -15,
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
        }
      },
      buttonOptions: {
        theme: {
          zIndex: 999 // set the z-index of the button icon
        }
      }
    }
  };
  

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
      text: ''
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
      name: 'Progrès',
      colorByPoint: true,
      data: [{
        name: 'Terminé',
        y: 66.7
      }, {
        name: 'En cours',
        y: 33.3
      }]
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
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
        }
      }
    }
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
          <div className="projetImage-projetGraphe">
            <div className="projetGraphe-1">
              <HighchartsReact highcharts={Highcharts} options={projectProgressOptions} />
            </div>
            <div className="projetGraphe-2">
              <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Projet;
