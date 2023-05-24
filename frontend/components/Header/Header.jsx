import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header() {
  const [searchTerm, setSearchTerm] = useState(""); // New state for the search term

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update the state when the search input changes
  };

  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });
  return (
    <div className="header">
      <div className="admin-container">
        <FontAwesomeIcon className="admin-icon" icon={faCircleUser} />
        <div className="admin-info">
          <label className="admin-name">Nom Administrateur</label>
          <label className="admin-post">Poste administrateur</label>
        </div>
        <div className="vertical-line"></div>
        <div className="today-container">
          <FontAwesomeIcon className="calendar-icon" icon={faCalendarDays} />
          <label className="today-label">{currentDate}</label>
        </div>
      </div>
      <div className="search-container">
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        <input
          className="search-input"
          placeholder="Rechercher ..."
          type="text"
          value={searchTerm} // Control the input value with the state
          onChange={handleSearchChange} // Handle changes in the search input
        />
      </div>
    </div>
  );
}

export default Header;
