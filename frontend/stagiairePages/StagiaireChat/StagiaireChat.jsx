import { useState, useRef, useEffect, useContext } from "react";
import { StagiaireContext } from "../../Contexts/StagiaireContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/LoginPage';
import {
  faSearch,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import './Chat.css';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import StagiaireSidebar from "../../components/Sidebar/StagiaireSidebar";

function StagiaireChat() {

  const parentRef = useRef(null);

  useEffect(() => {
    const parentElement = parentRef.current;
    if (parentElement) {
      parentElement.scrollTop = parentElement.scrollHeight - parentElement.clientHeight;
    }
  }, []);
  
  const navigateTo = useNavigate();
  const { stagiaire, loading } = useContext(StagiaireContext);
  const stagiaireContext = useContext(StagiaireContext);

  useEffect(() => {
    const stagiaireData = localStorage.getItem("stagiaire");
    if (!stagiaireData && !loading) {
      // Admin data doesn't exist in localStorage, redirect to LoginPage
      navigateTo("/stagiaire/login");
    } else if (stagiaireData && !stagiaire) {
      // Admin data exists in localStorage but not in context, set the admin context
      stagiaireContext.setStagiaire(JSON.parse(stagiaireData));
    }
  }, [stagiaire, loading, navigateTo, stagiaireContext]);

  const currentDate = new Date().toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });
  

  

  const profiles= [
    {
      id: 1,
      nom: "RAMI Salah-eddine",
      email: "ramisalah2002@gmail.com",
      image: '../../images/user.jpg',
      lastMessage: 'fen cv',
    },
    {
      id: 2,
      nom: "BOULAAJOUL Anass",
      email: "ramisalah2002@gmail.com",
      image: '../../images/user.jpg',
      lastMessage: 'Cv lhamdollah',
    },
    {
      id: 3,
      nom: "BACHA Zinelabidine",
      email: "ramisalah2002@gmail.com",
      image: '../../images/user.jpg',
      lastMessage: 'Kidayr bikhir',
    },
  ]
  

  const getCurrentDate = () => {
    const todayDate = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = todayDate.toLocaleDateString('en-GB', options);
    return formattedDate.replace(/\//g, '_');
  };


   useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveProfileId(null);
        setActiveProfileNom(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [activeProfileNom, setActiveProfileNom] = useState(null);

  const handleProfileClick = (id,nom) => {
    setActiveProfileId(id);
    setActiveProfileNom(nom);
  };
  return (
    <div className="app">
      <StagiaireSidebar />
      <main className="main-content">
        <div className='chat-container'>
            <div className="left-section">
                <form className="search-chat">
                  <FontAwesomeIcon className="search-icon" icon={faSearch} />
                  <input className="search-input" placeholder="Rechercher ..." type="text" />
                </form>
                <div className="profiles-container">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className={`profile-item ${activeProfileId === profile.id ? 'active-profile-item' : ''}`}
                      onClick={() => handleProfileClick(profile.id, profile.nom)}
                    >
                      <div style={{ background: `url(${profile.image})`, backgroundSize: 'cover' }} className="profile-img"></div>
                      <div className="profile-info">
                        <div className="profile-header">
                          <div className="profile-name">{profile.nom}</div>
                          <div className="profile-date">09:00</div>
                        </div>
                        <label className="last-message">{profile.lastMessage}</label>
                      </div>
                      <div className="messages-number">99</div>
                    </div>
                  ))}
                </div>
            </div>
            <div className="right-section" style={{ backgroundColor: activeProfileId ? '#f0f2f5' : '#fff' }}>
              {activeProfileId ? (
                <>
                  <div className="second-profile-section">
                    <div className="second-profile-img"></div>
                    <label className="second-profile-name">{activeProfileNom}</label>
                  </div>
                  <div ref={parentRef} className="chat-content">
                    <div className="chat-message-sender">
                      <div className='sender-img'></div>
                      <div className="sender-message-content">
                        <label>Rami salah-eddine</label>
                        <p >
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
                        </p>
                      </div>
                    </div>
                    <div className="chat-message-reciever">
                      <div className="sender-message-content">
                        <p >
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
                        </p>
                      </div>
                      <div className='sender-img'></div>
                    </div>
                    <div className="chat-message-sender">
                      <div className='sender-img'></div>
                      <div className="sender-message-content">
                        <label>Rami salah-eddine</label>
                        <p >
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
                        </p>
                      </div>
                    </div>
                    <div className="chat-message-reciever">
                      <div className="sender-message-content">
                        <p >
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
                        </p>
                      </div>
                      <div className='sender-img'></div>
                    </div>
                    <div className="chat-message-sender">
                      <div className='sender-img'></div>
                      <div className="sender-message-content">
                        <label>Rami salah-eddine</label>
                        <p >
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
                        </p>
                      </div>
                    </div>
                    <div className="chat-message-reciever">
                      <div className="sender-message-content">
                        <p >
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
                        </p>
                      </div>
                      <div className='sender-img'></div>
                    </div>
                    <div className="chat-message-sender">
                      <div className='sender-img'></div>
                      <div className="sender-message-content">
                        <label>Rami salah-eddine</label>
                        <p >
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
                        </p>
                      </div>
                    </div>
                    <div className="chat-message-reciever">
                      <div className="sender-message-content">
                        <p >
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
                        </p>
                      </div>
                      <div className='sender-img'></div>
                    </div>
                    <div className="chat-message-sender">
                      <div className='sender-img'></div>
                      <div className="sender-message-content">
                        <label>Rami salah-eddine</label>
                        <p >
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
                        </p>
                      </div>
                    </div>
                    <div className="chat-message-reciever">
                      <div className="sender-message-content">
                        <p >
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
                        </p>
                      </div>
                      <div className='sender-img'></div>
                    </div>
                    <div className="chat-message-sender">
                      <div className='sender-img'></div>
                      <div className="sender-message-content">
                        <label>Rami salah-eddine</label>
                        <p >
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
                        </p>
                      </div>
                    </div>
                    <div className="chat-message-reciever">
                      <div className="sender-message-content">
                        <p >
                         {profiles[activeProfileId-1].lastMessage}
                        </p>
                      </div>
                      <div className='sender-img'></div>
                    </div>
                    
                  </div>
                  <form className="bottom-div">
                    <input className='message-input' placeholder='Tapez votre message' type="text"></input>
                    <Link className='send-message-link'>
                      <FontAwesomeIcon className="send-icon" icon={faPaperPlane} />
                    </Link>
                  </form>
                </>
              ) : (
                <div className='default-message'>
                  <img src='../../images/test.jpg' alt="Default Message" />
                  <label className='menstage-label'>MENStage</label>
                  <label className='menstage-paragraph'>Échangez vos messages entre vous en toute sécurité</label>
                </div>
              )}
            </div>

        </div>
      </main>
    </div>
  );
}

export default StagiaireChat;
