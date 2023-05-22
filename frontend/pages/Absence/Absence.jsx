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
    <button className="profile-button">Voir profil d'absence</button>
  </div>
);

function Absence() {
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

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
  ];
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className="sections-container">
          <Header />
          <div className="absence-management">
            {stagiaires.map((stagiaire, index) => (
              <StagiaireBox key={index} stagiaire={stagiaire} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Absence;
