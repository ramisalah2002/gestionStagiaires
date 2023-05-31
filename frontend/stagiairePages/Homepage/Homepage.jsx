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
  faCalendarPlus,
  faCalendarTimes,
  faCalendarWeek,
  faCalendarCheck,
  faFlushed,
  faArrowAltCircleDown,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import "../Homepage/Homepage.css";
import profileBoxImage from "../../images/profile-img.png";
import imgProfile from "../../images/user.jpg";
import projetImage from "../../images/projetImage.jpg";
import projetBackGround from "../../images/projetBackground.png";

function Homepage() {
  const [searchResults, setSearchResults] = useState([]); // New state for the search results
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState("");

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
            <div className="absence"></div>
          </div>
          <div className="progression-reunion-projet">
            <div className="progression"></div>
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
              <div className="reunion"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
