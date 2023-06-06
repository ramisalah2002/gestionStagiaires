import React, { useState, useRef, useEffect, useContext } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
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
  faChevronRight,
  faPlus,
  faListCheck,
  faTimeline,
  faClock,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faRectangleList,
  faClockFour,
} from "@fortawesome/free-regular-svg-icons";
import "./Equipes.css";
const EquipesBox = ({ equipes }) => (
  <div className="team-card">
    <div className="link-header">
      <div className="days-left">
        <FontAwesomeIcon
          className="days-left-icon"
          icon={faStopwatch}
        ></FontAwesomeIcon>
        {equipes.stagiaires.map((stagiaire, index) => {
          if (index === 0) {
            return (
              <label style={{ whiteSpace: "nowrap" }} key={index}>
                {stagiaire.stage.jours_restants} jours
              </label>
            );
          }
          return null;
        })}
      </div>
      <Link className="link">
        <FontAwesomeIcon className="icon-chevron" icon={faChevronRight} />
      </Link>
    </div>
    <div className="team-card-header">
      {equipes.projets[0].technologies.map((technologie, index) => {
        return (
          <label key={index} className="language-label">
            [{technologie.nom_technologie}]
          </label>
        );
      })}
      <br />
      <label className="project-label">{equipes.projets[0].sujet}</label>
    </div>
    <div className="progress-container">
      <div className="progress-title">
        <FontAwesomeIcon icon={faListCheck} />
        <label>Progrès</label>
      </div>
      <label className="progress-nbr">{equipes.progres_total}%</label>
    </div>
    <div className="progress-line-container">
      <div
        style={{ width: `${equipes.progres_total}%` }}
        className="progress-line"
      ></div>
    </div>
    <div className="team-card-footer">
      <div className="team-card-footer-left">
        {equipes.stagiaires.map((stagiaire, index) => {
          return (
            <img
              key={index}
              className="member-img"
              src={stagiaire.image}
              alt={`Stagiaire ${index + 1}`}
            ></img>
          );
        })}
      </div>
      <div className="team-card-footer-right">
        <FontAwesomeIcon className="icon" icon={faCalendarDays} />
        <label>Délai: </label>
        {equipes.stagiaires.map((stagiaire, index) => {
          if (index === 0) {
            return <p key={index}>{stagiaire.stage.date_Fin}</p>;
          }
          return null;
        })}
      </div>
    </div>
  </div>
);

function Equipes() {
  const [searchResults, setSearchResults] = useState([]); // New state for the search results
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });
  const handleSearchTermChange = (searchTerm) => {
    // Filter the stagiaires array when the search term changes
    const results = equipes.filter((equipe) =>
      equipe.nomProjet.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(searchTerm !== "");
    setSearchingText(searchTerm !== "" ? "Résultat de la recherche" : "");
  };

  const navigateTo = useNavigate();
  const { admin, loading } = useContext(AdminContext);
  const adminContext = useContext(AdminContext);

  const [equipes, setEquipes] = useState([]);
  const [stagiaires, setStagiaires] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/equipes/details")
      .then((response) => response.json())
      .then((data) => setEquipes(data))
      .then((data) => console.log(equipes))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData && !loading) {
      // Admin data doesn't exist in localStorage, redirect to LoginPage
      navigateTo("/encadrant/login");
    } else if (adminData && !admin) {
      // Admin data exists in localStorage but not in context, set the admin context
      adminContext.setAdmin(JSON.parse(adminData));
    }
  }, [admin, loading, navigateTo, adminContext]);

  const pageCount = Math.ceil(equipes.length / itemsPerPage);

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
      <Sidebar />
      <main className="main-content">
        <div className="header">
          <div className="admin-container">
            <FontAwesomeIcon className="admin-icon" icon={faCircleUser} />
            <div className="admin-info">
              {admin && (
                <>
                  <label className="admin-name">
                    {admin.nom} {admin.prenom}
                  </label>
                  <label className="admin-post">{admin.fonction}</label>
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
          <div className="teams-container">
            <div className="teams-header">
              <h2>{searchingText}</h2>
            </div>
            <div className="teams-content">
              {searchResults.map((equipe, index) => (
                <EquipesBox key={index} equipes={equipe} />
              ))}
            </div>
          </div>
        )}

        {!isSearching && (
          <div className="teams-container">
            <div className="teams-header">
              <h2>Équipes</h2>
              <Link className="new-team-link">
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Ajouter équipe
              </Link>
            </div>
            <div className="teams-content">
              {equipes
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((equipes, index) => (
                  <EquipesBox key={index} equipes={equipes} />
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

export default Equipes;
