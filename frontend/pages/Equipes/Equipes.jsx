import React from "react";
import { useState, useRef } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
        <label>24 jours</label>
      </div>
      <Link className="link">
        <FontAwesomeIcon className="icon-chevron" icon={faChevronRight} />
      </Link>
    </div>
    <div className="team-card-header">
      <label className="language-label">[{equipes.langages}]</label>
      <label className="project-label">{equipes.nomProjet}</label>
    </div>
    <div className="progress-container">
      <div className="progress-title">
        <FontAwesomeIcon icon={faListCheck} />
        <label>Progrès</label>
      </div>
      <label className="progress-nbr">{equipes.progrès}%</label>
    </div>
    <div className="progress-line-container">
      <div className="progress-line"></div>
    </div>
    <div className="team-card-footer">
      <div className="team-card-footer-left">
        <img className="member-img" src="../../images/user.jpg"></img>
        <img className="member-img" src="../../images/user.jpg"></img>
        <img className="member-img" src="../../images/user.jpg"></img>
      </div>
      <div className="team-card-footer-right">
        <FontAwesomeIcon className="icon" icon={faCalendarDays} />
        <label>Délai: </label>
        <p>{equipes.délai}</p>
      </div>
    </div>
  </div>
);

function Parametres() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });
  const equipes = [
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 75,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
    {
      tempsRestant: 24,
      langages: "React",
      nomProjet: "Site web de gestion des stagiaires",
      progrès: 22,
      latestAbsence: "75",
      délai: "24-07-2023",
    },
  ];

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
        <Header />
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
      </main>
    </div>
  );
}

export default Parametres;
