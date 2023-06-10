import React, { useEffect, useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { AdminContext } from "../../Contexts/AdminContext";
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
  faClose,
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
  const [showModal, setShowModal] = useState(false);
  const [searchingText, setSearchingText] = useState(
    "Les 4 derniers stagiaires"
  );
  const [stagiaires, setStagiaires] = useState([]);

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

  // const [user, setUser] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    setSearchResults(stagiaires);
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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

  const [generatedPassword, setGeneratedPassword] = useState("");

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

  const { admin, loading } = useContext(AdminContext);
  const adminContext = useContext(AdminContext);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData && !loading) {
      // Admin data doesn't exist in localStorage, redirect to LoginPage
      navigateTo("/admin/login");
    } else if (adminData && !admin) {
      // Admin data exists in localStorage but not in context, set the admin context
      adminContext.setAdmin(JSON.parse(adminData));
    }
  }, [admin, loading, navigateTo, adminContext]);

  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stagiaires-with-stage")
      .then((response) => response.json())
      .then((data) => setStagiaires(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

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
      { header: "Prenom", key: "prenom", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Status", key: "status", width: 15 },
      { header: "En stage", key: "enStage", width: 10 },
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
          stagiaire.nom + " " + stagiaire.prenom,
          stagiaire.email,
          stagiaire.status,

        ];
        tableData.push(rowData);
      });

      const tableMarginTop = titleMarginTop + 10; // Add margin below the title
      doc.autoTable({
        head: [["#", "Nom et prenom", "Email", "Status", "En stage"]],
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
            {admin && (
              <div
                style={{ backgroundImage: `url(${admin.image})` }}
                className="image-top"
              ></div>
            )}
            {!admin && (
              <FontAwesomeIcon className="admin-icon" icon={faCircleUser} />
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
            <div className="last-stagiaires-content-search">
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
                  <Link to={`/admin/profile-stagiaire/${stagiaire.id}`} className="voir-detail">Voir détail</Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isSearching && (
          <>
            <div className="last-stagiaires-container-search">
              <div className="new-stagiaires">
                <h2 className="text-header">{searchingText}</h2>
              </div>
              <div className="last-stagiaires-content-search">
                {stagiaires.slice(0, 4).map((stagiaire) => (
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
                    <Link to={`/admin/profile-stagiaire/${stagiaire.id}`} className="voir-detail">Voir détail</Link>
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
                  <Link onClick={() => openModal()} className="new-team-link">
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
                        <div
                          style={{ backgroundImage: `url(${stagiaire.image})` }}
                          className="circle"
                        ></div>{" "}
                        {stagiaire.nom} {stagiaire.prenom}
                      </td>
                      <td>{stagiaire.email}</td>
                      <td>
                        <div
                          className={
                            stagiaire.status === "en cours"
                              ? "status-actif"
                              : "status-inactif"
                          }
                        >
                          {stagiaire.status}
                        </div>
                      </td>
                      <td>
                        {stagiaire.stage && (
                          <label className="days-in-stage">
                            {stagiaire.stage.enStage} jours
                          </label>
                        )}
                      </td>
                      <td className="actions-td">
                        <Link to={`/admin/profile-stagiaire/${stagiaire.id}`} className="action-modifier">
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
      {showModal && (
        <div className="stagiaire-modal-overlay">
          <form className="stagiaire-modal-content">
            <div className="stagiaire-modal-header">
              <h2>Ajouter stagiaire</h2>
              <Link onClick={closeModal} className="stagiaire-close-link">
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
                <input placeholder="Entrez le nom du stagiaire" />
              </div>
              <div className="prenom-container">
                <label>Prénom du stagiaire</label>
                <input placeholder="Entrez le prénom du stagiaire" />
              </div>
            </div>
            <div className="form-group">
              <div className="email-container">
                <label>Email du stagiaire</label>
                <input placeholder="Entrez l'email du stagiaire" />
              </div>
              <div className="email-container">
                <label>Mot de passe du stagiaire</label>
                <div className="password-container">
                  <input
                    disabled
                    value={
                      generatedPassword || "Votre mot de passe sera généré"
                    }
                  />
                  <Link
                    className="generate-password"
                    onClick={generatePassword}
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
                />
              </div>
              <div className="prenom-container">
                <label>Genre du stagiaire</label>
                <select>
                  <option>Homme</option>
                  <option>Femme</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="nom-container">
                <label>CIN du stagiaire</label>
                <input placeholder="Entrez le CIN du stagiaire" />
              </div>
              <div className="prenom-container">
                <label>CNE du stagiaire</label>
                <input placeholder="Entrez le CNE du stagiaire" />
              </div>
              <div className="prenom-container">
                <label>Date de naissance du stagiaire</label>
                <input className="date-naissance-input" type="date" />
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
                <select>
                  <option>ESTS - Université M5</option>
                  <option>ENSA Kénitra</option>
                </select>
              </div>
              <div className="prenom-container">
                <label>Formation du stagiaire</label>
                <input placeholder="Entrez la formation du stagiaire" />
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
                  <option>Bahae-eddine</option>
                </select>
              </div>
            </div>
            <div className="save-container">
              <Link onClick={closeModal} className="annuler-link">
                Annuler
              </Link>
              <Link className="ajouter-link">Ajouter</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Stagiaire;
