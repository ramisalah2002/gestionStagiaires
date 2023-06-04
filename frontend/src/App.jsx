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
import LoginPageStagiaire from "../stagiairePages/LoginPage/LoginPage";
import Parametres from "../pages/Parametres/Parametres";
import Stagiaire from "../pages/Stagiaire/Stagiaire";
import Equipes from "../pages/Equipes/Equipes";
import Absence from "../pages/Absence/Absence";
import Projet from "../pages/Projet/Projet";
import StagiaireProfile from "../pages/StagiaireProfile/StagiaireProfile";
import ChoicePage from "../pages/ChoicePage/ChoicePage";
import Chat from "../pages/Chat/Chat";
import Contact from "../pages/email-test/Contact";
import ForgotPassword from "../pages/ResetPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import EmailSent from "../pages/ResetPassword/EmailSent";
import StagiaireHomePage from "../stagiairePages/Homepage/Homepage";
import StagiaireProjet from "../stagiairePages/Projet/Projet";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import PieChart from "../pages/charts/PieChart";
import { AdminProvider } from "../Contexts/AdminContext";
import ImageUploadForm from "../tests/ImageUploadForm";
import DisplayImages from "../tests/DisplayImages";
import Reunion from "../pages/Reunion/Reunion";
import SendMessagePage from "../pages/email-test/SendMessage";
import ReceiveMessagePage from "../pages/email-test/ReceiveMessage";
import ProjetStagiaire from "../stagiairePages/Projet/Projet";

function App() {
  useEffect(() => {
    document.title = "MENStage";
  }, []);

  const [user, setUser] = useState(null);

  return (
<<<<<<< HEAD
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
        <Route path="/forgot-password/" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/reset-email-sent" element={<EmailSent />} />
        <Route path="/stagiaire/accueil" element={<StagiaireHomePage />} />
        <Route path="/stagiaire/projet" element={<StagiaireProjet />} />
        <Route path="/page-not-found" element={<NotFoundPage />} />
        <Route path="/test" element={<PieChart />} />
      </Routes>
    </Router>
=======
      <Router>
        <AdminProvider>
          <Routes>
            <Route path="/" element={<ChoicePage />} />
            <Route path="/encadrant/login" element={<LoginPage />} />
            <Route path="/stagiaire/login" element={<LoginPageStagiaire />} />
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
            <Route path="/forgot-password/" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/reset-email-sent" element={<EmailSent />} />
            <Route path="/stagiaire/accueil" element={<StagiaireHomePage />} />
            <Route path="/page-not-found" element={<NotFoundPage />} />
            <Route path="/test" element={<PieChart />} />
            <Route path="/upload-image" element={<ImageUploadForm />} />
            <Route path="/images-uploaded" element={<DisplayImages />} />
            <Route path="/reunion" element={<Reunion />} />
            <Route path="/send-message" element={<SendMessagePage />} />
            <Route path="/receive-message" element={<ReceiveMessagePage />} />
            <Route path="/stagiaire/projet" element={<ProjetStagiaire />} />
          </Routes>
        </AdminProvider>
      </Router>
>>>>>>> c0694d773abfdb7dfd1252ec0424ef2e4de234e8
  );
}

export default App;
