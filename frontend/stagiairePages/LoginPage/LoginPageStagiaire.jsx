import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { StagiaireContext } from "../../Contexts/StagiaireContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import appLogo from "../../images/appLogo.png";
import logoLeft from "../../images/logoLeft.png";
import logoMen from "../../images/logoMen.png";
import "./LoginPage.css";

function LoginPageStagiaire() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const stagiaireContext = useContext(StagiaireContext);

  const { stagiaire, loading } = useContext(StagiaireContext);

  useEffect(() => {
    const stagiaireData = localStorage.getItem("stagiaire");
    if (!stagiaireData && !loading) {
      // Admin data doesn't exist in localStorage, redirect to LoginPage
      navigateTo("/stagiaire/login");
    } else if (stagiaireData && !stagiaire) {
      // Admin data exists in localStorage but not in context, set the admin context
      stagiaireContext.setStagiaire(JSON.parse(stagiaireData));
      navigateTo("/stagiaire/accueil");
    }
  }, [stagiaire, loading, navigateTo, stagiaireContext]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/loginStagiaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store user and token information to localStorage or Context API or Redux
      console.log(data);
      localStorage.setItem("stagiaire", JSON.stringify(data.stagiaire));
      localStorage.setItem("token", data.token);

      // Redirect to HomePage
      navigateTo("/stagiaire/accueil");
    } else {
      // Handle error
      console.log(data.message);
    }
  };

  const userId = 4;

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
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="bottomOptions">
            <div className="rememberMe">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Se souvenir de moi</label>
            </div>
            <Link to="/forgot-password">Mot de passe oublié</Link>
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPageStagiaire;
