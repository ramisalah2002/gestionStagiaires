import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginPage from "../../pages/LoginPage/LoginPage";
import {
  faHome,
  faUserGroup,
  faUsersRectangle,
  faChalkboardUser,
  faCalendarCheck,
  faGear,
  faCircleInfo,
  faArrowRightFromBracket,
  faBars,
  faPlus,
  faClose,
  faChartArea,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showStagiaireModal, setShowStagiaireModal] = useState(false);
  const [showEquipeModal, setShowEquipeModal] = useState(false);

  const navigateTo = useNavigate();

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("admin");

    // Navigate to LoginPage
    window.location.href = "/";
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const openStagiaireModal = () => {
    setShowStagiaireModal(true);
  };

  const closeStagiaireModal = () => {
    setShowStagiaireModal(false);
  };
  const openEquipeModal = () => {
    setShowEquipeModal(true);
  };

  const closeEquipeModal = () => {
    setShowEquipeModal(false);
  };

  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (linkText) => {
    setActiveLink(linkText);
  };

  //generer un mdp aleatoire :
  const predefinedPasswords = [
    "Password1",
    "Password2",
    "Password3",
    "Password4",
    "Password5",
    "Password6",
    "Password7",
    "Password8",
    "Password9",
    "Password10",
  ];

  const [stagiaires, setStagiaires] = useState([
    { id: 1, nom: 'RAMI Salah-eddine' },
    { id: 2, nom: 'John Doe' },
    { id: 3, nom: 'Jane Smith' },
    // Add more stagiaires as needed
  ]);

  const [selectedStagiaires, setSelectedStagiaires] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStagiaireClick = (stagiaire) => {
    if (selectedStagiaires.find((s) => s.id === stagiaire.id)) {
      const updatedStagiaires = selectedStagiaires.filter((s) => s.id !== stagiaire.id);
      setSelectedStagiaires(updatedStagiaires);
    } else {
      setSelectedStagiaires([...selectedStagiaires, stagiaire]);
    }
  };

  const handleDeleteStagiaire = (stagiaireId) => {
    const updatedStagiaires = selectedStagiaires.filter((s) => s.id !== stagiaireId);
    setSelectedStagiaires(updatedStagiaires);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStagiaires = stagiaires.filter((stagiaire) =>
    stagiaire.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = () => {
    const length = 8; // desired length of the password
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let newGeneratedPassword = "";

    while (true) {
      newGeneratedPassword = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        newGeneratedPassword += characters.charAt(randomIndex);
      }

      if (!predefinedPasswords.includes(newGeneratedPassword)) {
        break;
      }
    }

    setGeneratedPassword(newGeneratedPassword);
  };

  return (
    <>
      <div className={`sidebar ${showSidebar ? "" : "hidden"}`}>
        <div className="toggle-button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <Link to="/encadrant/accueil" className="logo">
          <div></div>
        </Link>
        <div className={`links-container`}>
          <ul className="links-list">
            <li className={activeLink === "link1" ? "active-link" : "link"}>
              <Link onClick={() => handleLinkClick("link1")} to="/encadrant/accueil">
                <FontAwesomeIcon className="big-icons" icon={faHome} />
                <label>{showSidebar ? "Accueil" : null}</label>
              </Link>
            </li>
            <li className={activeLink === "link2" ? "active-link" : "link"}>
              <Link onClick={() => handleLinkClick("link2")} to="/stagiaires">
                <FontAwesomeIcon className="big-icons" icon={faUserGroup} />
                <label>{showSidebar ? "Stagiaires" : null}</label>
              </Link>
              <Link onClick={() => openStagiaireModal()} className="plus-container">
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
              </Link>
            </li>
            <li className={activeLink === "link3" ? "active-link" : "link"}>
              <Link onClick={() => handleLinkClick("link3")} to="/equipes">
                <FontAwesomeIcon
                  className="big-icons"
                  icon={faUsersRectangle}
                />
                <label>{showSidebar ? "Equipes" : null}</label>
              </Link>
              <Link onClick={() => openEquipeModal()} className="plus-container">
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
              </Link>
            </li>
            <li className={activeLink === "link4" ? "active-link" : "link"}>
              <Link onClick={() => handleLinkClick("link4")} to="/encadrants">
                <FontAwesomeIcon
                  className="big-icons"
                  icon={faChalkboardUser}
                />
                <label>{showSidebar ? "Encadrants" : null}</label>
              </Link>
              <Link to="/parametres" className="plus-container">
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
              </Link>
            </li>
            <li className={activeLink === "link5" ? "active-link" : "link"}>
              <Link onClick={() => handleLinkClick("link5")} to="/absence">
                <FontAwesomeIcon className="small-icons" icon={faCalendarCheck}/>
                <label>{showSidebar ? "Absence" : null}</label>
              </Link>
            </li>
            <li className={activeLink === "link6" ? "active-link" : "link"}>
              <Link onClick={() => handleLinkClick("link6")} to="/discussions">
                <FontAwesomeIcon className="small-icons" icon={faComment}/>
                <label>{showSidebar ? "Discussions" : null}</label>
              </Link>
            </li>
            <li className={activeLink === "link7" ? "active-link" : "link"}>
              <Link onClick={() => handleLinkClick("link7")} to="/parametres">
                <FontAwesomeIcon className="small-icons" icon={faGear} />
                <label>{showSidebar ? "Paramètres" : null}</label>
              </Link>
            </li>
          </ul>
          <ul className="links-list">
            <li className={activeLink === "link7" ? "active-link" : "link"}>
              <Link
                onClick={() => handleLinkClick("link7")}
                to="/aide"
                className={activeLink === "link7" ? "active-link" : "link"}
              >
                <FontAwesomeIcon className="small-icons" icon={faCircleInfo} />
                <label>{showSidebar ? "Aide & information" : null}</label>
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout}>
                <FontAwesomeIcon
                  className="small-icons"
                  icon={faArrowRightFromBracket}
                />
                <label>{showSidebar ? "Se deconnecter" : null}</label>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {showStagiaireModal && (
        <div className="stagiaire-modal-overlay">
          <form className="stagiaire-modal-content">
            <div className="stagiaire-modal-header">
              <h2>Nouveau stagiaire</h2>
              <Link onClick={closeStagiaireModal} className="stagiaire-close-link">
                <FontAwesomeIcon icon={faClose} />
              </Link>
            </div>
            <div className="info-devider">
              <div className="info-devider-line"></div>
              <div className="info-devider-text">Informations personnelles</div>
              <div className="info-devider-line"></div>
            </div>
            <div className="form-group">
              <div className="nom-container">
                <label>Nom du stagiaire</label>
                <input placeholder="Entrez le nom du stagiaire" />
              </div>
              <div className="prenom-container">
                <label>Prénom du stagiaire</label>
                <input placeholder="Entrez le prénom du stagiaire" />
              </div>
            </div>
            <div className="form-group">
              <div className="email-container">
                <label>Email du stagiaire</label>
                <input placeholder="Entrez l'email du stagiaire" />
              </div>
              <div className="email-container">
                <label>Mot de passe du stagiaire</label>
                <div className="password-container">
                  <input
                    disabled
                    value={
                      generatedPassword || "Votre mot de passe sera généré"
                    }
                  />
                  <Link
                    className="generate-password"
                    onClick={generatePassword}
                  >
                    Génerer
                  </Link>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="nom-container">
                <label>Téléphone du stagiaire</label>
                <input
                  type="number"
                  min={0}
                  placeholder="Entrez le téléphone du stagiaire"
                />
              </div>
              <div className="prenom-container">
                <label>Genre du stagiaire</label>
                <select>
                  <option>Homme</option>
                  <option>Femme</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="nom-container">
                <label>CIN du stagiaire</label>
                <input placeholder="Entrez le CIN du stagiaire" />
              </div>
              <div className="prenom-container">
                <label>CNE du stagiaire</label>
                <input placeholder="Entrez le CNE du stagiaire" />
              </div>
              <div className="prenom-container">
                <label>Date de naissance du stagiaire</label>
                <input className="date-naissance-input" type="date" />
              </div>
            </div>
            <div className="info-devider">
              <div className="info-devider-line"></div>
              <div className="info-devider-text">Formation</div>
              <div className="info-devider-line"></div>
            </div>
            <div className="form-group">
              <div className="prenom-container">
                <label>Établissement du stagiaire</label>
                <select>
                  <option>ESTS - Université M5</option>
                  <option>ENSA Kénitra</option>
                </select>
              </div>
              <div className="prenom-container">
                <label>Formation du stagiaire</label>
                <input placeholder="Entrez la formation du stagiaire" />
              </div>
            </div>
            <div className="info-devider">
              <div className="info-devider-line"></div>
              <div className="info-devider-text">Encadrant</div>
              <div className="info-devider-line"></div>
            </div>
            <div className="form-group">
              <div className="prenom-container">
                <label>Affectez un encadrant</label>
                <select>
                  <option>Choisir un encadrant</option>
                  <option>KOUNAIDI Houssain</option>
                  <option>Bahae-eddine</option>
                </select>
              </div>
            </div>
            <div className="save-container">
              <Link onClick={closeStagiaireModal} className="annuler-link">
                Annuler
              </Link>
              <Link className="ajouter-link">Ajouter</Link>
            </div>
          </form>
        </div>
      )}
      {showEquipeModal && (
        <div className="equipe-modal-overlay">
          <div className="equipe-modal-content">
            <div className="equipe-modal-header">
              <h2>Nouvelle Équipe</h2>
              <Link onClick={closeEquipeModal} className="equipe-close-link">
                <FontAwesomeIcon className="equipe-icon" icon={faClose} />
              </Link>
            </div>
            <div className="equipe-info-devider">
              <div className="equipe-info-devider-line"></div>
            </div>
            <div className="form-group">
              <div className="nom-container">
                <label>Nom de l'équipe</label>
                <input placeholder="Entrez le nom de l'équipe" />
              </div>
            </div>
            <div className="equipe-info-devider">
              <div className="equipe-info-devider-line"></div>
            </div>
            <div className="form-group">
              <div className="nom-container">
                <label>Ajouter des stagiaires</label>
                <input
                  placeholder="Entrez le nom du stagiaire"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="equipe-stagiaire-liste">
              {filteredStagiaires.length > 0 && (
                <div className="stagiaire-equipe">
                  <div className="stagiaire-equipe-info">
                    <div className="stagiaire-equipe-img"></div>
                    <label>{filteredStagiaires[0].nom}</label>
                  </div>
                  <button
                    className="ajouter-stagiaire-equipe-link"
                    onClick={() => handleStagiaireClick(filteredStagiaires[0])}
                    disabled={selectedStagiaires.find((s) => s.id === filteredStagiaires[0].id)}
                  >
                    {selectedStagiaires.find((s) => s.id === filteredStagiaires[0].id)
                      ? 'Sélectionné'
                      : 'Ajouter'}
                  </button>
                </div>
              )}
            </div>
            <div className="selected-stagiaires">
              <label>Stagiaires sélectionnés :</label>
              <div className="selected-stagiaire-liste">
                {selectedStagiaires.map((stagiaire) => (
                  <div key={stagiaire.id} className="stagiaire-equipe-img">
                    <button
                      style={{background:"none",outline:"none",border:"none"}}
                      className="delete-selected-stagiaire-link"
                      onClick={() => handleDeleteStagiaire(stagiaire.id)}
                    >
                      <FontAwesomeIcon className="stagiaire-equipe-delete-icon" icon={faClose} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="save-container">
              <Link onClick={closeEquipeModal} className="annuler-link">
                Annuler
              </Link>
              <Link className="ajouter-link">Créer</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
