import React from "react";
import { useState,useRef } from "react";
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
import "./Parametres.css";
import settingsImage from "./../../images/Settings.png";

const other = () => <div>Hi</div>;

function Parametres() {
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

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Header />
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
                      <div
                        className="Parametres-img"
                        style={{
                          backgroundImage: selectedImage ? `url(${selectedImage})` : "url(../../images/user.jpg)",
                        }}
                      ></div>
                    </div>
                    <div className="photoProfil-buttons">
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileInputChange}
                    />
                      <button className="photoProfil-button change-photo" onClick={handleButtonClick}>
                        Changer de Photo
                      </button>
                      <button className="photoProfil-button delete-photo" onClick={handleDeleteButtonClick}>
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
                    <input type="text" name="nom" placeholder="Entrez votre nom" />
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
                  <input type="password" name="dateNaissance"
                  placeholder="Confirmez le nouveau mot de passe" />
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
                      <input type="text" name="cin" placeholder="Entrez votre CIN" />
                    </div>
                </div>
              </div>
            </div>
            <div className="save-div">
              <Link className="save-link">Enregistrer les modifications</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Parametres;
