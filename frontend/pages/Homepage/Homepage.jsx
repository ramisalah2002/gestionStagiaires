import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faCircleUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faUser, faRectangleList} from '@fortawesome/free-regular-svg-icons';
import './Homepage.css';

const other = () => <div>Hi</div>;

function Homepage() {
  return (
    <Router>

    <div className="app">
      <Sidebar/>
      <main className="main-content">
          <Header/>
          <div className='sections-container'>
            <div className='stagiaires-container'>
              <div className='stagiaires-header'>
                <label className='stagiaires-title'>Stagiaires</label>
                <Link to="./other" className='stagiaires-count'>
                  <FontAwesomeIcon icon={faUser} /> 66
                </Link>
              </div>
              <div className='stagiaires-content'>
                <div className='stagiaire'>
                  <div className='stagiaire-info'>
                    <div className='stagiaire-img' style={{backgroundImage: 'url(../../assets/images/user.jpg)'}}></div>
                    <div className='stagiaire-nom-formation'>
                      <label className='stagiaire-nom'>Nom stagiaire</label>
                      <label className='stagiaire-formation'>Formation stagiaire</label>
                    </div>
                  </div>
                  <button className='stagiaire-btn'>Découvrir</button>
                </div>
                <div className='stagiaire'>
                  <div className='stagiaire-info'>
                    <div className='stagiaire-img' style={{backgroundImage: 'url(../../assets/images/user.jpg)'}}></div>
                    <div className='stagiaire-nom-formation'>
                      <label className='stagiaire-nom'>Nom stagiaire</label>
                      <label className='stagiaire-formation'>Formation stagiaire</label>
                    </div>
                  </div>
                  <button className='stagiaire-btn'>Découvrir</button>
                </div>
                <div className='stagiaire'>
                  <div className='stagiaire-info'>
                    <div className='stagiaire-img' style={{backgroundImage: 'url(../../assets/images/user.jpg)'}}></div>
                    <div className='stagiaire-nom-formation'>
                      <label className='stagiaire-nom'>Nom stagiaire</label>
                      <label className='stagiaire-formation'>Formation stagiaire</label>
                    </div>
                  </div>
                  <button className='stagiaire-btn'>Découvrir</button>
                </div>
                <div className='stagiaire'>
                  <div className='stagiaire-info'>
                    <div className='stagiaire-img' style={{backgroundImage: 'url(../../assets/images/user.jpg)'}}></div>
                    <div className='stagiaire-nom-formation'>
                      <label className='stagiaire-nom'>Nom stagiaire</label>
                      <label className='stagiaire-formation'>Formation stagiaire</label>
                    </div>
                  </div>
                  <button className='stagiaire-btn'>Découvrir</button>
                </div>
                <div className='stagiaire'>
                  <div className='stagiaire-info'>
                    <div className='stagiaire-img' style={{backgroundImage: 'url(../../assets/images/user.jpg)'}}></div>
                    <div className='stagiaire-nom-formation'>
                      <label className='stagiaire-nom'>Nom stagiaire</label>
                      <label className='stagiaire-formation'>Formation stagiaire</label>
                    </div>
                  </div>
                  <button className='stagiaire-btn'>Découvrir</button>
                </div>
                <div className='stagiaire'>
                  <div className='stagiaire-info'>
                    <div className='stagiaire-img' style={{backgroundImage: 'url(../../assets/images/user.jpg)'}}></div>
                    <div className='stagiaire-nom-formation'>
                      <label className='stagiaire-nom'>Nom stagiaire</label>
                      <label className='stagiaire-formation'>Formation stagiaire</label>
                    </div>
                  </div>
                  <button className='stagiaire-btn'>Découvrir</button>
                </div>
                <div className='stagiaire'>
                  <div className='stagiaire-info'>
                    <div className='stagiaire-img' style={{backgroundImage: 'url(../../assets/images/user.jpg)'}}></div>
                    <div className='stagiaire-nom-formation'>
                      <label className='stagiaire-nom'>Nom stagiaire</label>
                      <label className='stagiaire-formation'>Formation stagiaire</label>
                    </div>
                  </div>
                  <button className='stagiaire-btn'>Découvrir</button>
                </div>
              </div>
            </div>
            <div className='project-abscence-section'>
              <div className='project-container'>
                <div className='stagiaires-header'>
                  <label className='stagiaires-title'>Projets</label>
                  <Link to="./other" className='stagiaires-count'>
                  <FontAwesomeIcon icon={faRectangleList} /> 66
                  </Link>
                </div>
                <div className='stagiaires-content'>
                  <div className='stagiaire'>
                    <div className='project-info'>
                      <div className='stagiaire-nom-formation'>
                        <label className='stagiaire-nom'>Theme projet 1</label>
                        <label className='stagiaire-formation'>équipe: Stagiaire1 et Stagiaire2</label>
                      </div>
                    </div>
                    <div className='project-status-yellow'>En cours</div>
                  </div>
                  <div className='stagiaire'>
                    <div className='project-info'>
                      <div className='stagiaire-nom-formation'>
                        <label className='stagiaire-nom'>Theme projet 2</label>
                        <label className='stagiaire-formation'>équipe: Stagiaire3 et Stagiaire4</label>
                      </div>
                    </div>
                    <div className='project-status-green'>Terminé</div>
                  </div>
                  <div className='stagiaire'>
                    <div className='project-info'>
                      <div className='stagiaire-nom-formation'>
                        <label className='stagiaire-nom'>Theme projet 2</label>
                        <label className='stagiaire-formation'>équipe: Stagiaire3 et Stagiaire4</label>
                      </div>
                    </div>
                    <div className='project-status-green'>Terminé</div>
                  </div>
                </div>
              </div>
              <div className='abscence-container'>
                <div className='stagiaires-header'>
                  <div className='today-abscence'>
                    <label className='stagiaires-title'>Abscence</label>
                    <div className='today-abscence-container'>
                      <label className='today-abscence-day'>Aujourd'hui</label>
                    </div>
                  </div>
                  <Link to="./Home" className='see-more-abscence'>
                    voir plus
                  </Link>
                </div>
                <div className='stagiaires-content'>
                  <div className='stagiaire'>
                    <div className='abscence-info'>
                      <div className='red-line'></div>
                      <div className='stagiaire-nom-formation'>
                        <label className='stagiaire-nom'>RAMI Salah-eddine</label>
                        <label className='stagiaire-formation'>justification: certificat medical</label>
                      </div>
                    </div>
                  </div>
                  <div className='stagiaire'>
                    <div className='abscence-info'>
                      <div className='red-line'></div>
                      <div className='stagiaire-nom-formation'>
                        <label className='stagiaire-nom'>BOULAAJOUL Anass</label>
                        <label className='stagiaire-formation'>justification: certificat medical</label>
                      </div>
                    </div>
                  </div>
                  <div className='stagiaire'>
                    <div className='abscence-info'>
                      <div className='red-line'></div>
                      <div className='stagiaire-nom-formation'>
                        <label className='stagiaire-nom'>BOULAAJOUL Anass</label>
                        <label className='stagiaire-formation'>justification: certificat medical</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      <Routes>
        <Route path="/other" element={<other />} />
      </Routes>
      </main>
    </div>
    </Router>
  );
}

export default Homepage;
