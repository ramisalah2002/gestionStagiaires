import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import appLogo from "../../images/appLogo.png";
import logoLeft from "../../images/logoLeft.png";
import logoMen from "../../images/logoMen.png";
import "./ChoicePage.css";

function ChoicePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      // User data not found, navigate to LoginPage
      navigateTo("/Homepage");
      return;
    }
  }, [navigateTo]);

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
    <div className="choice-container">
      <div className='background-img-container'>
          <img src='../../images/logoMen.png'/>
      </div>
      <div className="choices-container">
        <Link to="/parametres" className="choice-wrapper">
          <div className="choice-content choice-content-1">
            <div className="image-div-1"></div>
          </div>
          <div className="text-container">
            <label>Espace Administrateur</label>
          </div>
        </Link>
        <Link className="choice-wrapper">
          <div className="choice-content choice-content-2">
            <div className="image-div-2"></div>
          </div>
          <div className="text-container">
            <label>Espace Encadrant</label>
          </div>
        </Link>
        <Link className="choice-wrapper">
          <div className="choice-content choice-content-3">
            <div className="image-div-3"></div>
          </div>
          <div className="text-container">
            <label>Espace Stagiaire</label>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ChoicePage;
