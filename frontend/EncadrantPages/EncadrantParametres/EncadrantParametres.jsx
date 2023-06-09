import React, { useState, useRef, useEffect, useContext } from "react";
import { EncadrantContext } from "../../Contexts/EncadrantContext.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
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
import "./Parametres.css";
import settingsImage from "./../../images/Settings.png";
import EncadrantSidebar from "../../components/Sidebar/EncadrantSidebar.jsx";

const other = () => <div>Hi</div>;

function EncadrantParametres() {
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigateTo = useNavigate();
  const { encadrant, loading } = useContext(EncadrantContext);
  const encadrantContext = useContext(EncadrantContext);

  useEffect(() => {
    const encadrantData = localStorage.getItem("encadrant");
    if (!encadrantData && !loading) {
      // Admin data doesn't exist in localStorage, redirect to LoginPage
      navigateTo("/encadrant/login");
    } else if (encadrantData && !encadrant) {
      // Admin data exists in localStorage but not in context, set the admin context
      encadrantContext.setEncadrant(JSON.parse(encadrantData));
    }
  }, [encadrant, loading, navigateTo, encadrantContext]);

  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });

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
  const [searchResults, setSearchResults] = useState([]); // New state for the search results
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState("");

  const handleSearchTermChange = (searchTerm) => {
    // Filter the stagiaires array when the search term changes
    const results = stagiaires.filter((stagiaire) =>
      stagiaire.nom.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(searchTerm !== "");
    setSearchingText(searchTerm !== "" ? "Résultat de la recherche" : "");
  };

  

  return (
    <div className="app">
      <EncadrantSidebar />
      <main className="main-content">
        <div className="header">
          <div className="admin-container">
            <FontAwesomeIcon className="admin-icon" icon={faCircleUser} />
            <div className="admin-info">
              {encadrant && (
                <>
                  <label className="admin-name">
                    {encadrant.nom} {encadrant.prenom}
                  </label>
                  <label className="admin-post">{encadrant.fonction}</label>
                </>
              )}
            </div>
            <div className="vertical-line"></div>
            <div className="today-container">
              <FontAwesomeIcon
                className="calendar-icon"
                icon={faCalendarDays}
              />
              <label className="today-label">{currentDate}</label>
            </div>
          </div>
          <div className="search-container">
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input
              className="search-input"
              placeholder="Rechercher ..."
              type="text"
              onChange={(event) => handleSearchTermChange(event.target.value)}
            />
          </div>
        </div>
        {isSearching && (
          <div className="last-stagiaires-container-search">
            <div className="new-stagiaires">
              <h2>{searchingText}</h2>
            </div>
            <div className="last-stagiaires-content">
              {searchResults.slice(0, 4).map((stagiaire) => (
                <div key={stagiaire.id} className="last-stagiaire-card">
                  <div className="image-top"></div>
                  <label className="last-stagiaire-name">{stagiaire.nom}</label>
                  <label className="last-stagiaire-formation">
                    2ème année génie logiciel
                  </label>
                  <Link className="voir-detail">Voir détail</Link>
                </div>
              ))}
            </div>
          </div>
        )}
        {!isSearching && (
          <div className="sections-container">
            <div className="parametres-container">
              <div className="parametres-top-container">
                <div className="parametres-top-section">
                  <div className="Parametres-header">
                    <label className="Parametres-title">Mon Profil</label>
                    <label className="Parametres-underTitle">
                      Gérez les paramètres de votre profil
                    </label>
                  </div>
                  <div className="Parametres-content">
                    <div className="Parametres-photoProfil">
                      <div className="params-img-div">
                        <label className="Parametres-imageTitle">
                          Votre photo de Profil
                        </label>
                        {encadrant &&(

                        <div
                          className="Parametres-img"
                          style={{ background: `url(${encadrant.image})`, backgroundSize: 'cover' }}
                        ></div>
                        )}
                      </div>
                      <div className="photoProfil-buttons">
                        <input
                          ref={fileInputRef}
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleFileInputChange}
                        />
                        <button
                          className="photoProfil-button change-photo"
                          onClick={handleButtonClick}
                        >
                          Changer de Photo
                        </button>
                        <button
                          className="photoProfil-button delete-photo"
                          onClick={handleDeleteButtonClick}
                        >
                          <FaTrash size={20} color="red" /> Supprimer
                        </button>
                      </div>
                    </div>
                    <div className="photoProfil-bottom">
                      <label>
                        Ajoutez votre photo. La taille recommandée est 256x256px
                      </label>
                    </div>
                  </div>
                </div>
                <div className="parametres-top-section-img">
                  <img src="../../images/settingsImg.png"></img>
                </div>
              </div>
              <div className="parametres-infos-container">
                <div className="parametres-section">
                  <div className="form-input-group">
                    <label>Nom</label>
                    <input
                      type="text"
                      name="nom"
                      placeholder="Entrez votre nom"
                    />
                  </div>
                  <div className="form-input-group">
                    <label>Prénom</label>
                    <input
                      type="text"
                      name="prenom"
                      placeholder="Entrez votre prénom"
                    />
                  </div>
                  <div className="form-input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Entrez votre email"
                    />
                  </div>
                </div>
                <div className="parametres-section">
                  <div className="form-input-group password-input-group">
                    <label htmlFor="password">Mot de passe actuel</label>
                    <div className="password-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Votre mot de passe"
                      />
                      <span
                        className="toggle-password-visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                  </div>
                  <div className="form-input-group">
                    <label>Nouveau Mot de passe</label>
                    <input
                      type="password"
                      name="telephone"
                      placeholder="Entrez le nouveau mot de passe"
                    />
                  </div>
                  <div className="form-input-group">
                    <label>Confirmez Mot de passe</label>
                    <input
                      type="password"
                      name="dateNaissance"
                      placeholder="Confirmez le nouveau mot de passe"
                    />
                  </div>
                </div>
              </div>
              <div className="paramatres-infos-container">
                <div className="parametres-section-last">
                  <div className="section-last-div">
                    <div className="form-input-group">
                      <label>Téléphone</label>
                      <input
                        type="tel"
                        name="telephone"
                        placeholder="Entrez votre numéro de téléphone"
                      />
                    </div>

                    <div className="form-input-group">
                      <label>Date de naissance</label>
                      <input type="date" name="dateNaissance" />
                    </div>
                  </div>
                  <div className="section-last-div">
                    <div className="form-input-group">
                      <label>Genre</label>
                      <select name="genre">
                        <option value="">Sélectionnez votre genre</option>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                      </select>
                    </div>

                    <div className="form-input-group">
                      <label>CIN</label>
                      <input
                        type="text"
                        name="cin"
                        placeholder="Entrez votre CIN"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="save-div">
                <Link className="save-link">Enregistrer les modifications</Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default EncadrantParametres;
