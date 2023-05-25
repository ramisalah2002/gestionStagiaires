import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

import {
  faSearch,
  faCircleUser,
  faCalendarDays,
  faPen,
  faPlus,
  faStopwatch,
  faChevronRight,
  faDownload,
  faCloudDownloadAlt,
  faFileImport,
  faFileUpload,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faRectangleList,
  faPlusSquare,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import "./Stagiaire.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaFileDownload, FaFileImport } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import readXlsxFile from "read-excel-file";

function Stagiaire() {
  const [searchResults, setSearchResults] = useState([]); // New state for the search results
  const [isSearching, setIsSearching] = useState(false);
  const [searchingText, setSearchingText] = useState(
    "Les 4 derniers stagiaires"
  );

  const handleSearchTermChange = (searchTerm) => {
    // Filter the stagiaires array when the search term changes
    const results = stagiaires.filter((stagiaire) =>
      stagiaire.nom.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(searchTerm !== "");
    setSearchingText(
      searchTerm !== ""
        ? "Résultat de la recherche"
        : "Les 4 derniers stagiaires"
    );
  };

  const [user, setUser] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    setSearchResults(stagiaires);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      // User data not found, navigate to LoginPage
      navigateTo("/LoginPage");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigateTo]);

  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });

  const stagiaires = [
    {
      id: 1,
      nom: "Rami Salah-eddine",
      email: "ramisalah2002@gmail.com",
      status: "Actif",
      joursStage: "4 jours",
    },
    {
      id: 2,
      nom: "John Doe",
      email: "johndoe@example.com",
      status: "Terminé",
      joursStage: "10 jours",
    },
    {
      id: 3,
      nom: "Rami Salah-eddine",
      email: "ramisalah2002@gmail.com",
      status: "Actif",
      joursStage: "4 jours",
    },
    {
      id: 4,
      nom: "John Doe",
      email: "johndoe@example.com",
      status: "Terminé",
      joursStage: "10 jours",
    },
    {
      id: 5,
      nom: "John Doe",
      email: "johndoe@example.com",
      status: "Terminé",
      joursStage: "10 jours",
    },
    {
      id: 6,
      nom: "Rami Salah-eddine",
      email: "ramisalah2002@gmail.com",
      status: "Actif",
      joursStage: "4 jours",
    },
    {
      id: 7,
      nom: "John Doe",
      email: "johndoe@example.com",
      status: "Terminé",
      joursStage: "10 jours",
    },
    {
      id: 8,
      nom: "John Doe",
      email: "johndoe@example.com",
      status: "Terminé",
      joursStage: "10 jours",
    },
    {
      id: 7,
      nom: "John Doe",
      email: "johndoe@example.com",
      status: "Terminé",
      joursStage: "10 jours",
    },
  ];

  const getCurrentDate = () => {
    const todayDate = new Date();
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = todayDate.toLocaleDateString("en-GB", options);
    return formattedDate.replace(/\//g, "_");
  };

  const handleDownloadStagiairesXlsx = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Stagiaires");
    worksheet.columns = [
      { header: "#", key: "id", width: 5 },
      { header: "Nom", key: "nom", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Status", key: "status", width: 15 },
      { header: "En stage", key: "joursStage", width: 10 },
    ];
    stagiaires.forEach((stagiaire) => {
      worksheet.addRow(stagiaire);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "stagiaires_" + getCurrentDate() + ".xlsx");
    setShowLinks(false);
  };

  const handleDownloadStagiairesPdf = () => {
    const doc = new jsPDF();

    // Load the logo image
    const logoImg = new Image();
    logoImg.src = "../../images/logoMen.png";

    // Wait for the image to load
    logoImg.onload = () => {
      const logoWidth = 100; // Width of the logo image
      const logoHeight = (logoImg.height * logoWidth) / logoImg.width; // Calculate the height proportionally

      // Center the logo image
      const startX = (doc.internal.pageSize.getWidth() - logoWidth) / 2;
      doc.addImage(logoImg, "PNG", startX, 5, logoWidth, logoHeight);

      // Add the title below the image
      const titleText = "Liste des stagiaires";
      const titleFontSize = 18;
      const titleMarginTop = 10 + logoHeight + 10; // Add margin below the image
      const titleX =
        doc.internal.pageSize.getWidth() -
        doc.getStringUnitWidth(titleText) * titleFontSize +
        22;
      doc.setFontSize(titleFontSize);
      doc.text(titleText, titleX, titleMarginTop);

      // Add the table
      let tableData = [];
      stagiaires.forEach((stagiaire, index) => {
        const rowData = [
          index + 1,
          stagiaire.nom,
          stagiaire.email,
          stagiaire.status,
          stagiaire.joursStage,
        ];
        tableData.push(rowData);
      });

      const tableMarginTop = titleMarginTop + 10; // Add margin below the title
      doc.autoTable({
        head: [["#", "Nom", "Email", "Status", "En stage"]],
        body: tableData,
        startY: tableMarginTop,
      });

      // Save the PDF file
      doc.save("stagiaires_" + getCurrentDate() + ".pdf");
      setShowLinks(false);
    };
  };

  const [showLinks, setShowLinks] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowLinks(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const [stagiairesList, setStagiairesList] = useState([]);
  const fileInputRef = useRef(null);
  const [showImport, setShowImport] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    readXlsxFile(file).then((rows) => {
      const data = rows.slice(1); // Exclude the first row (header)
      setStagiairesList(data); // Store the data in stagiairesList state
    });
  };

  const handleImportStagiaires = () => {
    fileInputRef.current.click(); // Trigger the hidden input file click event
  };

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className="header">
          <div className="admin-container">
            <FontAwesomeIcon className="admin-icon" icon={faCircleUser} />
            <div className="admin-info">
              {user && (
                <>
                  <label className="admin-name">
                    {user.nom} {user.prenom}
                  </label>
                  <label className="admin-post">{user.fonction}</label>
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
        <div className="last-stagiaires-container-search">
          {isSearching && (
            <>
              <div className="new-stagiaires">
                <h2>{searchingText}</h2>
              </div>
              <div className="last-stagiaires-content-search">
                {searchResults.map((stagiaire) => (
                  <div key={stagiaire.id} className="last-stagiaire-card">
                    <div className="image-top"></div>
                    <label className="last-stagiaire-name">
                      {stagiaire.nom}
                    </label>
                    <label className="last-stagiaire-formation">
                      2ème année génie logiciel
                    </label>
                    <Link className="voir-detail">Voir détail</Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {!isSearching && (
          <>
            <div className="last-stagiaires-container-search">
              <div className="new-stagiaires">
                <h2>{searchingText}</h2>
              </div>
              <div className="last-stagiaires-content-search">
                {searchResults.slice(0, 4).map((stagiaire) => (
                  <div key={stagiaire.id} className="last-stagiaire-card">
                    <div className="image-top"></div>
                    <label className="last-stagiaire-name">
                      {stagiaire.nom}
                    </label>
                    <label className="last-stagiaire-formation">
                      2ème année génie logiciel
                    </label>
                    <Link className="voir-detail">Voir détail</Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="table-container">
              <div className="teams-header">
                <h2>Tous les stagiaires</h2>
                <div className="stagiaires-link-container">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <Link
                    className="import-stagiaires-link"
                    onClick={handleImportStagiaires}
                  >
                    <FontAwesomeIcon
                      className="import-icon"
                      icon={faFileUpload}
                    ></FontAwesomeIcon>
                  </Link>
                  {showImport && stagiairesList.length > 0 && (
                    <table>{/* Table content */}</table>
                  )}
                  <div className="download-links-wrapper" ref={containerRef}>
                    <Link
                      className="download-stagiaires-link"
                      onClick={toggleLinks}
                    >
                      <FontAwesomeIcon
                        className="download-icon"
                        icon={faDownload}
                      ></FontAwesomeIcon>
                    </Link>
                    {showLinks && (
                      <div className="download-links-container">
                        <Link
                          onClick={handleDownloadStagiairesPdf}
                          className="download-link"
                        >
                          Télécharger PDF
                        </Link>
                        <Link
                          onClick={handleDownloadStagiairesXlsx}
                          className="download-link"
                        >
                          Télécharger XLSX
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link className="new-team-link">
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Ajouter
                    stagiaire
                  </Link>
                </div>
              </div>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>En stage</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stagiaires.map((stagiaire) => (
                    <tr key={stagiaire.id}>
                      <td className="stagiaire-div">
                        <div className="circle"></div> {stagiaire.nom}
                      </td>
                      <td>{stagiaire.email}</td>
                      <td>
                        <div
                          className={
                            stagiaire.status === "Actif"
                              ? "status-actif"
                              : "status-inactif"
                          }
                        >
                          {stagiaire.status}
                        </div>
                      </td>
                      <td>
                        <label className="days-in-stage">
                          {stagiaire.joursStage}
                        </label>
                      </td>
                      <td className="actions-td">
                        <Link className="action-modifier">
                          <FontAwesomeIcon icon={faEye} />
                          Voir
                        </Link>
                        <Link className="delete-link">
                          <FontAwesomeIcon
                            className="delete-icon"
                            icon={faTrashAlt}
                          />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Stagiaire;
