import React, { useState, useEffect } from "react";
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
import Homepage from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Parametres from "../pages/Parametres/Parametres";
import UserContext from "../components/UserContext";
import Stagiaire from "../pages/Stagiaire/Stagiaire";
import Equipes from "../pages/Equipes/Equipes";
import Absence from "../pages/Absence/Absence";
import Projet from "../pages/Projet/Projet";
import StagiaireProfile from "../pages/StagiaireProfile/StagiaireProfile";
import ChoicePage from "../pages/ChoicePage/ChoicePage";
import Chat from "../pages/Chat/Chat";
import Contact from "../pages/email-test/Contact";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

function App() {
  useEffect(() => {
    document.title = "MENStage";
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChoicePage />} />
        <Route path="/encadrant/login" element={<LoginPage />} />
        <Route path="/encadrant/accueil" element={<Homepage />} />
        <Route path="/stagiaires" element={<Stagiaire />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/encadrants" element={<Encadrant />} />
        <Route path="/absence" element={<Absence />} />
        <Route path="/discussions" element={<Chat />} />
        <Route path="/parametres" element={<Parametres />} />
        <Route path="/profile-stagiaire" element={<StagiaireProfile />} />
        <Route path="/projets" element={<Projet />} />
        <Route path="/send-email" element={<Contact />} />
        <Route path="/reset-password/:userId" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
