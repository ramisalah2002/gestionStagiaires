import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import appLogo from "../../images/appLogo.png";
import logoLeft from "../../images/logoLeft.png";
import logoMen from "../../images/logoMen.png";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/login", {
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
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Redirect to HomePage
      navigateTo("/Homepage");
    } else {
      // Handle error
      console.log(data.message);
    }
  };

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
            <a href="#">Mot de passe oublié</a>
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
