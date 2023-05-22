import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faRectangleList,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import "./Encadrant.css";
import Header from '../../components/Header/Header';
import Sidebar from "../../components/Sidebar/Sidebar";
// import 'bootstrap/dist/css/bootstrap.css';

function Encadrant() {
  const [user, setUser] = useState(null);
  const navigateTo = useNavigate();


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
                    <label className="admin-post">poste</label>
                  </>
                )}
              </div>
              <div className="vertical-line"></div>
              <div className="today-container">
                <FontAwesomeIcon className="calendar-icon" icon={faCalendarDays} />
                <label className="today-label">{currentDate}</label>
              </div>
            </div>
            <div className="search-container">
              <FontAwesomeIcon className="search-icon" icon={faSearch} />
              <input className="search-input" placeholder="Rechercher ..." type="text" />
            </div>
          </div>        
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Header 1</th>
                <th>Header 2</th>
                <th>Header 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
              </tr>
              <tr>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
              </tr>
              {/* Add more table rows as needed */}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Encadrant;