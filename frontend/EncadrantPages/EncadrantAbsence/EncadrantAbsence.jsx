import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Header from "../../components/Header/Header";
import { FaTrash } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import "./Absence.css";
import settingsImage from "./../../images/Settings.png";
import stagiaireImage from "./../../images/user.jpg";
import { EncadrantContext } from "../../Contexts/EncadrantContext";
import EncadrantSidebar from "../../components/Sidebar/EncadrantSidebar";

const StagiaireBox = ({ stagiaire }) => (
  <div className="stagiaire-box">
    <div className="profile-picture-wrapper">
      <img className="profile-picture" src={stagiaire.image} alt="Profile" />
    </div>
    <h2 className="stagiaire-name">{stagiaire.profile}</h2>
    <div className="detail presence-days">
      <span>Absence du mois </span>
      <span>{stagiaire.absence_du_mois}</span>
    </div>
    <div className="detail latest-absence">
      <span>Dernier absence </span>
      <span>{stagiaire.derniere_absence}</span>
    </div>
    <div className="detail status">
      <span>Status d'aujourd'hui </span>
      <span className={`status-value ${stagiaire.status_d_aujourd_hui}`}>
        {stagiaire.status_d_aujourd_hui}
      </span>
    </div>
    <Link className="projet-voir-detail">Voir détail</Link>
  </div>
);

function EncadrantAbsence() {
  const [searchResults, setSearchResults] = useState([]); // New state for the search results
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState("");

  const handleSearchTermChange = (searchTerm) => {
    // Filter the stagiaires array when the search term changes
    const results = stagiaires.filter((stagiaire) =>
      stagiaire.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(searchTerm !== "");
    setSearchingText(searchTerm !== "" ? "Résultat de la recherche" : "");
  };

  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleDeleteButtonClick = () => {
    setSelectedImage(null);
  };

  const navigateTo = useNavigate();
  const { encadrant, loading } = useContext(EncadrantContext);
  const encadrantContext = useContext(EncadrantContext);

  useEffect(() => {
    const encadrantData = localStorage.getItem("encadrant");
    if (!encadrantData && !loading) {
      // Admin data doesn't exist in localStorage, redirect to LoginPage
      navigateTo("/encadrant/login");
    } else if (encadrantData && !encadrant) {
      // Admin data exists in localStorage but not in context, set the admin context
      encadrantContext.setEncadrant(JSON.parse(encadrantData));
    }
  }, [encadrant, loading, navigateTo, encadrantContext]);

  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });

  const [stagiaires, setStagiaires] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stagiaires/absences")
      .then((response) => response.json())
      .then((data) => setStagiaires(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  const pageCount = Math.ceil(stagiaires.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  let paginationItems = [];

  if (pageCount <= 5) {
    paginationItems = pageNumbers;
  } else {
    if (currentPage <= 3) {
      paginationItems = [...pageNumbers.slice(0, 5), "...", pageCount];
    } else if (currentPage >= pageCount - 2) {
      paginationItems = [
        1,
        "...",
        ...pageNumbers.slice(currentPage - 2, currentPage + 1),
        "...",
        pageCount,
      ];
    }
  }

  return (
    <div className="app">
      <EncadrantSidebar />
      <main className="main-content">
        <div className="header">
          <div className="admin-container">
            <FontAwesomeIcon className="admin-icon" icon={faCircleUser} />
            <div className="admin-info">
              {encadrant && (
                <>
                  <label className="admin-name">
                    {encadrant.nom} {encadrant.prenom}
                  </label>
                  <label className="admin-post">{encadrant.fonction}</label>
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
        {isSearching && (
          <div className="absence-container-back">
            <label>{searchingText}</label>
            <div className="absence-management-search">
              {searchResults.map((stagiaire, index) => (
                <StagiaireBox key={index} stagiaire={stagiaire} />
              ))}
            </div>
          </div>
        )}
        {!isSearching && (
          <div className="absence-container-back">
            <label>Listes des absences</label>
            <div className="absence-management">
              {stagiaires
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((stagiaire, index) => (
                  <StagiaireBox key={index} stagiaire={stagiaire} />
                ))}
            </div>
            <div className="pagination">
              {paginationItems.map((item, index) => {
                if (typeof item === "number") {
                  return (
                    <button
                      key={index}
                      className={`pagination-btn ${
                        item === currentPage ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(item)}
                    >
                      {item}
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={index}
                      className={`pagination-btn`}
                      style={{ cursor: "default", color: "#ced4da" }}
                      disabled
                    >
                      {item}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default EncadrantAbsence;
