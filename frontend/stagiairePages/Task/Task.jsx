import React, { useState, useEffect, useContext } from "react";
import { StagiaireContext } from "../../Contexts/StagiaireContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
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
import StagiaireSidebar from "../../components/Sidebar/StagiaireSidebar";

function Task() {

  
  const navigateTo = useNavigate();
  const { stagiaire, loading } = useContext(StagiaireContext);
  const stagiaireContext = useContext(StagiaireContext);
  const [showAvancementModal, setShowAvancementModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('conception');

  useEffect(() => {
    const stagiaireData = localStorage.getItem("stagiaire");
    if (!stagiaireData && !loading) {
      // Admin data doesn't exist in localStorage, redirect to LoginPage
      navigateTo("/encadrant/login");
    } else if (stagiaireData && !stagiaire) {
      // Admin data exists in localStorage but not in context, set the admin context
      stagiaireContext.setStagiaire(JSON.parse(stagiaireData));
    }
  }, [stagiaire, loading, navigateTo, stagiaireContext]);

  const currentDate = new Date().toLocaleString("fr-FR", {
    day: "numeric",
    month: "short",
  });

  

  
  

  
  
  
  const handleConc = () => {
    setSelectedTitle("conception");
    setShowAvancementModal(true);
  };
  const handleFront = () => {
    setSelectedTitle("frontend");
    setShowAvancementModal(true);
  };
  const handleBack = () => {
    setSelectedTitle("backend");
    setShowAvancementModal(true);
  };

  const [avancements, setAvancements] = useState([]);
const [avancementTypes, setAvancementTypes] = useState([]);

const fetchAvancement = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/avancements/${id}`);
    const data = await response.json();
    setAvancementTypes(data);
  } catch (error) {
    console.error('Error fetching avancements:', error);
  }
};

useEffect(() => {
  const fetchData = async () => {
    try {
      // Check if stagiaire exists
      if (stagiaire) {
        const response = await axios.get(`http://127.0.0.1:8000/api/stagiaire/${stagiaire.id}/avancements`);
        setAvancements(response.data);
        console.log(response.data);
        fetchAvancement(response.data.projet_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, [stagiaire]); // Add stagiaire as a dependency

useEffect(() => {
  if (avancementTypes.length > 0) {
    console.log(avancementTypes); // Display avancementTypes in the console
  } 
}, [avancementTypes]); // Add avancementTypes as a dependency
// Add stagiaire as a dependency



  


  function formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const formattedDate = formatDate();

  const [textareaValue, setTextareaValue] = useState('');

const handleTextareaChange = (event) => {
  setTextareaValue(event.target.value);
};


  const [value, setValue] = useState('');
  const handleChange = (event) => {
    const currentValue = event.target.value;
    let maxValue = 10; // Default max value
  
    // Check if selectedTitle matches any avancement type
    const matchedType = avancementTypes.find((type) => type.type.toLowerCase() === selectedTitle.toLowerCase());
  
    // If a match is found, update the maxValue
    if (matchedType) {
      maxValue = 100 - matchedType.sum_valeur;
    }
  
    // Check if the input value is empty or a valid decimal number under the maxValue
    if (currentValue === '' || (/^\d*\.?\d*$/.test(currentValue) && parseFloat(currentValue) <= maxValue)) {
      setValue(currentValue);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = {
      date: formattedDate,
      type: selectedTitle,
      text: textareaValue, // Get the value from the textarea
      valeur: value,
      projet_id: avancements.projet_id,
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/avancement', formData);
      console.log(response.data);
      // Handle success or display a success message
    } catch (error) {
      console.error('Error creating avancement:', error);
      // Handle error or display an error message
    }
  };
  

  return (
    <div className="app">
      <StagiaireSidebar />
      <main className="main-content">
        <div className="header">
          <div className="admin-container">
            <FontAwesomeIcon className="admin-icon" icon={faCircleUser} />
            <div className="admin-info">
              {stagiaire && (
                <>
                  <label className="admin-name">
                    {stagiaire.nom} {stagiaire.prenom}
                  </label>
                  <label className="admin-post">{stagiaire.formation}</label>
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
                        <label className="task-day task-day-conception">Conception</label>
                        <FontAwesomeIcon className="plus-icon plus-icon-c" onClick={handleConc} icon={faPlus} />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="tasks-container">
                        {avancements && avancements.avancements && avancements.avancements.length > 0 ? (
                          avancements.avancements
                            .filter((stagiaireAvancements) => stagiaireAvancements.type.toLowerCase() === 'conception')
                            .map((stagiaireAvancements) => (
                              <div key={stagiaireAvancements.id} className="task-container">
                                <div className="task-top">
                                  <div className="task-vertical-line"/>
                                  <label>#{stagiaireAvancements.id}</label>
                                </div>
                                <p className="task-text">{stagiaireAvancements.text}</p>
                                <div className="task-bottom">
                                  <label className="date-label">Date: </label>
                                  <label className="date-text">{stagiaireAvancements.date}</label>
                                </div>
                              </div>
                            ))
                        ) : (
                          <p>Aucun avancement encore ici</p>
                        )}
                    </div>
                </div>
                <div className="task-row">
                    <div className="task-header">
                        <label className="task-day task-day-frontend">Frontend</label>
                        <FontAwesomeIcon className="plus-icon plus-icon-f" onClick={handleFront} icon={faPlus} />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="tasks-container">
                        {avancements && avancements.avancements && avancements.avancements.length > 0 ? (
                          avancements.avancements
                            .filter((stagiaireAvancements) => stagiaireAvancements.type.toLowerCase() === 'frontend')
                            .map((stagiaireAvancements) => (
                              <div key={stagiaireAvancements.id} className="task-container">
                                <div className="task-top">
                                  <div className="task-vertical-line task-vertical-line-f"/>
                                  <label>#{stagiaireAvancements.id}</label>
                                </div>
                                <p className="task-text">{stagiaireAvancements.text}</p>
                                <div className="task-bottom">
                                  <label className="date-label">Date: </label>
                                  <label className="date-text">{stagiaireAvancements.date}</label>
                                </div>
                              </div>
                            ))
                        ) : (
                          <p>Aucun avancement encore ici</p>
                        )}
                    </div>
                </div>
                <div className="task-row">
                    <div className="task-header">
                        <label className="task-day task-day-backend">Backend</label>
                        <FontAwesomeIcon className="plus-icon plus-icon-b" onClick={handleBack} icon={faPlus} />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="tasks-container">
                        {avancements && avancements.avancements && avancements.avancements.length > 0 ? (
                          avancements.avancements
                            .filter((stagiaireAvancements) => stagiaireAvancements.type.toLowerCase() === 'backend')
                            .map((stagiaireAvancements) => (
                              <div key={stagiaireAvancements.id} className="task-container">
                                <div className="task-top">
                                  <div className="task-vertical-line task-vertical-line-b"/>
                                  <label>#{stagiaireAvancements.id}</label>
                                </div>
                                <p className="task-text">{stagiaireAvancements.text}</p>
                                <div className="task-bottom">
                                  <label className="date-label">Date: </label>
                                  <label className="date-text">{stagiaireAvancements.date}</label>
                                </div>
                              </div>
                            ))
                        ) : (
                          <p>Aucun avancement encore ici</p>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
      </main>
      {showAvancementModal && (
        <div className="modal-overlay-absence">
  <div className="modal-absence">
    <div className="absence-section">
      <label className="absence-section-title">Ajouter un avancement "{selectedTitle}"</label>
      <FontAwesomeIcon className="plus-icon" onClick={() => setShowAvancementModal(false)} icon={faClose} />
    </div>
    <p className='absence-modal-paragraph-2'>Valeur d'avancement</p>
    <input
      className="avancement-val"
      type="text" // Use "text" instead of "number" to accept decimal values
      value={value}
      onChange={handleChange}
    />
    <p className='absence-modal-paragraph-2'>Description de l'avancement</p>
    <textarea
      placeholder='Je décris mon avancement'
      className='absence-modal-textarea'
      value={textareaValue} // Add the value attribute
      onChange={handleTextareaChange} // Add the onChange event handler
    ></textarea>
    <Link onClick={handleSubmit} className='mark-absence-button'>Enregistrer</Link> // Call handleSubmit on click
  </div>
</div>


      )}
    </div>
  );
}

export default Task;
