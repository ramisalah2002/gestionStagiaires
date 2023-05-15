import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import appLogo from "../../images/appLogo.png";
import logoLeft from "../../images/logoLeft.png";
import logoMen from "../../images/logoMen.png";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="mainContainer">
      <div className="left">
        <div className="welcome">Bienvenue dans votre espace</div>
        <div className="info">
          Un système d'information intégré qui permet la mise en place de
          nouvelles méthodes de gestion des stagiaires.
        </div>
        <img src={logoLeft} alt="Logo" />
      </div>
      <div className="right">
        <img className="logoMen" src={logoMen} alt="Logo Men" />
        <img className="appLogo" src={appLogo} alt="App Logo" />
        <form>
          {/* <FontAwesomeIcon icon={faEnvelope} /> */}
          <input type="email" placeholder="E-mail" />
          {/* <FontAwesomeIcon icon={faLock} /> */}
          <input type="password" placeholder="Mot de passe" />
          <div className="bottomOptions">
            <div className="rememberMe">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Se souvenir de moi</label>
            </div>
            <a href="#">Mot de passe oublié</a>
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
