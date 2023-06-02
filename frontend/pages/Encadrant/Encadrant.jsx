import React, { useState, useRef, useEffect, useContext } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import "./Encadrant.css";
import Sidebar from "../../components/Sidebar/Sidebar";

function Encadrant() {
  const [searchResults, setSearchResults] = useState([]); // New state for the search results
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSearchTermChange = (searchTerm) => {
    // Filter the stagiaires array when the search term changes
    const results = encadrants.filter((encadrant) =>
      encadrant.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(searchTerm !== "");
    setSearchingText(searchTerm !== "" ? "Résultat de la recherche" : "");
  };

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
  }, [admin, loading, navigateTo, adminContext]);

  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });

  const encadrants = [
    {
      name: "RAMI Salah-eddine",
      poste: "Chef RH",
    },
    {
      name: "BOULAAJOUL Anass",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali",
      poste: "Product Manager",
    },
    {
      name: "FATIMA Zahra",
      poste: "UI/UX Designer",
    },
    {
      name: "HAMZA Alaoui",
      poste: "Data Scientist",
    },
    {
      name: "AMINA Chakir",
      poste: "Backend Developer",
    },
    {
      name: "KARIM Hassan",
      poste: "Frontend Developer",
    },
    {
      name: "NADIA Bousfiha",
      poste: "Business Analyst",
    },
    {
      name: "Mohamed Salah",
      poste: "Chef RH",
    },
    {
      name: "Anass Sefriwi",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali Kmay",
      poste: "Product Manager",
    },
    {
      name: "Kechfi FATIMA Zahra",
      poste: "UI/UX Designer",
    },
    {
      name: "LBHIHI HAMZA ",
      poste: "Data Scientist",
    },
    {
      name: "Chakir Saad",
      poste: "Backend Developer",
    },
    {
      name: " SI KARIM L2a7madi",
      poste: "Frontend Developer",
    },
    {
      name: "NADIA Nadya",
      poste: "Business Analyst",
    },
    {
      name: "RAMI Salah-eddine",
      poste: "Chef RH",
    },
    {
      name: "BOULAAJOUL Anass",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali",
      poste: "Product Manager",
    },
    {
      name: "FATIMA Zahra",
      poste: "UI/UX Designer",
    },
    {
      name: "HAMZA Alaoui",
      poste: "Data Scientist",
    },
    {
      name: "AMINA Chakir",
      poste: "Backend Developer",
    },
    {
      name: "KARIM Hassan",
      poste: "Frontend Developer",
    },
    {
      name: "NADIA Bousfiha",
      poste: "Business Analyst",
    },
    {
      name: "Mohamed Salah",
      poste: "Chef RH",
    },
    {
      name: "Anass Sefriwi",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali Kmay",
      poste: "Product Manager",
    },
    {
      name: "Kechfi FATIMA Zahra",
      poste: "UI/UX Designer",
    },
    {
      name: "LBHIHI HAMZA ",
      poste: "Data Scientist",
    },
    {
      name: "Chakir Saad",
      poste: "Backend Developer",
    },
    {
      name: " SI KARIM L2a7madi",
      poste: "Frontend Developer",
    },
    {
      name: "NADIA Nadya",
      poste: "Business Analyst",
    },
    {
      name: "RAMI Salah-eddine",
      poste: "Chef RH",
    },
    {
      name: "BOULAAJOUL Anass",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali",
      poste: "Product Manager",
    },

    {
      name: "NADIA Bousfiha",
      poste: "Business Analyst",
    },
    {
      name: "Mohamed Salah",
      poste: "Chef RH",
    },
    {
      name: "Anass Sefriwi",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali Kmay",
      poste: "Product Manager",
    },
    {
      name: "Kechfi FATIMA Zahra",
      poste: "UI/UX Designer",
    },
    {
      name: "LBHIHI HAMZA ",
      poste: "Data Scientist",
    },
    {
      name: "Chakir Saad",
      poste: "Backend Developer",
    },
    {
      name: " SI KARIM L2a7madi",
      poste: "Frontend Developer",
    },
    {
      name: "NADIA Nadya",
      poste: "Business Analyst",
    },
    {
      name: "RAMI Salah-eddine",
      poste: "Chef RH",
    },
    {
      name: "BOULAAJOUL Anass",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali",
      poste: "Product Manager",
    },
    {
      name: "FATIMA Zahra",
      poste: "UI/UX Designer",
    },
    {
      name: "HAMZA Alaoui",
      poste: "Data Scientist",
    },
    {
      name: "AMINA Chakir",
      poste: "Backend Developer",
    },
    {
      name: "KARIM Hassan",
      poste: "Frontend Developer",
    },
    {
      name: "NADIA Bousfiha",
      poste: "Business Analyst",
    },
    {
      name: "Mohamed Salah",
      poste: "Chef RH",
    },
    {
      name: "Anass Sefriwi",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali Kmay",
      poste: "Product Manager",
    },
    {
      name: "Kechfi FATIMA Zahra",
      poste: "UI/UX Designer",
    },
    {
      name: "LBHIHI HAMZA ",
      poste: "Data Scientist",
    },
    {
      name: "Chakir Saad",
      poste: "Backend Developer",
    },
    {
      name: " SI KARIM L2a7madi",
      poste: "Frontend Developer",
    },
    {
      name: "NADIA Nadya",
      poste: "Business Analyst",
    },
    {
      name: "RAMI Salah-eddine",
      poste: "Chef RH",
    },
    {
      name: "BOULAAJOUL Anass",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali",
      poste: "Product Manager",
    },
    {
      name: "FATIMA Zahra",
      poste: "UI/UX Designer",
    },
    {
      name: "HAMZA Alaoui",
      poste: "Data Scientist",
    },
    {
      name: "AMINA Chakir",
      poste: "Backend Developer",
    },
    {
      name: "KARIM Hassan",
      poste: "Frontend Developer",
    },
    {
      name: "NADIA Bousfiha",
      poste: "Business Analyst",
    },
    {
      name: "Mohamed Salah",
      poste: "Chef RH",
    },
    {
      name: "Anass Sefriwi",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali Kmay",
      poste: "Product Manager",
    },
    {
      name: "Kechfi FATIMA Zahra",
      poste: "UI/UX Designer",
    },
    {
      name: "LBHIHI HAMZA ",
      poste: "Data Scientist",
    },
    {
      name: "Chakir Saad",
      poste: "Backend Developer",
    },
    {
      name: " SI KARIM L2a7madi",
      poste: "Frontend Developer",
    },
    {
      name: "NADIA Nadya",
      poste: "Business Analyst",
    },
    {
      name: "RAMI Salah-eddine",
      poste: "Chef RH",
    },
    {
      name: "BOULAAJOUL Anass",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali",
      poste: "Product Manager",
    },
    {
      name: "FATIMA Zahra",
      poste: "UI/UX Designer",
    },
    {
      name: "HAMZA Alaoui",
      poste: "Data Scientist",
    },
    {
      name: "AMINA Chakir",
      poste: "Backend Developer",
    },
    {
      name: "KARIM Hassan",
      poste: "Frontend Developer",
    },
    {
      name: "NADIA Bousfiha",
      poste: "Business Analyst",
    },
    {
      name: "Mohamed Salah",
      poste: "Chef RH",
    },
    {
      name: "Anass Sefriwi",
      poste: "Developpeur Mobile",
    },
    {
      name: "MOHAMED Ali Kmay",
      poste: "Product Manager",
    },
    {
      name: "Kechfi FATIMA Zahra",
      poste: "UI/UX Designer",
    },
    {
      name: "LBHIHI HAMZA ",
      poste: "Data Scientist",
    },
    {
      name: "Chakir Saad",
      poste: "Backend Developer",
    },
    {
      name: " SI KARIM L2a7madi",
      poste: "Frontend Developer",
    },
    {
      name: "NADIA Nadya",
      poste: "Business Analyst",
    },
  ];

  const pageCount = Math.ceil(encadrants.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  let paginationItems = [];

  if (pageCount <= 5) {
    paginationItems = pageNumbers;
  } else {
    if (currentPage <= 3) {
      paginationItems = [...pageNumbers.slice(0, 5), "...", pageCount];
    } else if (currentPage >= pageCount - 2) {
      paginationItems = [
        1,
        "...",
        ...pageNumbers.slice(pageCount - 5, pageCount),
      ];
    } else {
      paginationItems = [
        1,
        "...",
        ...pageNumbers.slice(currentPage - 2, currentPage + 1),
        "...",
        pageCount,
      ];
    }
  }

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className="header">
          <div className="admin-container">
            <FontAwesomeIcon className="admin-icon" icon={faCircleUser} />
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
          <>
            <div className="new-encadrants">
              <label>{searchingText}</label>
            </div>
            <div className="encadrant-content">
              {searchResults.map((encadrant, index) => (
                <div key={index} className="encadrant-card">
                  <div className="image-top"></div>
                  <label className="encadrant-name">{encadrant.name}</label>
                  <label className="encadrant-poste">{encadrant.poste}</label>
                  <Link className="voir-detail">Voir détail</Link>
                </div>
              ))}
            </div>
          </>
        )}
        {!isSearching && (
          <>
            <div className="new-encadrants">
              <label>Liste des encadrants</label>
            </div>
            <div className="encadrant-content">
              {encadrants
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((encadrant, index) => (
                  <div key={index} className="encadrant-card">
                    <div className="image-top"></div>
                    <label className="encadrant-name">{encadrant.name}</label>
                    <label className="encadrant-poste">{encadrant.poste}</label>
                    <Link className="voir-detail">Voir détail</Link>
                  </div>
                ))}
            </div>
            <div className="pagination">
              {paginationItems.map((item, index) => {
                if (typeof item === "number") {
                  return (
                    <button
                      key={index}
                      className={`pagination-btn ${
                        item === currentPage ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(item)}
                    >
                      {item}
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={index}
                      className={`pagination-btn`}
                      style={{ cursor: "default", color: "#ced4da" }}
                      disabled
                    >
                      {item}
                    </button>
                  );
                }
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Encadrant;
