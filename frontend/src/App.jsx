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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";


function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Header />
          <Routes>
            <Route path="/Homepage" element={<Homepage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/stagiaires" element={<Stagiaire />} />
          </Routes>
        </main> */}
      </div>
    </Router>
  );
}

export default App;
