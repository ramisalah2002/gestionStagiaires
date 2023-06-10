import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";


import ChoicePage from "../pages/ChoicePage/ChoicePage";


import Chat from "../pages/Chat/Chat";
import Contact from "../pages/email-test/Contact";
import ForgotPassword from "../pages/ResetPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import EmailSent from "../pages/ResetPassword/EmailSent";
import StagiaireProjet from "../stagiairePages/Projet/Projet";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import PieChart from "../pages/charts/PieChart";
import ImageUploadForm from "../tests/ImageUploadForm";
import DisplayImages from "../tests/DisplayImages";
import Reunion from "../pages/Reunion/Reunion";
import SendMessagePage from "../pages/email-test/SendMessage";
import ReceiveMessagePage from "../pages/email-test/ReceiveMessage";


//Providers
import { AdminProvider } from "../Contexts/AdminContext";
import { StagiaireProvider } from "../Contexts/StagiaireContext";
import { EncadrantProvider } from "../Contexts/EncadrantContext";

//Administrateur pages
import Homepage from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Parametres from "../pages/Parametres/Parametres";
import Stagiaire from "../pages/Stagiaire/Stagiaire";
import Equipes from "../pages/Equipes/Equipes";
import Absence from "../pages/Absence/Absence";
import Projet from "../pages/Projet/Projet";
import Encadrant from "../pages/Encadrant/Encadrant";
import StagiaireProfile from "../pages/StagiaireProfile/StagiaireProfile";

//Encadrant pages
import LoginPageEncadrant from "../EncadrantPages/LoginPage/LoginPage";
import HomepageEncadrant from "../EncadrantPages/Homepage/HomepageEncadrant";
import EncadrantEquipes from "../EncadrantPages/EncadrantEquipe/EncadrantEquipes";
import ChatEncadrant from "../EncadrantPages/ChatEncadrant/ChatEncadrant";
import EncadrantAbsence from "../EncadrantPages/EncadrantAbsence/EncadrantAbsence";
import EncadrantParametres from "../EncadrantPages/EncadrantParametres/EncadrantParametres";
import StagiairePage from "../EncadrantPages/StagiairePage/StagiaireProfile";

//Stagiaire pages
import LoginPageStagiaire from "../stagiairePages/LoginPage/LoginPageStagiaire";
import StagiaireHomepage from "../stagiairePages/Homepage/Homepage";
import StagiaireChat from "../stagiairePages/StagiaireChat/StagiaireChat";
import ProjetStagiaire from "../stagiairePages/Projet/Projet";
import StagiaireAbsenceMarking from "../stagiairePages/StagiaireAbsence/StagiaireAbsenceMarking";
import Task from "../stagiairePages/Task/Task";
import MonProfile from "../stagiairePages/StagiaireProfile/MonProfile";


function App() {
  useEffect(() => {
    document.title = "MENStage";
  }, []);

  const [user, setUser] = useState(null);

  return (
    <Router>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<ChoicePage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/accueil" element={<Homepage />} />
          <Route path="/admin/stagiaires" element={<Stagiaire />} />
          <Route path="/admin/equipes" element={<Equipes />} />
          <Route path="/admin/encadrants" element={<Encadrant />} />
          <Route path="/admin/absence" element={<Absence />} />
          <Route path="/admin/discussions" element={<Chat />} />
          <Route path="/admin/parametres" element={<Parametres />} />
          <Route path="/admin/profile-stagiaire/:stagiaire_id" element={<StagiaireProfile />} />
          <Route path="/admin/projets" element={<Projet />} />
          <Route path="/send-email" element={<Contact />} />
          <Route path="/forgot-password/" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-email-sent" element={<EmailSent />} />
          <Route path="/page-not-found" element={<NotFoundPage />} />
          <Route path="/test" element={<PieChart />} />
          <Route path="/upload-image" element={<ImageUploadForm />} />
          <Route path="/images-uploaded" element={<DisplayImages />} />
          <Route path="/admin/reunion" element={<Reunion />} />
          <Route path="/send-message" element={<SendMessagePage />} />
          <Route path="/receive-message" element={<ReceiveMessagePage />} />

        </Routes>
      </AdminProvider>
      <EncadrantProvider>
        <Routes>
          <Route path="/" element={<ChoicePage />} />
          <Route path="/encadrant/login" element={<LoginPageEncadrant />} />
          <Route path="/encadrant/accueil" element={<HomepageEncadrant />} />
          <Route path="/encadrant/equipes" element={<EncadrantEquipes />} />
          <Route path="/encadrant/stagiaires" element={<Stagiaire />} />
          <Route path="/encadrant/absence" element={<EncadrantAbsence />} />
          <Route path="/encadrant/discussions" element={<ChatEncadrant />} />
          <Route path="/encadrant/parametres" element={<EncadrantParametres />} />
          <Route path="/encadrant/profile-stagiaire/:stagiaire_id" element={<StagiairePage />} />
          <Route path="/projets" element={<Projet />} />
          <Route path="/send-email" element={<Contact />} />
          <Route path="/forgot-password/" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-email-sent" element={<EmailSent />} />
          <Route path="/page-not-found" element={<NotFoundPage />} />
          <Route path="/test" element={<PieChart />} />
          <Route path="/upload-image" element={<ImageUploadForm />} />
          <Route path="/images-uploaded" element={<DisplayImages />} />
          <Route path="/encadrant/reunion" element={<Reunion />} />
          <Route path="/send-message" element={<SendMessagePage />} />
          <Route path="/receive-message" element={<ReceiveMessagePage />} />
        </Routes>
      </EncadrantProvider>
      <StagiaireProvider>
        <Routes>
          <Route path="/" element={<ChoicePage />} />
          <Route path="/stagiaire/login" element={<LoginPageStagiaire />} />
          <Route path="/stagiaire/accueil" element={<StagiaireHomepage />} />
          <Route path="/stagiaire/mon-profile" element={<MonProfile />} />
          <Route path="stagiaire/absence" element={<StagiaireAbsenceMarking />} />
          <Route path="/stagiaire/projet" element={<ProjetStagiaire />} />
          <Route path="/stagiaire/discussions" element={<StagiaireChat />} />
          <Route path="/stagiaire/parametres" element={<Parametres />} />
          <Route path="/stagiaire/activités" element={<Task />} />
          <Route path="/profile-stagiaire/:stagiaire_id" element={<StagiaireProfile />} />
          <Route path="/projets" element={<Projet />} />
          <Route path="/send-email" element={<Contact />} />
          <Route path="/forgot-password/" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-email-sent" element={<EmailSent />} />
          <Route path="/page-not-found" element={<NotFoundPage />} />
          <Route path="/test" element={<PieChart />} />
          <Route path="/upload-image" element={<ImageUploadForm />} />
          <Route path="/images-uploaded" element={<DisplayImages />} />
          <Route path="/encadrant/reunion" element={<Reunion />} />
          <Route path="/send-message" element={<SendMessagePage />} />
          <Route path="/receive-message" element={<ReceiveMessagePage />} />
        </Routes>
      </StagiaireProvider>
    </Router>
  );
}

export default App;
