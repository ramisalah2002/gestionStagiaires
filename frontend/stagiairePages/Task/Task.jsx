import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../../Contexts/AdminContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faClose,
  faCalendarDays,
  faLocationDot,
  faPaperclip,
  faUsers,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Task.css";
import { faClock } from "@fortawesome/free-regular-svg-icons";

function Task() {

  
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
            />
          </div>
        </div>
        <div className="sections-container-task">
            <label className="tasks-header">Activités</label>
            <div className="task-rows">
                <div className="task-row">
                    <div className="task-header">
                        <label className="task-day">Conception</label>
                        <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="tasks-container">
                        <div className="task-container">
                            
                        </div>
                        <div className="task-container">
                            
                        </div>
                        <div className="task-container">
                            
                        </div>
                        <div className="task-container">
                            
                        </div>
                        <div className="task-container">
                            
                        </div>
                        <div className="task-container">
                            
                        </div>
                        <div className="task-container">
                            
                        </div>
                        <div className="task-container">
                            
                        </div>
                        
                    </div>
                </div>
                <div className="task-row">
                    <div className="task-header">
                        <label className="task-day">Frontend</label>
                        <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="tasks-container">
                        <div className="task-container">
                            
                        </div>
                        
                    </div>
                </div>
                <div className="task-row">
                    <div className="task-header">
                        <label className="task-day">Backend</label>
                        <FontAwesomeIcon className="plus-icon" icon={faPlus} />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="tasks-container">
                        <div className="task-container">
                            
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
      </main>
    </div>
  );
}

export default Task;
