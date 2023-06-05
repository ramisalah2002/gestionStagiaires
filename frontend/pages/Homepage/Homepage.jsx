import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { AdminContext } from "../../Contexts/AdminContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Header from "../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faRectangleList } from "@fortawesome/free-regular-svg-icons";
import "../Homepage/Homepage.css";

function Homepage() {
  const [searchResults, setSearchResults] = useState([]); // New state for the search results
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState("");
  const [stagiaires, setStagiaires] = useState([]);

  const handleSearchTermChange = (searchTerm) => {
    // Filter the stagiaires array when the search term changes
    const results = stagiaires.filter((stagiaire) =>
      stagiaire.nom.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(searchTerm !== "");
    setSearchingText(searchTerm !== "" ? "Résultat de la recherche" : "");
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stagiaire")
      .then((response) => response.json())
      .then((data) => setStagiaires(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  const navigateTo = useNavigate();
  const { admin, loading } = useContext(AdminContext);
  const adminContext = useContext(AdminContext);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");

    if (!adminData && !loading) {
      // Admin data doesn't exist in localStorage, redirect to LoginPage
      navigateTo("/encadrant/login");
    } else if (adminData && !admin) {
      // Admin data exists in localStorage but not in context, set the admin context
      adminContext.setAdmin(JSON.parse(adminData));
    }
  }, [admin, loading, navigateTo]);

  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });

  if (loading) {
    // Show loading state while user data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className="header">
          <div className="admin-container">
            {admin && (
              <div
                style={{ backgroundImage: `url(${admin.image})` }}
                className="image-top"
              ></div>
            )}

            <div className="admin-info">
              {admin && (
                <>
                  <label className="admin-name">
                    {admin.nom} {admin.prenom}
                  </label>
                  <label className="admin-post">{admin.fonction}</label>
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
              {searchResults.map((stagiaire) => (
                <div key={stagiaire.id} className="last-stagiaire-card">
                  <div
                    style={{ backgroundImage: `url(${stagiaire.image})` }}
                    className="image-top"
                  ></div>
                  <label className="last-stagiaire-name">
                    {stagiaire.nom} {stagiaire.prenom}
                  </label>
                  <label className="last-stagiaire-formation">
                    {stagiaire.formation}
                  </label>
                  <Link className="voir-detail">Voir détail</Link>
                </div>
              ))}
            </div>
          </div>
        )}
        {!isSearching && (
          <div className="sections-container">
            <div className="stagiaires-container">
              <div className="stagiaires-header">
                <label className="stagiaires-title">Stagiaires</label>
                <Link to="/stagiaires" className="stagiaires-count">
                  <FontAwesomeIcon icon={faUser} />
                  {stagiaires.length < 10 && 0}
                  {stagiaires.length}
                </Link>
              </div>
              <div className="stagiaires-content">
                {stagiaires.slice(0, 7).map((stagiaire) => (
                  <div key={stagiaire.id} className="stagiaire">
                    <div className="stagiaire-info">
                      <div
                        className="stagiaire-img"
                        style={{ backgroundImage: `url(${stagiaire.image})` }}
                      ></div>
                      <div className="stagiaire-nom-formation">
                        <label className="stagiaire-nom">
                          {stagiaire.nom} {stagiaire.prenom}
                        </label>
                        <label className="stagiaire-formation">
                          {stagiaire.formation}
                        </label>
                      </div>
                    </div>
                    <button className="stagiaire-btn">Découvrir</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="project-abscence-section">
              <div className="project-container">
                <div className="stagiaires-header">
                  <label className="stagiaires-title">Projets</label>
                  <Link to="/projets" className="stagiaires-count">
                    <FontAwesomeIcon icon={faRectangleList} />{" "}
                    {stagiaires.length}
                  </Link>
                </div>
                <div className="stagiaires-content">
                  <div className="stagiaire">
                    <div className="project-info">
                      <div className="stagiaire-nom-formation">
                        <label className="stagiaire-nom">Theme projet 1</label>
                        <label className="stagiaire-formation">
                          équipe: Stagiaire1 et Stagiaire2
                        </label>
                      </div>
                    </div>
                    <div className="project-status-yellow">En cours</div>
                  </div>
                  <div className="stagiaire">
                    <div className="project-info">
                      <div className="stagiaire-nom-formation">
                        <label className="stagiaire-nom">Theme projet 2</label>
                        <label className="stagiaire-formation">
                          équipe: Stagiaire3 et Stagiaire4
                        </label>
                      </div>
                    </div>
                    <div className="project-status-green">Terminé</div>
                  </div>
                  <div className="stagiaire">
                    <div className="project-info">
                      <div className="stagiaire-nom-formation">
                        <label className="stagiaire-nom">Theme projet 2</label>
                        <label className="stagiaire-formation">
                          équipe: Stagiaire3 et Stagiaire4
                        </label>
                      </div>
                    </div>
                    <div className="project-status-green">Terminé</div>
                  </div>
                </div>
              </div>
              <div className="abscence-container-a">
                <div className="stagiaires-header">
                  <div className="today-abscence-a">
                    <label className="stagiaires-title">Absence</label>
                    <div className="today-abscence-container-a">
                      <label className="today-abscence-day">Aujourd'hui</label>
                    </div>
                  </div>
                  <Link to="/absence" className="see-more-abscence">
                    voir plus
                  </Link>
                </div>
                <div className="abscence-content-a">
                  <div className="abscence">
                    <div className="abscence-info">
                      <div className="red-line"></div>
                      <div className="stagiaire-nom-formation">
                        <label className="stagiaire-nom">
                          RAMI Salah-eddine
                        </label>
                        <label className="stagiaire-formation">
                          justification: certificat medical
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="abscence">
                    <div className="abscence-info">
                      <div className="red-line"></div>
                      <div className="stagiaire-nom-formation">
                        <label className="stagiaire-nom">
                          BOULAAJOUL Anass
                        </label>
                        <label className="stagiaire-formation">
                          justification: certificat medical
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="abscence">
                    <div className="abscence-info">
                      <div className="red-line"></div>
                      <div className="stagiaire-nom-formation">
                        <label className="stagiaire-nom">
                          BOULAAJOUL Anass
                        </label>
                        <label className="stagiaire-formation">
                          justification: certificat medical
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="abscence">
                    <div className="abscence-info">
                      <div className="red-line"></div>
                      <div className="stagiaire-nom-formation">
                        <label className="stagiaire-nom">
                          BOULAAJOUL Anass
                        </label>
                        <label className="stagiaire-formation">
                          justification: certificat medical
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Homepage;
