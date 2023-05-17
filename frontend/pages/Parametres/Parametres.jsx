import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { FaTrash } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import "./Parametres.css";

const other = () => <div>Hi</div>;

function Parametres() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="sections-container">
          <div className="Parametres-container">
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
                      backgroundImage: "url(../../assets/images/user.jpg)",
                    }}
                  ></div>
                </div>
                <div className="photoProfil-buttons">
                  <button className="photoProfil-button change-photo">
                    Changer de Photo
                  </button>
                  <button className="photoProfil-button delete-photo">
                    <FaTrash size={20} color="red" /> Supprimer
                  </button>
                </div>
              </div>
              <div className="photoProfil-bottom">
                <label>
                  Ajoutez votre photo. La taille recommandée est 256x256px
                </label>
              </div>
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

              <div className="form-input-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Entrez votre mot de passe"
                />
              </div>

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

              <div className="form-input-group">
                <label>Genre</label>
                <select name="genre">
                  <option value="">Sélectionnez votre genre</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="form-input-group">
                <label>CIN</label>
                <input type="text" name="cin" placeholder="Entrez votre CIN" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Parametres;
