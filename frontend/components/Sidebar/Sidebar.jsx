import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
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
  const [stagiaires, setStagiaires] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [generatedPassword, setGeneratedPassword] = useState("");
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stagiaire")
      .then((response) => response.json())
      .then((data) => setStagiaires(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/technologie")
      .then((response) => response.json())
      .then((data) => setTechnologies(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  const [selectedTechnologies, setSelectedTechnologies] = useState([]);

  const handleTechnologiesChange = (selectedOptions) => {
    setSelectedTechnologies(selectedOptions);
  };

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

  const [encadrants, setEncadrants] = useState([]);

  useEffect(() => {
    fetchEncadrants();
  }, []);

  const fetchEncadrants = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/encadrant");
      const data = await response.json();
      setEncadrants(data);
    } catch (error) {
      console.error("Error fetching encadrants:", error);
    }
  };

  const [selectedStagiaires, setSelectedStagiaires] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleStagiaireClick = (stagiaire) => {
    if (selectedStagiaires.find((s) => s.id === stagiaire.id)) {
      const updatedStagiaires = selectedStagiaires.filter(
        (s) => s.id !== stagiaire.id
      );
      setSelectedStagiaires(updatedStagiaires);
    } else {
      setSelectedStagiaires([...selectedStagiaires, stagiaire]);
    }
  };

  const handleDeleteStagiaire = (stagiaireId) => {
    const updatedStagiaires = selectedStagiaires.filter(
      (s) => s.id !== stagiaireId
    );
    setSelectedStagiaires(updatedStagiaires);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStagiaires = stagiaires.filter(
    (stagiaire) =>
      stagiaire.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stagiaire.prenom.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [telephone, setTelephone] = useState("");
  const [genre, setGenre] = useState("");
  const [CIN, setCIN] = useState("");
  const [CNE, setCNE] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [etablissment_id, setEtablissment_id] = useState(0);
  const [formation, setFormation] = useState("");
  const [equipe_id, setEquipe_id] = useState(null);
  const [image, setImage] = useState(null);
  const [couverture, setCouverture] = useState(null);
  const [status, setStatus] = useState("En cours");

  const handleAjouterStagiaire = () => {
    const nouveauStagiaire = {
      nom,
      prenom,
      email,
      password: generatedPassword,
      telephone,
      dateNaissance,
      genre: genre,
      status,
      CIN,
      CNE,
      formation,
      image,
      couverture,
      etablissment_id: etablissment_id,
      equipe_id,
    };

    fetch("http://127.0.0.1:8000/api/stagiaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nouveauStagiaire),
    })
      .then((response) => response.json())
      .then((data) => {
        // Traitez la réponse du backend (par exemple, affichez un message de succès ou d'erreur)
        console.log(data);
        // setNom("");
        // setPrenom("");
        // setEmail("");
        // setPassword("");
        // setTelephone("");
        // setGenre("");
        // setCIN("");
        // setCNE("");
        // setDateNaissance("");
        // setEtablissment_id("");
        // setFormation("");
        // setEquipe_id("");
        // setImage("");
        // setCouverture("");
        // setStatus("");
      })
      .catch((error) => {
        // Gérez les erreurs lors de la requête
        console.log(nouveauStagiaire);
        console.error(error);
      });
  };

  return (
    <>
      <div className={`sidebar ${showSidebar ? "" : "hidden"}`}>
        <div className="toggle-button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <Link to="/admin/accueil" className="logo">
          <div></div>
        </Link>
        <div className={`links-container`}>
          <ul className="links-list">
            <li className={activeLink === "link1" ? "active-link" : "link"}>
              <Link
                onClick={() => handleLinkClick("link1")}
                to="/admin/accueil"
              >
                <FontAwesomeIcon className="big-icons" icon={faHome} />
                <label>{showSidebar ? "Accueil" : null}</label>
              </Link>
            </li>
            <li className={activeLink === "link2" ? "active-link" : "link"}>
              <Link
                onClick={() => handleLinkClick("link2")}
                to="/admin/stagiaires"
              >
                <FontAwesomeIcon className="big-icons" icon={faUserGroup} />
                <label>{showSidebar ? "Stagiaires" : null}</label>
              </Link>
              <Link
                onClick={() => openStagiaireModal()}
                className="plus-container"
              >
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
              </Link>
            </li>
            <li className={activeLink === "link3" ? "active-link" : "link"}>
              <Link
                onClick={() => handleLinkClick("link3")}
                to="/admin/equipes"
              >
                <FontAwesomeIcon
                  className="big-icons"
                  icon={faUsersRectangle}
                />
                <label>{showSidebar ? "Equipes" : null}</label>
              </Link>
              <Link
                onClick={() => openEquipeModal()}
                className="plus-container"
              >
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
              </Link>
            </li>
            <li className={activeLink === "link4" ? "active-link" : "link"}>
              <Link
                onClick={() => handleLinkClick("link4")}
                to="/admin/encadrants"
              >
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
              <Link
                onClick={() => handleLinkClick("link5")}
                to="/admin/absence"
              >
                <FontAwesomeIcon
                  className="small-icons"
                  icon={faCalendarCheck}
                />
                <label>{showSidebar ? "Absence" : null}</label>
              </Link>
            </li>
            <li className={activeLink === "link6" ? "active-link" : "link"}>
              <Link
                onClick={() => handleLinkClick("link6")}
                to="/admin/discussions"
              >
                <FontAwesomeIcon className="small-icons" icon={faComment} />
                <label>{showSidebar ? "Discussions" : null}</label>
              </Link>
            </li>
            <li className={activeLink === "link7" ? "active-link" : "link"}>
              <Link
                onClick={() => handleLinkClick("link7")}
                to="/admin/parametres"
              >
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
              <Link
                onClick={closeStagiaireModal}
                className="stagiaire-close-link"
              >
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
                <input
                  placeholder="Entrez le nom du stagiaire"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              <div className="prenom-container">
                <label>Prénom du stagiaire</label>
                <input
                  placeholder="Entrez le prénom du stagiaire"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="email-container">
                <label>Email du stagiaire</label>
                <input
                  placeholder="Entrez l'email du stagiaire"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="email-container">
                <label>Mot de passe du stagiaire</label>
                <div className="password-container">
                  <input
                    disabled
                    value={
                      generatedPassword ||
                      "Votre mot de passe sera généré" ||
                      motDePasse
                    }
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Link
                    onClick={() => {
                      const newPassword = generatePassword();
                      setPassword(newPassword);
                    }}
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
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>
              <div className="prenom-container">
                <label>Genre du stagiaire</label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="nom-container">
                <label>CIN du stagiaire</label>
                <input
                  placeholder="Entrez le CIN du stagiaire"
                  value={CIN}
                  onChange={(e) => setCIN(e.target.value)}
                />
              </div>
              <div className="prenom-container">
                <label>CNE du stagiaire</label>
                <input
                  placeholder="Entrez le CNE du stagiaire"
                  value={CNE}
                  onChange={(e) => setCNE(e.target.value)}
                />
              </div>
              <div className="prenom-container">
                <label>Date de naissance du stagiaire</label>
                <input
                  className="date-naissance-input"
                  type="date"
                  value={dateNaissance}
                  onChange={(e) => setDateNaissance(e.target.value)}
                />
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
                <select
                  value={etablissment_id}
                  onChange={(e) => setEtablissment_id(Number(e.target.value))}
                >
                  <option value="1">ESTS - Université M5</option>
                  <option value="2">ENSA Kénitra</option>
                </select>
              </div>

              <div className="prenom-container">
                <label>Formation du stagiaire</label>
                <input
                  placeholder="Entrez la formation du stagiaire"
                  value={formation}
                  onChange={(e) => setFormation(e.target.value)}
                />
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
                  <option>Bahae-eddine Halim</option>
                </select>
              </div>
            </div>
            <div className="save-container">
              <Link onClick={closeStagiaireModal} className="annuler-link">
                Annuler
              </Link>
              <Link onClick={handleAjouterStagiaire} className="ajouter-link">
                Ajouter
              </Link>
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
              <div className="prenom-container">
                <label>Sujet de stage</label>
                <input placeholder="Entrez le sujet de stage" />
              </div>
              <div className="prenom-container">
                <label>Type du projet</label>
                <select>
                  <option>Web</option>
                  <option>Mobile</option>
                  <option>Desktop</option>
                  <option>Autre</option>
                </select>
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
                    <div
                      style={{
                        backgroundImage: `url(${filteredStagiaires[0].image})`,
                      }}
                      className="stagiaire-equipe-img"
                    ></div>
                    <label>
                      {filteredStagiaires[0].nom} {filteredStagiaires[0].prenom}
                    </label>
                  </div>
                  <button
                    className="ajouter-stagiaire-equipe-link"
                    onClick={() => handleStagiaireClick(filteredStagiaires[0])}
                    disabled={selectedStagiaires.find(
                      (s) => s.id === filteredStagiaires[0].id
                    )}
                  >
                    {selectedStagiaires.find(
                      (s) => s.id === filteredStagiaires[0].id
                    )
                      ? "Sélectionné"
                      : "Ajouter"}
                  </button>
                </div>
              )}
            </div>
            <div className="selected-stagiaires">
              <label>Stagiaires sélectionnés :</label>
              <div className="selected-stagiaire-liste">
                {selectedStagiaires.map((stagiaire) => (
                  <div
                    style={{ backgroundImage: `url(${stagiaire.image})` }}
                    key={stagiaire.id}
                    className="stagiaire-equipe-img"
                  >
                    <button
                      style={{
                        background: "none",
                        outline: "none",
                        border: "none",
                      }}
                      className="delete-selected-stagiaire-link"
                      onClick={() => handleDeleteStagiaire(stagiaire.id)}
                    >
                      <FontAwesomeIcon
                        className="stagiaire-equipe-delete-icon"
                        icon={faClose}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="equipe-info-devider">
              <div className="equipe-info-devider-line"></div>
            </div>
            <div className="form-group">
              <div className="nom-container">
                <label>Affecter encadrant</label>
                <select name="selectedEncadrant">
                  <option value="">Choisir...</option>
                  {encadrants.map((encadrant) => (
                    <option key={encadrant.id} value={encadrant.id}>
                      {encadrant.nom} {encadrant.prenom}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="nom-container">
                <label>Choisir les technologies</label>
                <Select
                  className="select-tech"
                  options={technologies.map((tech) => ({
                    value: tech.id,
                    label: tech.nom_technologie,
                  }))}
                  isMulti
                  value={selectedTechnologies}
                  onChange={handleTechnologiesChange}
                  placeholder="Sélectionner les technologies ..."
                />
              </div>
            </div>
            <div className="form-group">
              <div className="nom-container">
                <label>Décrire le projet </label>
                <textarea
                  placeholder="Donner une description du sujet du projet"
                  className="description-input"
                ></textarea>
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
