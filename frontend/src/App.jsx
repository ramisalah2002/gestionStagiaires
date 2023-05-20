import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Encadrant from "../pages/Encadrant/Encadrant";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Parametres from "../pages/Parametres/Parametres";
import UserContext from "../components/UserContext";
import Stagiaire from "../pages/Stagiaire/Stagiaire";
import Equipe from "../pages/Equipe/Equipes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Parametres" element={<Parametres />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/stagiaires" element={<Stagiaire />} />
        <Route path="/equipes" element={<Equipe />} />
        <Route path="/ecadrants" element={<Encadrant />} />
        <Route path="/equipes" element={<Equipes />} />
      </Routes>
    </Router>
  );
}

export default App;
