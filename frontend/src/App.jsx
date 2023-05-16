import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Stagiaire from "../pages/Stagiaire/Stagiaire";
import Encadrant from "../pages/Encadrant/Encadrant";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/encadrants" element={<Encadrant />} />
        <Route path="/stagiaires" element={<Stagiaire />} />
      </Routes>
    </Router>
  );
}

export default App;
