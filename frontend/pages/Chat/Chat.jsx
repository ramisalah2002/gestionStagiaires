import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/LoginPage';
import {
  faSearch,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import './Chat.css';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';

function StagiaireProfile() {
  const [user, setUser] = useState(null);
  const navigateTo = useNavigate();
  

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      // User data not found, navigate to LoginPage
      navigateTo('/LoginPage');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigateTo]);

  const currentDate = new Date().toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });

  

  const getCurrentDate = () => {
    const todayDate = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = todayDate.toLocaleDateString('en-GB', options);
    return formattedDate.replace(/\//g, '_');
  };


   useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveProfile(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  
  const [activeProfile, setActiveProfile] = useState(null);

  const handleProfileClick = (profileId) => {
    setActiveProfile(profileId);
  };
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className='chat-container'>
            <div className="left-section">
                <form className="search-chat">
                  <FontAwesomeIcon className="search-icon" icon={faSearch} />
                  <input className="search-input" placeholder="Rechercher ..." type="text" />
                </form>
                <div className="profiles-container">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((profileId) => (
                    <div
                      key={profileId}
                      className={`profile-item ${activeProfile === profileId ? 'active-profile-item' : ''}`}
                      onClick={() => handleProfileClick(profileId)}
                    >
                      <div className="profile-img"></div>
                      <div className="profile-info">
                        <div className="profile-header">
                          <div className="profile-name">BOULAAJOUL Anass</div>
                          <div className="profile-date">09:00</div>
                        </div>
                        <label className="last-message">Bonjour Salah-eddine</label>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
            <div className="right-section" style={{ backgroundColor: activeProfile ? '#f0f2f5' : '#fff' }}>
              {activeProfile ? (
                <>
                  <div className="second-profile-section">
                    <div className="second-profile-img"></div>
                    <label className="second-profile-name">BOULAAJOUL Anass</label>
                  </div>
                  <div className="chat-content">
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
                         bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez bonjour salah eddine rami je pense que vous avez  
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

export default StagiaireProfile;
