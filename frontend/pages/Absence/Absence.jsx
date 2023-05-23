import React from "react";
import { useState, useRef, useEffect } from "react";
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

const StagiaireBox = ({ stagiaire }) => (
  <div className="stagiaire-box">
    <div className="profile-picture-wrapper">
      <img className="profile-picture" src={stagiaire.image} alt="Profile" />
      {/* You could add your dynamic elements here */}
    </div>
    <h2 className="stagiaire-name">{stagiaire.name}</h2>
    <div className="detail presence-days">
      <span>Absence du mois </span>
      <span>{stagiaire.presenceDays}</span>
    </div>
    <div className="detail latest-absence">
      <span>Dernier absence </span>
      <span>{stagiaire.latestAbsence}</span>
    </div>
    <div className="detail status">
      <span>Status d'aujourd'hui </span>
      <span className={`status-value ${stagiaire.status}`}>
        {stagiaire.status}
      </span>
    </div>
    <Link className="voir-detail">Voir profile d'abscence</Link>
  </div>
);

function Absence() {
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

  const stagiaires = [
    {
      name: "Rami Salah-eddine",
      image: stagiaireImage,
      presenceDays: 22,
      latestAbsence: "N/A",
      status: "present",
    },
    {
      name: "Boulaajoul Anass",
      image: stagiaireImage,
      presenceDays: 18,
      latestAbsence: "2023-05-01",
      status: "absent",
    },
    {
      name: "Mohammed Ali",
      image: stagiaireImage,
      presenceDays: 16,
      latestAbsence: "2023-05-10",
      status: "not-indicated",
    },
    {
      name: "Fatima Zahra",
      image: stagiaireImage,
      presenceDays: 20,
      latestAbsence: "2023-05-05",
      status: "absent",
    },
    {
      name: "Hamza Alaoui",
      image: stagiaireImage,
      presenceDays: 22,
      latestAbsence: "2023-04-30",
      status: "present",
    },
    {
      name: "Amina Chakir",
      image: stagiaireImage,
      presenceDays: 18,
      latestAbsence: "2023-05-07",
      status: "absent",
    },
    {
      name: "Karim Hassan",
      image: stagiaireImage,
      presenceDays: 23,
      latestAbsence: "N/A",
      status: "present",
    },
    {
      name: "Nadia Bousfiha",
      image: stagiaireImage,
      presenceDays: 21,
      latestAbsence: "2023-05-12",
      status: "not-indicated",
    },
    {
      name: "Rami Salah-eddine",
      image: stagiaireImage,
      presenceDays: 22,
      latestAbsence: "N/A",
      status: "present",
    },
    {
      name: "Boulaajoul Anass",
      image: stagiaireImage,
      presenceDays: 18,
      latestAbsence: "2023-05-01",
      status: "absent",
    },
    {
      name: "Mohammed Ali",
      image: stagiaireImage,
      presenceDays: 16,
      latestAbsence: "2023-05-10",
      status: "not-indicated",
    },
    {
      name: "Fatima Zahra",
      image: stagiaireImage,
      presenceDays: 20,
      latestAbsence: "2023-05-05",
      status: "absent",
    },
    {
      name: "Hamza Alaoui",
      image: stagiaireImage,
      presenceDays: 22,
      latestAbsence: "2023-04-30",
      status: "present",
    },
    {
      name: "Amina Chakir",
      image: stagiaireImage,
      presenceDays: 18,
      latestAbsence: "2023-05-07",
      status: "absent",
    },
    {
      name: "Karim Hassan",
      image: stagiaireImage,
      presenceDays: 23,
      latestAbsence: "N/A",
      status: "present",
    },
    {
      name: "Nadia Bousfiha",
      image: stagiaireImage,
      presenceDays: 21,
      latestAbsence: "2023-05-12",
      status: "not-indicated",
    },
    {
      name: "Rami Salah-eddine",
      image: stagiaireImage,
      presenceDays: 22,
      latestAbsence: "N/A",
      status: "present",
    },
    {
      name: "Boulaajoul Anass",
      image: stagiaireImage,
      presenceDays: 18,
      latestAbsence: "2023-05-01",
      status: "absent",
    },
    {
      name: "Mohammed Ali",
      image: stagiaireImage,
      presenceDays: 16,
      latestAbsence: "2023-05-10",
      status: "not-indicated",
    },
    {
      name: "Fatima Zahra",
      image: stagiaireImage,
      presenceDays: 20,
      latestAbsence: "2023-05-05",
      status: "absent",
    },
    {
      name: "Hamza Alaoui",
      image: stagiaireImage,
      presenceDays: 22,
      latestAbsence: "2023-04-30",
      status: "present",
    },
    {
      name: "Amina Chakir",
      image: stagiaireImage,
      presenceDays: 18,
      latestAbsence: "2023-05-07",
      status: "absent",
    },
    {
      name: "Karim Hassan",
      image: stagiaireImage,
      presenceDays: 23,
      latestAbsence: "N/A",
      status: "present",
    },
    {
      name: "Nadia Bousfiha",
      image: stagiaireImage,
      presenceDays: 21,
      latestAbsence: "2023-05-12",
      status: "not-indicated",
    },
  ];

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
      <Sidebar />
      <main className="main-content">
        <Header
          userName={user?.fullName}
          avatar={settingsImage}
          currentDate={currentDate}
        />
        <div className="abscence-container">
          <label>Listes des abscence</label>
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
      </main>
    </div>
  );
}

export default Absence;
