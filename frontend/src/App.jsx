<<<<<<< HEAD
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

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="sections-container">
          <div className="stagiaires-container"></div>
          <div className="project-abscence-section">
            <div className="project-container"></div>
            <div className="abscence-container"></div>
          </div>
        </div>
      </main>
    </div>
=======
import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faCircleUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Homepage from '../pages/Homepage/Homepage';

function App() {
  return (
    <Homepage/>
>>>>>>> bdbad0eff1d6ea9029630eac243215b86e3e2f52
  );
}

export default App;
